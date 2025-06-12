<template>
  <div class="inventory-page">
    <Sidebar />
    <div class="main-content">
      <Inventory />
    </div>
  </div>
</template>

<script setup>
import Inventory from '@/components/Inventory.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped>
.inventory-page {
  display: flex;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
