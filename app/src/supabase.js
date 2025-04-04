import { createClient } from '@supabase/supabase-js'

const accountURL = 'https://pvnqqrcshnnlnwozhmqs.supabase.co'
const accountKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bnFxcmNzaG5ubG53b3pobXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzgwNDgsImV4cCI6MjA1ODc1NDA0OH0.OaL4_Xwy-4YtPS72VPbATIh8cfo9-3v23i-exl5j7sE'
const account = createClient(accountURL, accountKey)

export default account
