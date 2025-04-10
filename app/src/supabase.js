// src/supabase.js
import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
=======
const accountURL = import.meta.env.VITE_SUPABASE_URL
const accountKey = import.meta.env.VITE_SUPABASE_KEY
const account = createClient(accountURL, accountKey)
>>>>>>> 7aa9eb5b18ea9eafa84bee2ae8ec4e4cf252f221

export default supabase;
