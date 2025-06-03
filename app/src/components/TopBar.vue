<template>
  <div class="top-bar">
    <div class="left-section" v-if="currentView === 'Inventory'">
      <button class="circle-menu-button" @click="toggleSidebar">
        <img src="/menu.svg" alt="Menu" />
      </button>

      <div class="user-tab-container">
        <button class="user-tab-button" @click="toggleTab">
          <img src="/user-pen.svg" alt="User" />
        </button>

        <div v-if="showTab" ref="tabRef" class="user-tab">
          <p>Edit user settings</p>
        </div>
      </div>
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
const showSidebar = ref(false)
const tabRef = ref(null)

const currentView = computed(() => {
  return route.name  
})

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const toggleTab = () => {
  showTab.value = !showTab.value
}

const handleClickOutside = (event) => {
  if (showTab.value && tabRef.value && !tabRef.value.contains(event.target)) {
    showTab.value = false
  }
}


</script> 
  
<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.circle-menu-button,
.user-tab-button {
  background: none;
  border: none;
  cursor: pointer;
}

.user-tab-container {
  position: relative;
}

.user-tab {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1001;
}
</style>
