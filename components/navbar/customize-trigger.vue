<script setup lang="ts">
defineProps<{
  isRunning: boolean
}>()
</script>
<template>
  <div class="flex items-center space-x-2 sm:space-x-4">
    <div class="" onclick="my_modal_2.showModal()" :disabled="isRunning">
      <button
        v-if="isRunning"
        class="btn btn-sm btn-disabled hover:none w-full"
        :disabled="false"
      >
        <Icon
          class="text-gray-600 dark:text-gray-400"
          size="22"
          name="uil:setting"
        />
        <span class="hidden sm:inline-block">Customize</span>
      </button>
      <button v-else class="btn btn-sm dark:btn-neutral hover:none w-full">
        <Icon
          class="text-gray-600 dark:text-gray-400"
          size="22"
          name="uil:setting"
        />
        <span class="hidden sm:inline-block">Customize</span>
      </button>
    </div>
  </div>
</template>
