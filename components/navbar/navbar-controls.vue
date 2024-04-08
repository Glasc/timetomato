<script setup lang="ts">
import CustomizeTrigger from "./customize-trigger.vue"
import themeSwitcher from "./theme-switcher.vue";

const handleLogout = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return
  await $fetch("/api/logout", {
    method: "POST",
  })
  await navigateTo("/login")
}

type Props = {
  isRunning: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex relative top-1 items-center space-x-3 sm:space-x-4">
    <customize-trigger :isRunning="props.isRunning" />
    <client-only>
      <theme-switcher />
      <template #fallback>
        <div class="btn btn-sm">
          <span class="loading loading-ring h-9 loading-lg"></span>
        </div>
      </template>
    </client-only>
    <form method="post" action="/api/logout" @submit.prevent="handleLogout">
      <button title="Sign out" class="btn btn-sm btn-error ml-4" type="submit">
        <Icon size="22" name="uil:exit" color="text-black dark:text-gray-700" />
      </button>
    </form>
  </div>
</template>
