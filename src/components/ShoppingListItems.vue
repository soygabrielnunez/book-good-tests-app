<template>
  <ul>
    <li v-for="item in editableItems" :key="item.id" class="flex w-full justify-between">
      <template v-if="item.editing">
        <label :for="item.title">{{ item.title }}</label>
        <input :id="item.title" v-model="item.title" />
        <button @click="handleSave(item)">Save</button>
      </template>
      <template v-else>
      {{ item.title }}
      <div>
        <button @click="handleEdit(item)">Edit {{ item.title }}</button>
        <button @click="emits('remove', item)">Remove {{ item.title }}</button>
      </div>
      </template>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { Item } from 'src/entities/shopping-list';
import { ref } from 'vue';

const props = defineProps<{
 items: Item[];
}>();

type EditableItem = Item & { editing: boolean };

const editableItems = ref<EditableItem[]>(props.items.map((item) => ({ ...item, editing: false })));

const handleEdit = (item: EditableItem) => {
  const itemIndex = editableItems.value?.findIndex((i) => i.id === item.id);
  if (itemIndex !== undefined && itemIndex !== -1) {
    editableItems.value[itemIndex].editing = true;
  }
};

const handleSave = (item: EditableItem) => {
  const itemIndex = editableItems.value?.findIndex((i) => i.id === item.id);
  if (itemIndex !== undefined && itemIndex !== -1) {
    editableItems.value[itemIndex].editing = false;
  }
};

const emits = defineEmits<{
 (event: 'remove', item: Item): void;
}>();
</script>
