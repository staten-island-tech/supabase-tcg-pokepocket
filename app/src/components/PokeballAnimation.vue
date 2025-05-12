<template>
  <div class="pokeball-container">
    <div class="pokeball"></div>
  </div>
</template>

<script setup>
/* Logic for Pokeball animation, like keyframes and CSS transitions */
</script>

<style scoped>
.pokeball-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.pokeball {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
