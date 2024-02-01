<template>
  <button
    title="Press spacebar to start/pause"
    data-start-button
    v-if="!isRunning"
    class="btn btn-lg block mx-auto"
    :class="buttonClass"
    @click="start"
  >
    Start
  </button>
  <button
    title="Press spacebar to start/pause"
    data-stop-button
    v-else
    class="btn btn-error btn-lg block mx-auto mt-8"
    @click="stop"
  >
    Stop
  </button>
</template>

<script setup lang="ts">
import { computed, nextTick } from "vue";

const props = defineProps({
  isRunning: {
    type: Boolean,
    required: true,
  },
  currentMode: {
    type: String,
    required: true,
  },
});

const buttonClass = computed(() => ({
  "btn-accent": props.currentMode === "pomodoro",
  "btn-primary": props.currentMode === "shortBreak",
  "btn-secondary": props.currentMode === "longBreak",
}));

const emit = defineEmits(["start", "stop"]);

const start = () => {
  emit("start");
  nextTick(() => {
    const stopButton = document.querySelector(
      "[data-stop-button]"
    ) as HTMLButtonElement;
    stopButton.focus();
  });
};

const stop = () => {
  emit("stop");
  nextTick(() => {
    const startButton = document.querySelector(
      "[data-start-button]"
    ) as HTMLButtonElement;
    startButton.focus();
  });
};
</script>
