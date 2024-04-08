<script lang="ts" setup>
import { auth } from "~/components/auth"

definePageMeta({
  middleware: ["authed"],
})

const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return
  const formData = new FormData(e.target)
  isLoading.value = true
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
    })
    await navigateTo("/app")
  } catch (e) {
    const { data: error } = e as {
      data: {
        message: string
      }
    }
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const fields = [
  {
    type: "text",
    name: "username",
    id: "username",
    label: "Username",
    class: "input input-bordered w-full",
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  {
    type: "password",
    name: "password",
    id: "password",
    label: "Password",
    placeholder: "••••••••",
    class: "border input input-bordered w-full",
    required: true,
    minlength: 6,
    maxlength: 40,
  },
]
</script>

<template>
  <auth.root>
    <auth.appHeading>Pomodoro</auth.appHeading>
    <auth.panel>
      <auth.heading>Sign in to your account</auth.heading>
      <form
        class="space-y-4 md:space-y-6"
        method="post"
        action="/api/login"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-1" v-for="field in fields" :key="field.id">
          <label :for="field.id" :class="field.label">{{ field.label }}</label>
          <input v-bind="field" />
        </div>

        <button v-if="isLoading" class="w-full btn btn-primary">
          <span class="loading loading-spinner"></span>
          Sign in
        </button>
        <button v-else class="w-full btn btn-primary">Sign in</button>

        <p class="text-sm text-center font-light">
          Don’t have an account yet?
          <NuxtLink
            to="/signup"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Sign up</NuxtLink
          >
        </p>
      </form>
      <p class="text-error text-center">{{ errorMessage }}</p>
    </auth.panel>
  </auth.root>
</template>
