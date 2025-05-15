<template>
  <div v-if="showLoader">
    <PokeballLoader />
  </div>
  <div v-else class="login-page">
    <h2>Welcome Trainer</h2>
    <form @submit.prevent="handleSignin" class="form">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PokeballLoader from './PokeballLoader.vue';
import account from '@/supabase';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const showLoader = ref(false);

const handleSignin = async () => {
  error.value = null;
  loading.value = true;

  try {
    const { data, error: authError } = await account.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (authError) throw authError;
    const user = data?.user;
    if (!user) throw new Error('Login succeeded but no user object returned.');

    console.log('Login successful, user ID:', user.id);

    showLoader.value = true;
    setTimeout(() => {
      router.push('/open-pack');
    }, 2000);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
    router.push('/dashboard')
  }

};
<<<<<<< HEAD
=======

>>>>>>> d9ff4d8fdc590e7066a487d9a24ff42336e1ff3e
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  background-color: #ff3c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #e63232;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
