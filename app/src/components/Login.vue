<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            v-model="email"
            id="email"
            required
            placeholder="Enter your email"
          />
        </div>
  
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="password"
            id="password"
            required
            placeholder="Enter your password"
          />
        </div>
  
        <div v-if="error" class="error-message">{{ error }}</div>
  
        <button type="submit" :disabled="isLoading">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabaseClient'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref('')
      const isLoading = ref(false)
      const router = useRouter()
  
      const handleLogin = async () => {
        isLoading.value = true
        error.value = ''
  
        try {
          const { user, session, error: authError } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
          })
  
          if (authError) {
            error.value = authError.message
            return
          }
  
          // Redirect to the main page or inventory page after login
          router.push('/inventory') // Adjust this route based on your app
        } catch (err) {
          error.value = 'An unexpected error occurred. Please try again.'
        } finally {
          isLoading.value = false
        }
      }
  
      return {
        email,
        password,
        error,
        isLoading,
        handleLogin
      }
    },
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 0.7rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  .error-message {
    color: red;
  }
  </style>
  