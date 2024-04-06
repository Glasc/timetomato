<script setup lang="ts">
type Props = {
  userName: string
  userId: string
}

const props = defineProps<Props>()

const handleDeleteUser = async () => {
  try {
    await $fetch("/api/user", {
      method: "DELETE",
      redirect: "manual",
    })
    await navigateTo("/")
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="hidden sm:block">
    <h2 class="font-semibold relative top-1">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-sm btn-ghost m-1">
          <Icon
            class="text-black dark:text-purple-300"
            size="22"
            name="uil:user"
          />
          {{ props.userName }}
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <button class="btn btn-sm btn-neutral" @click="handleDeleteUser()">
              Delete account
            </button>
          </li>
        </ul>
      </div>
    </h2>
  </div>
</template>
