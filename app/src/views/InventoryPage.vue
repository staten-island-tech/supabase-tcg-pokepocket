<!-- views/InventoryPage.vue -->
<template>
    <div>
      <Sidebar />
      <div class="inventory-container">
        <h2>Your Opened Cards</h2>
        <div class="cards-container">
          <div v-for="(card, index) in inventory" :key="index" class="card">
            <img :src="card.images.small" :alt="card.name" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  const inventory = ref([]);
  
  onMounted(() => {
    const stored = localStorage.getItem('inventory');
    if (stored) inventory.value = JSON.parse(stored);
  });
  </script>
  
  <style scoped>
  .inventory-container {
    padding: 2rem;
    text-align: center;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .card img {
    width: 150px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  </style>
  