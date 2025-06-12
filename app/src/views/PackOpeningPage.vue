<template>
  <div class="pack-opening-page">
    <div class="main-content">
      <PackOpening />
    </div>
  </div>
</template>

<script>
import PackOpening from '@/components/PackOpening.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    PackOpening,
    Sidebar
  },
};
</script>

<style scoped>
.pack-opening-page {
  display: flex;
}

.main-content {
  margin-left: 200px;
  padding: 1rem;
  width: 100%;
}
</style>
