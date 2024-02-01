<script setup lang="ts">
interface Props {
  appName: string;
}

const props = defineProps<Props>();
</script>
<template>
  <div class="">
    <img src="~/assets/tomato.png" alt="" width="40" height="40" />
    <a class="text-2xl font-bold mt-1">{{ props.appName }}</a>
  </div>
</template>
