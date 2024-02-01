<script setup lang="ts"></script>

<template>
  <client-only>
    <theme-switcher />
    <template #fallback>
      <div class="absolute right-5 top-6">
        <span class="loading loading-ring h-8 loading-lg"></span>
      </div>
    </template>
  </client-only>
</template>
