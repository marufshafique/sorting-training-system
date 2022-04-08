import { ref, watchEffect } from "vue";
import faker from "@faker-js/faker";

export default function usePeople() {
  const peoples = ref([]);

  function generate(value) {
    peoples.value = Array.from({ length: value }).map(() => ({
      email: faker.internet.email(),
      potatoes: faker.datatype.number(999),
      name: faker.name.findName(),
      location: faker.address.country(),
      year: faker.datatype.number({ min: 2000, max: 2022 }),
    }));
  }

  function isSorted() {
    return peoples.value
      .map(({ potatoes }) => potatoes)
      .every((val, i, arr) => !i || val <= arr[i - 1]);
  }

  return {
    peoples,
    generate,
    isSorted,
  };
}
