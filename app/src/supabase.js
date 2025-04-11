// src/supabase.js
import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
=======
<<<<<<< HEAD
<<<<<<< HEAD
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
=======
const accountURL = import.meta.env.VITE_SUPABASE_URL
const accountKey = import.meta.env.VITE_SUPABASE_KEY
=======
const accountURL = 'https://pvnqqrcshnnlnwozhmqs.supabase.co'
const accountKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bnFxcmNzaG5ubG53b3pobXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzgwNDgsImV4cCI6MjA1ODc1NDA0OH0.OaL4_Xwy-4YtPS72VPbATIh8cfo9-3v23i-exl5j7sE'
>>>>>>> parent of 3bfa16e (bombaclatt)
const account = createClient(accountURL, accountKey)
>>>>>>> 7aa9eb5b18ea9eafa84bee2ae8ec4e4cf252f221
>>>>>>> parent of f73e440 (n,)

export default supabase;
