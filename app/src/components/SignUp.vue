<!-- src/views/SignUp.vue -->
<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>

      <button type="submit">Create Account</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import supabase from '@/supabase';  // Import supabase client

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const handleSignup = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const { user, error } = await supabase.auth.signUp({
      username: username.value
      password: password.value,
    });

    if (error) {
      errorMessage.value = error.message;
    } else {
      // Insert username into the accounts table
      const { data, error: insertError } = await supabase.from('accounts').insert([
        { username: username.value, user_id: user.id }
      ]);

      if (insertError) {
        errorMessage.value = insertError.message;
      } else {
        successMessage.value = 'Account created successfully!';
        username.value = '';
        email.value = '';
        password.value = '';
      }
    }
  } catch (err) {
    errorMessage.value = 'An error occurred while signing up. Please try again.';
  }
};
</script>

<style scoped>
/* Your existing styles */
</style>
