<template>
  <div class="top-bar">
    
    <div class="left-section">
      <button
        v-if="currentView === 'Inventory'"
        class="circle-menu-button"
        @click="toggleSidebar"
      >
        <img src="/menu.svg" alt="Menu" />
      </button>
    </div>

    <div class="right-section">
      <div v-if="currentView === 'Inventory'" class="user-tab-container">
        <button class="user-tab-button">
          <img src="/user-pen.svg" alt="User" />
        </button>

        <div v-show="showUserTab" class="user-tab-popup">
          <p>User Settings</p>
          <button @click="logout">Log Out</button>
        </div>
      </div>

      <router-link v-else-if="currentView === 'SignUp'" to="/login">
        <button class="login-button">Log In</button>
      </router-link>

      <router-link v-else-if="currentView === 'Login'" to="/">
        <button class="login-button">Sign Up</button>
      </router-link>
    </div>

  </div>
</template>
  
<script setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';

import SideBar from '@/components/SideBar.vue'

const route = useRoute()
const showProfile = ref(false)
const authStore = useAuthStore()

const currentView = computed(() => {
  return route.name  
})

async function logout() {
  const { error } = await SupabaseAuthClient.auth.signOut()
  if (error) {
    console.error('Error logging out:', error.message)
  } else {
    authStore.clearUser()
    router.push('/')
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
  justify-content: space-between; /* spreads left and right */
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.circle-menu-button,
.user-tab-button {
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 50%;
  padding: 5px;
}

.circle-menu-button:hover,
.user-tab-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
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
