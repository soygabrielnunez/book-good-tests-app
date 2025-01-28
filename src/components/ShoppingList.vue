<template>
  <div class="pt-20 flex flex-col items-center gap-5">
    <div class="w-[350px]">
      <form @submit.prevent="handleSubmit" class="flex justify-between mb-4">
        <label>Item
          <input type="text" class="ml-2 p-2 outline rounded-md" v-model="itemTitle" />
        </label>
        <button class="p-2 rounded-md bg-blue-400">Add item</button>
      </form>
      <shopping-list-items :items="items" @remove="handleRemove" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ShoppingListItems from './ShoppingListItems.vue';
import type { Item } from 'src/entities/shopping-list';
import { ref } from 'vue';

const SHOPPING_LIST_KEY = 'shopping-list';
const items = ref<Item[]>(JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY) || '[]'));
const itemTitle = ref('');

const updateStorage = () => {
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items.value));
};

const addItem = (item: Item) => {
  items.value.push(item);
  updateStorage();
};
const handleSubmit = () => {
  addItem({ id: Date.now(), title: itemTitle.value });
  itemTitle.value = '';
};

const handleRemove = (item: Item) => {
  items.value = items.value.filter((i) => i.id !== item.id);
  updateStorage();
};
</script>
