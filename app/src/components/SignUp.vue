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

    // Check if the username already exists
    const { data: existingUser, error: userCheckError } = await supabase
      .from('accounts')
      .select('id')
      .eq('username', username.value)  // Check if the username is already in use
      .single()

    // Handle errors from the username check
    if (userCheckError && userCheckError.code !== 'PGRST116') {  // 'PGRST116' means no rows found
      errorMessage.value = userCheckError.message
      return
    }

    // If username already exists
    if (existingUser) {
      errorMessage.value = 'Username is already taken. Please choose another one.'
      return
    }

    // Sign up with the email and password
    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.value,  
      password: password.value,
    })

    // If sign-up error occurs, handle it
    if (signupError) {
      errorMessage.value = signupError.message
      return
    }

    // Access the user from the data returned by signUp
    const user = data?.user

    // If there is no user in the response (error in signup), handle it
    if (!user) {
      errorMessage.value = 'Sign-up failed. Please try again.'
      return
    }

    // Insert additional user info into the 'accounts' table
    const { data: insertData, error: insertError } = await supabase
      .from('accounts')
      .insert([
        {
          id: user.id,  // Link this user to the 'accounts' table using the user_id
          email: email.value,  // Store the email
          username: username.value,  // Store the username
        },
      ])

    // Handle errors during the insertion into 'accounts'
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
