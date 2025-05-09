<template>
    <div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import account from '@/supabase'; // Make sure this points to your Supabase client

// Reactive variables
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

// Sign in function
const handleSignin = async () => {
  error.value = null;
  loading.value = true;

  try {
    // Sign in with Supabase Auth
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
    // Optionally redirect user to a different page after login
    // this.$router.push('/dashboard'); // Uncomment if you're using vue-router

  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>

</style>