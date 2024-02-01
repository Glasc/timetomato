<script setup lang="ts">
import themeSwitcher from "./theme-switcher.vue";
</script>

<template>
  <div class="bg-base-300 border-b-2 border-base-100">
    <client-only>
      <theme-switcher />
      <template #fallback>
        <div class="absolute right-5 top-6">
          <span class="loading loading-ring h-8 loading-lg"></span>
        </div>
      </template>
    </client-only>

    <div
      class="navbar justify-start gap-x-3 sm:gap-x-0 items-center sm:justify-between mx-auto max-w-4xl px-4 py-5"
    >
      <slot></slot>
    </div>
  </div>
</template>
