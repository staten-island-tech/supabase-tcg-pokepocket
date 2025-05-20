<!-- components/Sidebar.vue -->
<template>
    <div class="sidebar">
      <nav>
        <router-link to="/open-pack" class="tab">Open Pack</router-link>
        <router-link to="/inventory" class="tab">Inventory</router-link>
      </nav>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #ff3c3c;
    padding: 1rem 0;
  }
  
  .tab {
    margin: 0 1.5rem;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .tab:hover {
    text-decoration: underline;
  }
  </style>
  