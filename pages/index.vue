<script setup lang="ts">
import { ref, watchEffect, nextTick, onUnmounted, onMounted } from "vue";
import type { TimerConfig } from "~/utils";
import { useLocalStorage } from "@vueuse/core";
import bellSound from "./assets/bell.mp3";

const user = useUser();
if (user.value) {
  await navigateTo("/app");
}

const defaultTimerConfig = {
  pomodoro: 1500000,
  shortBreak: 300000,
  longBreak: 900000,
};

const numbers = [1, 2, 3, 4, 5];


const result = numbers.map(function (number) {
  return number * 2;
});


let timerConfigInLocalStorage = useLocalStorage(
  "timerConfig",
  defaultTimerConfig
);

let timerConfigInMilliseconds: Ref<TimerConfig> = ref(
  timerConfigInLocalStorage
    ? timerConfigInLocalStorage.value
    : defaultTimerConfig
);

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
  useLocalStorage("timerConfig", config);
};

const changeMode = (newMode: keyof TimerConfig) => {
  currentMode.value = newMode;
  useLocalStorage("currentMode", newMode);
  nextTick(() => {
    currentTimer.value = timerConfigInMilliseconds.value[currentMode.value];
  });
};

let timer: NodeJS.Timeout;

onMounted(() => {
  timer = setInterval(() => {
    if (!isRunning.value) return;
    if (currentTimer.value === 0) {
      const audio = new Audio(bellSound);
      audio.volume = 0.3;
      audio.play();
      isRunning.value = false;
      return;
    }

    currentTimer.value -= 1000;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleSpacebar = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    if (isRunning.value) {
      isRunning.value = false;
      nextTick(() => {
        const startButton = document.querySelector(
          "[data-start-button]"
        ) as HTMLButtonElement;
        if (startButton) startButton.focus();
      });
    } else {
      isRunning.value = true;
      nextTick(() => {
        const stopButton = document.querySelector(
          "[data-stop-button]"
        ) as HTMLButtonElement;
        if (stopButton) stopButton.focus();
      });
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleSpacebar);
});

useLocalStorage("theme", "sunset");
</script>
<template>
  <config-modal-local
    @submit="updateTimerConfig"
    :current-config="timerConfigInMilliseconds"
    :current-mode="currentMode"
  />
  <div class="relative flex min-h-screen" :class="{ 'bg-base-200': isRunning }">
    <div class="w-full space-y-10 pb-10">
      <navbar-navigation-bar :is-running="isRunning" />
      <mode-selector
        :current-mode="currentMode"
        @change-mode="changeMode"
        :is-running="isRunning"
      />
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
    </div>
  </div>
</template>
