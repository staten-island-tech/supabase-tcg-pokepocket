<template>
  <div id="app">
    <header>
      <nav class="nav-bar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/inventory">Inventory</RouterLink>
        <RouterLink to="/pack-opening">Pack Opening</RouterLink>
        <RouterLink to="/signup">Sign Up / Login</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
#app {
  background-color: #add8e6; /* Light blue background for the whole page */
  color: yellow; /* Yellow text for the whole page */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

header {
  background-color: #add8e6; /* Light blue for the header */
  padding: 1rem 0;
}

.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.nav-bar a {
  text-decoration: none;
  color: yellow;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-bar a:hover {
  text-decoration: underline;
}

</style>
