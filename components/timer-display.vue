
<script setup lang="ts">
import { computed } from 'vue'
import { zeroPad } from "../utils"
import { getMinutes, getSeconds } from 'date-fns'

const props = defineProps({
  currentMode: {
    type: String,
    required: true,
  },
  currentTimer: {
    type: Number,
    required: true,
  },
  timerConfigInMilliseconds: {
    type: Object,
    required: true,
  },
})


const currentTimerMinutes = computed(() => getMinutes(props.currentTimer))
const currentTimerSeconds = computed(() => getSeconds(props.currentTimer))

const progressClass = computed(() => ({
  'text-accent/90': props.currentMode === 'pomodoro',
  'text-primary/90': props.currentMode === 'shortBreak',
  'text-secondary/90': props.currentMode === 'longBreak',
}))

const progressValue = computed(() => ({
  '--value': (props.currentTimer / props.timerConfigInMilliseconds[props.currentMode]) * 100,
}))

</script>


<template>
  <div class="flex justify-center px-3">
    <div class="radial-progress bg-base-200" :class="progressClass" style="--size: 20rem; --thickness: 0.35rem"
      :style="progressValue">
      <span class="block p-8 text-center text-6xl font-medium">
        {{ zeroPad(currentTimerMinutes) }}:{{ zeroPad(currentTimerSeconds) }}
      </span>
    </div>
  </div>
</template>
