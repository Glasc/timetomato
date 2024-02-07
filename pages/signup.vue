<script lang="ts" setup>
import { auth } from "~/components/auth";

const errorMessage = ref<string | null>(null);

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: {
        username: formData.get("username"),
        password: formData.get("password"),
      },
      redirect: "manual",
    });
    await navigateTo("/"); // profile page
  } catch (e) {
    const { data: error } = e as {
      data: {
        message: string;
      };
    };
    errorMessage.value = error.message;
  }
};

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
];
</script>

<template>
  <auth.root>
    <auth.appHeading>Pomodoro</auth.appHeading>
    <auth.panel>
      <auth.heading>Create account</auth.heading>
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

        <button type="submit" class="w-full btn btn-primary">Sign in</button>
        <p class="text-sm text-center font-light">
          Already signed up?
          <NuxtLink
            to="/login"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Login</NuxtLink
          >
        </p>
      </form>
      <p class="text-error text-center">{{ errorMessage }}</p>
    </auth.panel>
  </auth.root>
</template>
~/components/auth