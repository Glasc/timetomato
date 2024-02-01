<script setup lang="ts">
type Props = {
  userName: string;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="hidden sm:block">
    <h2 class="font-semibold relative top-1">
      <Icon class="text-black dark:text-purple-300" size="22" name="uil:user" />
      {{ props.userName }}
    </h2>
  </div>
</template>
