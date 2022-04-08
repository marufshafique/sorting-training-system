<script setup>
defineProps({
  second: {
    type: Number,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
});

function prefix(value) {
  return value < 10 ? `0${value}` : value;
}
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold text-orange-500">
      {{ prefix(hour) }}: {{ prefix(minute) }}: {{ prefix(second) }}
    </h2>
  </div>
</template>
