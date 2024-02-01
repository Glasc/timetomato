<script setup lang="ts">
import themeSwitcher from "./theme-switcher.vue";
import CustomizeTrigger from "./customize-trigger.vue";

defineProps<{
  isRunning: boolean;
}>();

const user = useUser();

const handleLogout = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  await $fetch("/api/logout", {
    method: "POST",
    redirect: "manual",
  });
  await navigateTo("/login");
};
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
      <div class="">
        <img src="~/assets/tomato.png" alt="" width="40" height="40" />
        <a class="text-2xl font-bold mt-1">Pomodoro</a>
      </div>
      <div class="hidden sm:block">
        <h2 class="font-semibold relative top-1" v-if="user">
          <Icon
            class="text-black dark:text-purple-300"
            size="22"
            name="uil:user"
          />
          {{ user.username }}
        </h2>
      </div>
      <div class="flex relative top-1 items-baseline space-x-3 sm:space-x-4">
        <customize-trigger :isRunning="isRunning" />
        <form method="post" action="/api/logout" @submit.prevent="handleLogout">
          <button title="Sign out" class="btn btn-sm btn-error" type="submit">
            <Icon
              size="22"
              name="uil:exit"
              color="text-black dark:text-gray-700"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
