<template>
    <div class="signup">
        <form @submit.prevent="">
            <div>
                <input></input>
            </div>
            <div>
                <input></input>
            </div>
            <div>
                <input></input>
            </div>
            <button type="submit">Sign Up</button>
        </form>
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