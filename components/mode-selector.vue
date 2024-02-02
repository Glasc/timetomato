<template>
  <div class="flex justify-center px-3">
    <ul
      class="menu menu-vertical sm:menu-horizontal rounded-box w-full max-w-xl"
    >
      <li class="flex-1 cursor-pointer">
        <button
          tabindex="0"
          class="block rounded-none text-base text-center w-full px-6 py-4 disabled:bg-base-100 font-medium"
          :class="{
            'bg-base-300 disabled:text-gray-400':
              props.currentMode !== 'pomodoro',
            ' bg-accent disabled:text-accent/60 active':
              props.currentMode === 'pomodoro',
          }"
          @click="emit('changeMode', 'pomodoro')"
          :disabled="props.isRunning"
        >
          Pomodoro
        </button>
      </li>
      <li class="flex-1 cursor-pointer rounded-xl">
        <button
          tabindex="0"
          class="block rounded-none text-center text-base px-6 py-4 disabled:bg-base-100 font-medium"
          :class="{
            'bg-base-300 disabled:text-gray-400':
              props.currentMode !== 'shortBreak',
            'text-primary-content bg-primary disabled:text-primary/60 active':
              props.currentMode === 'shortBreak',
          }"
          @click="emit('changeMode', 'shortBreak')"
          :disabled="props.isRunning"
        >
          Break
        </button>
      </li>
      <li class="flex-1 cursor-pointer">
        <button
          tabindex="0"
          class="block rounded-none w-full text-center text-base bg-base-300 px-6 py-4 disabled:bg-base-100 font-medium"
          :class="{
            'bg-base-300 disabled:text-gray-400':
              props.currentMode !== 'longBreak',
            'bg-secondary text-secondary-content disabled:text-secondary/60 active':
              props.currentMode === 'longBreak',
          }"
          @click="emit('changeMode', 'longBreak')"
          :disabled="props.isRunning"
        >
          Long break
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TimerConfig } from "@/utils";

interface Props {
  currentMode: keyof TimerConfig;
  isRunning: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["changeMode"]);
</script>
