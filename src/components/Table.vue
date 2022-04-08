<script setup>
defineProps({
  value: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="w-full border-collapse">
    <slot name="head">
      <thead>
        <tr
          class="border-b border-slate-300 grid grid-cols-[3fr_2fr_2fr_2fr_130px]"
        >
          <th
            class="p-3 text-left"
            v-for="column in columns"
            :key="column.field"
            :class="column.field === 'email' && 'border-r'"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
    </slot>
    <slot name="body"></slot>
  </table>
</template>
