<template>
  <div class="inventory-page">
    <Sidebar />
    <div class="main-content">
      <Inventory />
    </div>
  </div>
</template>

<script>
import Inventory from '@/components/Inventory.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Inventory,
    Sidebar
  },
};
</script>

<style scoped>
.inventory-page {
  display: flex;
}

.main-content {
  margin-left: 200px;
  padding: 1rem;
  width: 100%;
}
</style>
