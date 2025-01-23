<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>Item
        <input type="text" v-model="itemTitle" />
      </label>
      <button>Add item</button>
    </form>
    <shopping-list-items :items="items" @remove="handleRemove" />
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
