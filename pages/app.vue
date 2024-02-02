<script setup lang="ts">
import type { TimerConfig } from "~/utils";
import { useLocalStorage } from "@vueuse/core";
import bellSound from "./assets/bell.mp3";
import { navbar } from "~/components/navbar";
import { mode } from "~/components/mode";

definePageMeta({
  middleware: "protected",
});

const user = useUser();

const data = await useFetch("/api/timer");
const initialConfig = data.data.value;
const fallbackConfig = {
  pomodoro: 1500000,
  shortBreak: 300000,
  longBreak: 900000,
};
const defaultTimerConfig = ref(initialConfig ?? fallbackConfig);

let timerConfigInMilliseconds: Ref<TimerConfig> = ref(defaultTimerConfig);

let currentModeInLocalStorage = useLocalStorage("currentMode", "pomodoro");

const currentMode: Ref<keyof TimerConfig> = ref(
  currentModeInLocalStorage
    ? (currentModeInLocalStorage.value as keyof TimerConfig)
    : "pomodoro"
);

const currentTimer = ref(timerConfigInMilliseconds.value[currentMode.value]);
const isRunning = ref(false);

watchEffect(() => {
  if (isRunning.value) return;
  currentTimer.value = timerConfigInMilliseconds.value[currentMode.value];
});

const updateTimerConfig = (config: TimerConfig) => {
  timerConfigInMilliseconds.value = config;
};

const changeMode = (newMode: keyof TimerConfig) => {
  console.log(newMode);
  currentMode.value = newMode;
  useLocalStorage("currentMode", newMode);
  nextTick(() => {
    currentTimer.value = timerConfigInMilliseconds.value[currentMode.value];
  });
};

const nextMode = {
  pomodoro: "shortBreak",
  shortBreak: "longBreak",
  longBreak: "pomodoro",
} as const;

let timer: NodeJS.Timeout;

onMounted(() => {
  timer = setInterval(() => {
    if (!isRunning.value) return;
    if (currentTimer.value === 0) {
      const audio = new Audio(bellSound);
      audio.volume = 0.3;
      audio.play();
      isRunning.value = false;
      const next = nextMode[currentMode.value];
      changeMode(next);
      return;
    }

    currentTimer.value -= 1000;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

useLocalStorage("theme", "sunset");
</script>
<template>
  <div class="relative flex min-h-screen" :class="{ 'bg-base-200': isRunning }">
    <div class="w-full space-y-10 pb-10">
      <navbar.root>
        <navbar.brand appName="Pomodoro" />
        <navbar.userBadge v-if="user" :userName="user?.username" />
        <navbar.controls :isRunning="isRunning" />
      </navbar.root>

      <mode.root>
        <mode.element
          title="Pomodoro"
          mode-key="pomodoro"
          :current-mode="currentMode"
          :isRunning="isRunning"
          @change-mode="changeMode"
        >
        </mode.element>

        <mode.element
          title="Break"
          mode-key="shortBreak"
          :current-mode="currentMode"
          :isRunning="isRunning"
          @change-mode="changeMode"
        >
        </mode.element>

        <mode.element
          title="Long break"
          mode-key="longBreak"
          :current-mode="currentMode"
          :isRunning="isRunning"
          @change-mode="changeMode"
        >
        </mode.element>
      </mode.root>

      <timer-display
        :current-mode="currentMode"
        :current-timer="currentTimer"
        :timerConfigInMilliseconds="timerConfigInMilliseconds"
      />
      <timer-control
        @start="isRunning = true"
        @stop="isRunning = false"
        :is-running="isRunning"
        :current-mode="currentMode"
      />
      <collapsible-elements />
      <client-only>
        <config-modal
          @submit="updateTimerConfig"
          :current-config="timerConfigInMilliseconds"
          :current-mode="currentMode"
        />
      </client-only>
    </div>
  </div>
</template>
