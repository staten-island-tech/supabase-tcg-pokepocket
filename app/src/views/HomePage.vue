<template>
    <div class="home-container">
      <img class="pokeball" src="@/assets/pokeball.svg" alt="Pokéball" />
      <h1>Welcome to PokéPack Simulator!</h1>
      <p>Login or Sign up to start opening packs and building your collection!</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .home-container {
    text-align: center;
    margin-top: 40px;
  }
  
  .pokeball {
    width: 100px;
    animation: spin 2s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  