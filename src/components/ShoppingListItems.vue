<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="flex w-full justify-between">
      {{ item.title }}
      <div>
        <button @click="handleEdit(item)">Edit {{ item.title }}</button>
        <button @click="emits('remove', item)">Remove {{ item.title }}</button>
      </div>
    </li>
  </ul>
  <dialog :open="isEditing">
    <label>New item
      <input />
    </label>
    <button @click="handleSave">Save</button>
  </dialog>
</template>
<script setup lang="ts">
import type { Item } from 'src/entities/shopping-list';
import { ref } from 'vue';

defineProps<{
 items: Item[];
}>();

const isEditing = ref(false);
const editingItem = ref<Item | null>(null);


const handleEdit = (item: Item) => {
  console.log('Editing', item);
editingItem.value = {title: '', id: item.id};
  isEditing.value = true;
};

const handleSave = () => {
};

const emits = defineEmits<{
 (event: 'remove', item: Item): void;
}>();
</script>
