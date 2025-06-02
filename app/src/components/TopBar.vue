<template>
  <div class="top-bar">
   
    <div class="left-section" v-if="currentView === 'Inventory'">
      <button class="circle-menu-button" @click="toggleSidebar">
        <img src="/menu.svg" alt="Menu" />
      </button>
    </div>

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
      <SideBar v-if="showSidebar" @close="showSidebar = false" />
    </div>
  </div>
</template>

  
<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import SideBar from '@/components/SideBar.vue'

const route = useRoute()

const currentView = computed(() => {
  return route.name  
})

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script> 
  
<style scoped>
  .top-bar {
  background-color: white;
  height: 10vh;
  width: 100vw;
  padding: 0 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between; /* Spread content left to right */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
}

.left-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.circle-menu-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white; /* White by default */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1); /* Optional subtle shadow */
}

.circle-menu-button img {
  width: 20px;
  height: 20px;
}

.circle-menu-button:hover {
  background-color: #f0f0f0; /* Light gray on hover */
}


</style>
  