<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label>Item
        <input type="text" v-model="itemTitle" />
      </label>
      <button>Add item</button>
    </form>

    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.title }}
        <button @click="removeItem(item)">Remove {{ item.title }}</button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Item } from 'src/entities/shopping-list';
import { ref } from 'vue';

const SHOPPING_LIST_KEY = 'shopping-list';
const items = ref<Item[]>(JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY) || '[]'));

const updateStorage = () => {
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items.value));
};

const addItem = (item: Item) => {
  items.value.push(item);
  updateStorage();
};

const itemTitle = ref('');

const handleSubmit = () => {
  addItem({ id: Date.now(), title: itemTitle.value });
  itemTitle.value = '';
};

const removeItem = (item: Item) => {
  items.value = items.value.filter((i) => i.id !== item.id);
  updateStorage();
};
</script>
