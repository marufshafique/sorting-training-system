<script setup>
import { ref, computed } from "@vue/reactivity";
import { Dialog, TransitionRoot, TransitionChild } from "@headlessui/vue";

import CloseIcon from "../assets/close.svg?component";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "start"]);

const peopleCount = ref(null);
const showError = ref(false);
const hasError = computed(() => {
  if (peopleCount.value < 20 || peopleCount.value > 200) {
    return true;
  }

  return false;
});

function onCloseClick() {
  peopleCount.value = null;
  showError.value = false;
  emit("close");
}

function onStartClick() {
  if (hasError.value) {
    showError.value = true;
    return;
  }

  emit("start", peopleCount.value);
  peopleCount.value = null;
  showError.value = false;
}
</script>

<template>
  <TransitionRoot appear :show="open">
    <Dialog as="div" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div
          class="fixed bg-white inset-0 z-10 overflow-y-auto w-fit h-fit mx-auto my-auto rounded shadow-xl"
        >
          <div class="flex justify-between m-4">
            <h1 class="text-xl">How many people?</h1>
            <CloseIcon class="cursor-pointer" @click="$emit('close')" />
          </div>
          <hr />

          <div class="m-4 flex flex-col">
            <label for="count" class="mb-3 text-gray-600 text-sm">
              Enter a number of how many people you want to add to the list.
            </label>
            <input
              v-model="peopleCount"
              type="number"
              name="count"
              class="px-2 py-2 border-gray-400 border rounded-md w-[500px] outline-none"
              :class="showError && 'border-red-400'"
              @keydown.enter="onStartClick"
            />
            <p v-if="showError" class="text-sm mt-1 font-light text-red-500">
              Enter a number between 20-200
            </p>
          </div>
          <hr class="mt-14 mb-4" />
          <div class="flex m-4">
            <button
              class="bg-gray-500 px-6 py-3 rounded text-white ml-auto mr-4"
              @click="onCloseClick"
            >
              Cancel
            </button>
            <button
              class="bg-orange-500 px-6 py-3 rounded text-white"
              @click="onStartClick"
            >
              Start
            </button>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
