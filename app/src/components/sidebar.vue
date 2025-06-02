<template>
    <div class="sidebar">
      <router-link to="/pack-opening" class="link">Open Pack</router-link>
      <router-link to="/inventory" class="link">Inventory</router-link>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    width: 200px;
    padding: 1rem;
    background-color: #2d2d2d;
    color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .link {
    color: white;
    text-decoration: none;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  </style>
  