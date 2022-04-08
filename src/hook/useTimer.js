import { ref } from "vue";

export default function useTimer() {
  const second = ref(0);
  const minute = ref(0);
  const hour = ref(0);
  let interval;

  function timer() {
    if ((second.value += 1) == 60) {
      second.value = 0;
      minute.value += 1;
    }

    if (minute.value == 60) {
      minute.value = 0;
      hour.value += 1;
    }
  }

  function startTimer() {
    if (interval) {
      second.value = 0;
      minute.value = 0;
      hour.value = 0;
      clearInterval(interval);
    }

    interval = setInterval(timer, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
  }

  return {
    second,
    minute,
    hour,
    startTimer,
    stopTimer,
  };
}
