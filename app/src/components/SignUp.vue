<template>
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>
  
        <button type="submit">Create Account</button>
  
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/supabase.js'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')
  
  const handleSignup = async () => {
    errorMessage.value = ''
    successMessage.value = ''
  
    const { data, error } = await supabase.from('accounts').insert([
      {
        username: username.value,
        password: password.value,
      },
    ])
  
    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = 'Account created successfully!'
      username.value = ''
      password.value = ''
    }
  }
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .signup-container h2 {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 16px;
    font-size: 16px;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1565c0;
  }
  
  .error {
    color: red;
    margin-top: 12px;
  }
  
  .success {
    color: green;
    margin-top: 12px;
  }
  </style>
  