<template>
  <div class="loader-container">
    <div class="pokeball"></div>
    <div class="loading-bar">
      <div class="bar"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.pokeball {
  width: 250px;
  height: 250px;
  border: 25px solid black;
  border-radius: 50%;
  position: relative;
  background: white;
  animation: spin 1s linear infinite;
  margin-bottom: 30px;
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
  width: 60px;
  height: 60px;
  background: white;
  border: 10px solid black;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.loading-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 200px;
  height: 10px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}

.bar::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 0%;
  background-color: #3b82f6;
  animation: loadBar 2s infinite;
  border-radius: 10px;
}

.loading-text {
  font-size: 18px;
  color: #555;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes loadBar {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}
</style>
