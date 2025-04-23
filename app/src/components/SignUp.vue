<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">Username (email)</label>
        <input
          id="username"
          type="email"
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

  // Check if the username already exists
  const { data: existingUser, error: userCheckError } = await supabase
    .from('accounts')
    .select('id')
    .eq('username', username.value)  // Check if the username is already in use
    .single()

  if (userCheckError && userCheckError.code !== 'PGRST116') {  // 'PGRST116' means no rows found
    errorMessage.value = userCheckError.message
    return
  }

  if (existingUser) {
    errorMessage.value = 'Username is already taken. Please choose another one.'
    return
  }

  const { user, error } = await supabase.auth.signUp({
    email: email.value,  
    password: password.value,
  })

  if (error) {
    errorMessage.value = error.message
  } else {
    // Store additional user info in the 'accounts' table
    const { data, error: insertError } = await supabase
      .from('accounts')
      .insert([
        {
          id: user.id,  // Link this user to the 'accounts' table using the user_id
          email: email.value,  // Store the email
          username: username.value,  // Store the username
        },
      ])

    if (insertError) {
      errorMessage.value = insertError.message
    } else {
      successMessage.value = 'Account created successfully!'
      email.value = ''
      username.value = ''
      password.value = ''
    }
  }
}

</script>
