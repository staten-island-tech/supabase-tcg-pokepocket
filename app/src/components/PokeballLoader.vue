<template>
  <div class="loader-container">
    <div class="pokeball"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.pokeball {
  width: 500px; /* was 50px */
  height: 500px; /* was 50px */
  border: 50px solid black; /* was 5px */
  border-radius: 50%;
  position: relative;
  background: white;
  animation: spin 1s linear infinite;
}

.pokeball::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  background: red;
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  transform: translateY(-50%);
}

.pokeball::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px; /* was 12px */
  height: 120px; /* was 12px */
  background: white;
  border: 20px solid black; /* was 2px */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
