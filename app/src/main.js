import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router          from './router'
import account         from './supabase'
import App             from './App.vue'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()
const app   = createApp(App)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()

account.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) authStore.setUser(session.user)
})

account.auth.onAuthStateChange((_e, session) => {
  if (session?.user) authStore.setUser(session.user)
  else authStore.clearUser()
})

app.mount('#app')
