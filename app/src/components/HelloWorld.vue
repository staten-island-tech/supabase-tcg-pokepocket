<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>Welcome to your Pokémon Card Opener!</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    msg: String
  })
  </script>
  
  <style scoped>
  h1 {
    font-size: 2rem;
    color: #4CAF50;
  }
  </style>
  