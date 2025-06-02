<template>
    <div class="inventory">
      <h2>Your Card Inventory</h2>
      <div class="cards">
        <div v-for="(card, index) in inventory" :key="index" class="card">
          <img :src="card.images.small" :alt="card.name" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const inventory = ref([]);
  
  onMounted(() => {
    const saved = JSON.parse(localStorage.getItem('inventory') || '[]');
    inventory.value = saved;
  });
  </script>
  
  <style scoped>
  .inventory {
    padding: 1rem;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .card img {
    width: 150px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
  </style>
  