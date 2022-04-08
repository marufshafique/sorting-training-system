<script setup>
import { ref } from "vue";
import useTimer from "./hook/useTimer.js";
import usePeople from "./hook/usePeople.js";

import Modal from "./components/Modal.vue";
import Timer from "./components/Timer.vue";
import PeopleListing from "./components/PeopleListing.vue";

const { second, minute, hour, startTimer, stopTimer } = useTimer();
const { peoples, generate, isSorted } = usePeople();

const showSuccessMessage = ref(false);
const showTimer = ref(false);

function onDragend() {
  if (isSorted()) {
    stopTimer();
    showSuccessMessage.value = true;
    showTimer.value = false;
  }
}

const isOpen = ref(false);

function onSortingConfirm(value) {
  generate(value);
  startTimer();
  showTimer.value = true;
  isOpen.value = false;
  showSuccessMessage.value = false;
}
</script>

<template>
  <Modal :open="isOpen" @close="isOpen = false" @start="onSortingConfirm" />

  <div class="container">
    <div class="flex mt-10 items-center justify-between">
      <h1 class="text-3xl font-semibold">Sorting Training System</h1>
      <Timer
        v-if="showTimer"
        :second="second"
        :minute="minute"
        :hour="hour"
        class="ml-auto mr-5"
      />
      <button
        class="bg-orange-500 px-5 py-4 rounded text-white"
        @click="isOpen = true"
      >
        Start Sorting!
      </button>
    </div>

    <div
      class="mt-10 mb-5 w-full h-full mx-auto ml-auto bg-white rounded-md shadow-xl"
    >
      <div v-if="showSuccessMessage" class="text-center pt-16 pb-16">
        <h1 class="text-2xl font-light">
          You have successfully sorted the list in:
        </h1>
        <h2 class="text-xl mt-4 font-light">
          {{ hour }} Hour {{ minute }} Minute {{ second }} Second
        </h2>
      </div>
      <PeopleListing
        v-else-if="peoples.length"
        v-model="peoples"
        @dragend="onDragend"
      />

      <div v-else class="text-center pt-16 pb-16">
        <h1 class="font-normal text-xl text-slate-400 mb-6">
          Click on Start Sorting
        </h1>
        <p class="text-sm font-light text-slate-400">
          Enter a number of how many people you want to add to the list.
        </p>
      </div>
    </div>
  </div>
</template>
