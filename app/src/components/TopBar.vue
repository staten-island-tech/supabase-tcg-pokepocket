<template>
    <div class="top-bar">
      <router-link to="/login">
        <button class="login-button">Log In</button>
      </router-link>
    </div>
  </template>
  
  <script setup>
  // No need for any JavaScript logic here, just a static link with a button
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
  