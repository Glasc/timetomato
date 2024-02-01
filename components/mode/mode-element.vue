<script setup lang="ts">
import type { TimerConfig } from "~/utils";

interface Props {
  currentMode: keyof TimerConfig;
  title: string;
  modeKey: keyof TimerConfig;
  isRunning: boolean;
}

const emit = defineEmits(["changeMode"]);
defineProps<Props>();
</script>

<template>
  <li class="flex-1 cursor-pointer">
    <button
      tabindex="0"
      class="block rounded-none text-base text-center w-full px-6 py-4 disabled:bg-base-100 font-medium"
      :class="{
        'bg-base-300 disabled:text-gray-400': currentMode !== modeKey,
        ' bg-accent disabled:text-accent/60 active': currentMode === modeKey,
      }"
      @click="emit('changeMode', modeKey)"
      :disabled="isRunning"
    >
      {{ title }}
    </button>
  </li>
</template>
