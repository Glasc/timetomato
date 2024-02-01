import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("counter", () => {
  const isOpen = ref(false);

  function openModal() {
    isOpen.value = true;
  }

  function closeModal() {
    isOpen.value = false;
  }

  return { isOpen, openModal, closeModal };
});
