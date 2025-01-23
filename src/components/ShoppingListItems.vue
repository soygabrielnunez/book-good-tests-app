<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.title }}
      <button @click="emits('remove', item)">Remove {{ item.title }}</button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { Item } from 'src/entities/shopping-list';

defineProps<{
 items: Item[];
}>();

const emits = defineEmits<{
 (event: 'remove', item: Item): void;
}>();
</script>
