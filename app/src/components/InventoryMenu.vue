<template>
  <div class="inventory-container">
    <h1>Your Card Inventory</h1>

    <div v-if="loading" class="loading">Loading cards...</div>
    <div v-else-if="cards.length === 0" class="no-cards">No cards found.</div>
    
    <div v-else class="card-grid">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img :src="card.images?.small" :alt="card.name" />
        <p>{{ card.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import account from '@/supabase'

const cards = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data: { user }, error: userError } = await account.auth.getUser()
    if (userError || !user) throw userError || new Error('User not authenticated')

    const { data, error } = await account
      .from('user_cards')
      .select('card_data')
      .eq('user_id', user.id)

    if (error) throw error

    cards.value = data.map(row => row.card_data)
  } catch (err) {
    console.error('Error loading inventory:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.inventory-container {
  padding: 2rem;
  text-align: center;
}

.loading, .no-cards {
  font-size: 1.2rem;
  color: #555;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 2rem;
}

.card {
  width: 150px;
  text-align: center;
}

.card img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>
