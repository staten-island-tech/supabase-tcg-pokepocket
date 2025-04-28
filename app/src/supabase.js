import { createClient } from '@supabase/supabase-js'

const accountURL = import.meta.env.VITE_SUPABASE_URL
const accountKey = import.meta.env.VITE_SUPABASE_KEY
const account = createClient(accountURL, accountKey)

export default account
