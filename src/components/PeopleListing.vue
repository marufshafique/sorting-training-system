<script setup>
import draggable from "vuedraggable";

import Table from "./Table.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const columns = [
  { field: "email", label: "Email" },
  { field: "potatoes", label: "Potatoes" },
  { field: "name", label: "Full Name" },
  { field: "location", label: "Location" },
  { field: "year", label: "Year" },
];
</script>

<template>
  <Table :columns="columns" :value="modelValue">
    <template #body>
      <draggable
        :model-value="modelValue"
        tag="tbody"
        item-key="email"
        class="list-group"
        @update:modelValue="$emit('update:modelValue', $event)"
      >
        <template #item="{ element }">
          <tr
            class="list-group-item bg-white grid grid-cols-[3fr_2fr_2fr_2fr_130px] border-b"
          >
            <td class="p-3 border-r border-slate-300">
              {{ element.email }}
            </td>
            <td class="p-3">{{ element.potatoes }}</td>
            <td class="p-3">{{ element.name }}</td>
            <td class="p-3">{{ element.location }}</td>
            <td class="p-3">{{ element.year }}</td>
          </tr>
        </template>
      </draggable>
    </template>
  </Table>
</template>
