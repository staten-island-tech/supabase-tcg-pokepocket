<template>
    <div>
        <form @submit.prevent>
            <label for="username"> Username: </label>
            <input type="text" id="username" v-model="username"></input>
            <label for="username"> Username: </label>
            <input type="text" id="password" v-model="password"></input>
        </form>

        <div id="">
            <button @click="SignUp" id="login"> Log In </button>
            <button @click="SignUp" id="SignUp"> Sign Up </button>
        </div>

    </div>
</template>

<script>
import supabase from '@/supabase'
import { ref } from 'vue';

let username = ref('')
let password = ref('')

</script>

<style scoped>

</style>