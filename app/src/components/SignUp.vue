<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      
      <div class="form-group">
        <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
          />
      </div>

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

const email = ref('')
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleSignup = async () => {
  try {
    errorMessage.value = ''
    successMessage.value = ''

    const { data: existingUser, error: userCheckError } = await supabase
      .from('accounts')
      .select('id')
      .eq('username', username.value)
      .single()

    if (userCheckError && userCheckError.code !== 'PGRST116') {
      errorMessage.value = userCheckError.message
      return
    }

    if (existingUser) {
      errorMessage.value = 'Username is already taken. Please choose another one.'
      return
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.value,  
      password: password.value,
    })

    if (signupError) {
      errorMessage.value = signupError.message
      return
    }

    const user = data?.user

    if (!user) {
      errorMessage.value = 'Sign-up failed. Please try again.'
      return
    }

    const { data: insertData, error: insertError } = await supabase
      .from('accounts')
      .insert([
        {
          id: user.id,
          email: email.value,
          username: username.value,
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
  } catch (err) {
    console.error('Signup error:', err)
    errorMessage.value = 'An unexpected error occurred'
  }
}


</script>
