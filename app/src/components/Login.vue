<template>
  <div class="signin">
    <h2>Return to Your Journey</h2>
    
    <form @submit.prevent="handleSignin">
      <div class="form-group">
        <label for="email">Trainer Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your Gmail"
          required
        />
      </div>
  
      <div class="form-group">
        <label for="password">Secret Code</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your secret code"
          required
        />
      </div>
  
      <button type="submit" :disabled="loading" class="pokeball-button">
        <div v-if="loading" class="pokeball-loading">
          <div class="pokeball">
            <div class="pokeball-top"></div>
            <div class="pokeball-middle"></div>
            <div class="pokeball-bottom"></div>
            <div class="pokeball-center"></div>
          </div>
        </div>
        <span v-else>Access Pokédex</span>
      </button>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
  
      <p class="signup-link">
        Not a Pokémon Trainer yet?
        <router-link to="/">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import account from '@/supabase';
import { createPinia } from 'pinia'; 
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter()
const authStore = useAuthStore()

account.auth.onAuthStateChange((event, session) => {
      console.log('Auth change:', event);
      if (session) {
        console.log('User is logged in:', session.user);
        authStore.setUser(session.user) // saves the session
      } else {
        authStore.clearUser()
        console.log('User is logged out');
      }
    });

const handleSignin = async () => {
  error.value = null;
  loading.value = true;

  try {
    const { data, error: authError } = await account.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (authError) {
      throw authError;
    }

    const user = data?.user;
    if (!user) {
      throw new Error('Login succeeded but no user object returned.');
    }

    console.log('Login successful, user ID:', user.id);

    authStore.setUser(user)

    router.push('/inventory')

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.signin {
  max-width: 400px;
  margin: 40px auto;
  padding: 25px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 3px solid #3c5aa6; /* Pokémon blue border */
  position: relative;
  overflow: hidden;
}

.signin::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: #ee1515; /* Pokémon red */
  z-index: 1;
}

h2 {
  color: #3c5aa6; /* Pokémon blue */
  text-align: center;
  margin-bottom: 25px;
  font-size: 24px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #3c5aa6; /* Pokémon blue */
  font-weight: bold;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ffcb05; /* Pokémon yellow */
  border-radius: 8px;
  background-color: white;
  transition: all 0.3s ease;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #3c5aa6; /* Pokémon blue */
  box-shadow: 0 0 0 2px rgba(60, 90, 166, 0.2);
}

.pokeball-button {
  width: 100%;
  padding: 12px;
  background-color: #ee1515; /* Pokémon red */
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
}

.pokeball-button:hover:not(:disabled) {
  background-color: #cc0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(238, 21, 21, 0.3);
}

.pokeball-button:disabled {
  background-color: #f8f8f8;
  cursor: not-allowed;
}

.pokeball-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokeball {
  width: 30px;
  height: 30px;
  position: relative;
  animation: shake 1.5s infinite;
}

.pokeball-top {
  position: absolute;
  width: 30px;
  height: 15px;
  background-color: #ee1515; /* Pokémon red */
  border-radius: 30px 30px 0 0;
}

.pokeball-bottom {
  position: absolute;
  bottom: 0;
  width: 30px;
  height: 15px;
  background-color: white;
  border-radius: 0 0 30px 30px;
}

.pokeball-middle {
  position: absolute;
  top: 13px;
  width: 30px;
  height: 4px;
  background-color: #222224;
}

.pokeball-center {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #222224;
  z-index: 2;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-10deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

.error {
  color: #ee1515; /* Pokémon red */
  margin-top: 16px;
  background-color: rgba(238, 21, 21, 0.1);
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #3c5aa6; /* Pokémon blue */
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>