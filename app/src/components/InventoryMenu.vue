<template>
  <div class="inventory-container">
    <h1>Your Card Inventory</h1>

    <div v-if="loading" class="loading">Loading cards...</div>
    <div v-else-if="cards.length === 0" class="no-cards">No cards found.</div>

    <div v-else class="card-grid">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        @click="zoomCard(card)"
      >
        <img :src="card.images?.small" :alt="card.name" />
        <p>{{ card.name }}</p>
      </div>
    </div>

    <!-- Zoom Overlay -->
    <div v-if="selectedCard" class="zoom-overlay" @click.self="closeZoom">
      <div
        class="zoom-card"
        ref="zoomCardRef"
        @mousemove="handleMouseMove"
        @mouseleave="resetTilt"
      >
        <img :src="selectedCard.images?.large || selectedCard.images?.small" :alt="selectedCard.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import account from '@/supabase'

const cards = ref([])
const loading = ref(true)
const selectedCard = ref(null)
const zoomCardRef = ref(null)

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

function zoomCard(card) {
  selectedCard.value = card
}

function closeZoom() {
  selectedCard.value = null
}

function handleMouseMove(event) {
  const cardEl = zoomCardRef.value
  if (!cardEl) return
  const rect = cardEl.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -20
  const rotateY = ((x - centerX) / centerX) * 20
  cardEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
}

function resetTilt() {
  if (zoomCardRef.value) {
    zoomCardRef.value.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.05)`
  }
}
</script>

<style scoped>
.inventory-container {
  padding: 2rem;
  text-align: center;
}

.loading,
.no-cards {
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
  cursor: pointer;
}

.card img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Zoom Overlay & Tilt Effects */
.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  perspective: 1000px;
}

.zoom-card {
  position: relative;
  max-width: 400px;
  max-height: 600px;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  animation: zoomIn 1s ease-out;
  transition: transform 0.2s ease-in;
  will-change: transform;
}

.zoom-card img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

@keyframes zoomIn {
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
