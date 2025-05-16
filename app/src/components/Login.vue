<template>
    <div class="signin">
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
  </template>
  

<script setup>
import { ref } from 'vue';
import account from '@/supabase';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

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


  } catch (err) {
    error.value = err.message;

account.auth.onAuthStateChange((event, session) => {
  console.log('Auth change:', event);
  if (session) {
    console.log('User is logged in:', session.user);
  } else {
    console.log('User is logged out');
  }
});


} finally {
    loading.value = false;
  }
};
<<<<<<< HEAD

=======
>>>>>>> parent of e258f2c (e)
</script>


<style scoped>
.signin {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 16px;
}
</style>
