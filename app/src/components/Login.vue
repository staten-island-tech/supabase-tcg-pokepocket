<template>
  <div class="signin-container">
    <div class="signin">
      <div class="pokeball-accent"></div>
      <h2>Log In</h2>
      
      <form @submit.prevent="handleSignin">
        <div class="form-group">
          <label for="email">Gmail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your Gmail"
            required
          />
        </div>
    
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
    
        <button type="submit" :disabled="loading">
          {{ loading ? 'Signing In...' : 'Log In' }}
        </button>
    
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
    
        <p class="signup-link">
          Don't have an account?
          <router-link to="/">Sign Up</router-link>
        </p>
      </form>
    </div>
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

    router.push('/inventory')

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add top spacing to account for the topbar */
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background-image: url('https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png');
  padding: 20px;
  /* Add top padding to account for the topbar */
  padding-top: 70px; /* Adjust this value based on your topbar height */
}

.signin {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 25px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  background-color: #fff;
  border: 3px solid #3c5aa6;
  overflow: hidden;
}

.pokeball-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 12px;
  background-color: #ff0000;
  z-index: 0;
}

.pokeball-accent::after {
  content: '';
  position: absolute;
  top: 12px;
  right: 15px;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 3px solid #333;
  border-radius: 50%;
  z-index: 1;
}

h2 {
  text-align: center;
  color: #3c5aa6;
  margin-bottom: 25px;
  font-size: 1.8rem;
  position: relative;
  z-index: 2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #3c5aa6;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ffcb05;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3c5aa6;
  box-shadow: 0 0 0 2px rgba(60, 90, 166, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #ffcb05;
  color: #3c5aa6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover:not(:disabled) {
  background-color: #e6b800;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  color: #666;
}

.error {
  color: #ff0000;
  margin-top: 16px;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  border-left: 4px solid #ff0000;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  position: relative;
  z-index: 2;
}

.signup-link a {
  color: #3c5aa6;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Media queries for mobile responsiveness */
@media (max-width: 768px) {
  .signin {
    max-width: 90%;
    padding: 25px 20px;
  }
  
  h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .signin-container {
    padding: 15px;
    padding-top: 60px; /* Slightly reduced top padding for mobile */
  }
  
  .signin {
    padding: 20px 15px;
    max-width: 100%;
    border-width: 2px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .pokeball-accent {
    height: 10px;
  }
  
  .pokeball-accent::after {
    width: 25px;
    height: 25px;
    top: 10px;
    right: 10px;
    border-width: 2px;
  }
}
</style>