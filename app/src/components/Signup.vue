<template>
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
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
  
        <button type="submit" :disabled="isLoading">Sign Up</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabaseClient'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'Signup',
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref('')
      const isLoading = ref(false)
      const router = useRouter()
  
      const handleSignup = async () => {
        isLoading.value = true
        error.value = ''
  
        try {
          const { user, session, error: authError } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          })
  
          if (authError) {
            error.value = authError.message
            return
          }
  
          router.push('/login')
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
        handleSignup
      }
    },
  }
  </script>
  
  <style scoped>
  </style>
  