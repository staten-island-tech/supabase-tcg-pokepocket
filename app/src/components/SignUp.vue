<template>
  <div class="signup">
    <h2>Create an Account</h2>
    <form @submit.prevent="handleSignup">
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
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter a username"
          required
          minlength="3"
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
        {{ loading ? 'Signing up...' : 'Sign Up' }}
      </button>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <p class="login-link">
        Already have an account?
        <router-link to="/login">Log In</router-link>
      </p>

    </form>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import account from '@/supabase'; // Make sure this points to your Supabase client

// Reactive variables
const email = ref('');
const username = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

// Signup function
const handleSignup = async () => {
  error.value = null;
  loading.value = true;

  try {
    // Sign up with Supabase Auth and include `username` in metadata
    const { data, error: authError } = await account.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value // This goes to `raw_user_meta_data` in your DB
        }
      }
    });

    if (authError) {
      throw authError;
    }

    const user = data?.user;
    if (!user) {
      throw new Error('Signup succeeded but no user object returned.');
    }

    console.log('Signup successful, user ID:', user.id);
    // No need to manually insert into 'accounts' — the trigger handles it
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const {
    data: { session }
  } = await account.auth.getSession();

  if (session?.user) {
    router.push('/dashboard');
  }
});

</script>

<style scoped>
.signup {
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
