<script setup lang="ts">
import { minutesToMilliseconds } from "date-fns";
import { ref } from "vue";
import { getMinutes } from "date-fns";
import { timerConfigSchema } from "../utils";
import type { TimerConfig } from "../utils";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";

const user = useUser();
if (user.value) await navigateTo("/app");

interface Props {
  currentConfig: TimerConfig;
  currentMode: keyof TimerConfig;
}

const props = defineProps<Props>();
const pomodoroInMinutes = ref(getMinutes(props.currentConfig.pomodoro));
const shortBreakInMinutes = ref(getMinutes(props.currentConfig.shortBreak));
const longBreakInMinutes = ref(getMinutes(props.currentConfig.longBreak));

const emit = defineEmits(["submit"]);

const validationSchema = toFormValidator(timerConfigSchema);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    pomodoro: pomodoroInMinutes.value,
    shortBreak: shortBreakInMinutes.value,
    longBreak: longBreakInMinutes.value,
  },
});

const { value: pomodoro } = useField("pomodoro");
const { value: shortBreak } = useField("shortBreak");
const { value: longBreak } = useField("longBreak");

const areInputsValid = () =>
  timerConfigSchema.safeParse({
    pomodoro: pomodoro.value,
    shortBreak: shortBreak.value,
    longBreak: longBreak.value,
  }).success;

const onSubmit = handleSubmit((values) => {
  const configToMilliseconds = {
    pomodoro: minutesToMilliseconds(values.pomodoro),
    shortBreak: minutesToMilliseconds(values.shortBreak),
    longBreak: minutesToMilliseconds(values.longBreak),
  };
  emit("submit", configToMilliseconds);

  const btn = document.querySelector("[data-close-modal]") as HTMLButtonElement;
  btn?.click();
});
</script>

<template>
  <dialog aria-modal="true" id="my_modal_2" class="modal">
    <div class="modal-box max-w-xs w-full relative">
      <form @submit.prevent="onSubmit" class="space-y-4">
        <h3
          class="text-center text-3xl font-semibold"
          :class="{
            'text-accent': currentMode === 'pomodoro',
            'text-primary': currentMode === 'shortBreak',
            'text-secondary': currentMode === 'longBreak',
          }"
        >
          Customize
        </h3>
        <div class="space-y-2">
          <label class="block" htmlFor="pomodoro">Pomodoro</label>
          <input
            ref="pomodoroInput"
            id="pomodoro"
            class="input-bordered input w-full max-w-xs bg-base-300"
            :class="{ 'input-error': errors.pomodoro }"
            required
            autocomplete="off"
            min="1"
            max="60"
            placeholder="minutes"
            v-model.number="pomodoro"
          />
          <span class="text-error text-sm font-medium block">{{
            errors.pomodoro
          }}</span>
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="shortBreak">Short break</label>
          <input
            id="shortBreak"
            class="input-bordered input w-full max-w-xs bg-base-300"
            :class="{ 'input-error': errors.shortBreak }"
            autocomplete="off"
            v-model.number="shortBreak"
            placeholder="minutes"
            min="1"
            max="60"
          />
          <span class="text-error text-sm font-medium block">{{
            errors.shortBreak
          }}</span>
        </div>
        <div class="space-y-2">
          <label class="block" htmlFor="longBreak">Long break</label>
          <input
            id="longBreak"
            class="input-bordered input w-full max-w-xs bg-base-300"
            :class="{ 'input-error': errors.longBreak }"
            autocomplete="off"
            v-model.number="longBreak"
            min="1"
            placeholder="minutes"
            max="60"
          />
          <span class="text-error text-sm font-medium block">{{
            errors.longBreak
          }}</span>
        </div>
        <button type="submit" class="w-full mt-4 disabled:bg-base-300">
          <div
            v-if="!areInputsValid()"
            :disabled="true"
            class="btn-primary btn w-full"
          >
            Update
          </div>
          <div
            v-else
            class="btn-primary btn w-full"
            :class="{
              'btn-accent': currentMode === 'pomodoro',
              'btn-primary': currentMode === 'shortBreak',
              'btn-secondary': currentMode === 'longBreak',
            }"
          >
            Update
          </div>
        </button>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop" tabindex="-1">
      <button data-close-modal tabindex="-1">close</button>
    </form>
  </dialog>
</template>
