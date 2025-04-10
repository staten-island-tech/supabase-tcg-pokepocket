<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required placeholder="Enter your email" />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required placeholder="Enter your password" />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <button type="submit" :disabled="isLoading">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '@/supabase';  // Import supabase client

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    const handleLogin = async () => {
      isLoading.value = true;
      error.value = '';

      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if (authError) {
          error.value = authError.message;
          return;
        }

        // Check if the session exists and redirect to inventory page
        if (data?.session) {
          router.push('/inventory');
        } else {
          error.value = 'Failed to log in. Please try again.';
        }
      } catch (err) {
        error.value = 'An unexpected error occurred. Please try again.';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      error,
      isLoading,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>
