<template>
    <div class="top-bar">

      <div v-if="currentView === 'SignUp'">
        <router-link to="/login">
          <button class="login-button">Log In</button>
        </router-link>
      </div>

      <div v-else-if="currentView === 'Login'"> 
        <router-link to="/">
          <button class="login-button">Sign Up</button>
        </router-link>
      </div>

      <div v-else-if="currentView === 'Inventory'">
        <button class="login-button">E</button>
      </div>

    </div>
  </template>
  
  <script setup>
  
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute()

  const currentView = computed(() => {
    return route.name  
  })
  </script> 
  
  <style scoped>
  .top-bar {
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  
  .login-button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #45a049;
  }
  </style>
  