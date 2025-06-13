<template>
  <div class="pack-opening-container">
    <div v-if="selectedCard" class="zoom-overlay" @click.self="closeZoom">
      <div
        class="zoom-card"
        @mousemove="handleMouseMove"
        @mouseleave="resetTilt"
        ref="zoomCardRef"
      >
        <img :src="selectedCard.images.large || selectedCard.images.small" :alt="selectedCard.name" />
      </div>
    </div>

    <div v-if="loading" class="loader-container">
      <div class="pokeball"></div>
    </div>

    <div v-else>
      <div v-if="!cards.length" class="open-button-container">
        <div class="pack-wrapper">
          <img
            src="@/assets/151-pack.png"
            alt="Booster Pack"
            class="booster-pack"
            :class="{ shake: isShaking }"
          />
        </div>
        <button @click="openPack" class="open-button">Open a Pack</button>
      </div>

      <div class="cards-container">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="card"
          v-show="cardVisibility[index]"
          @click="zoomCard(card)"
        >
          <img :src="card.images.small" :alt="card.name" />
        </div>
      </div>

      <div v-if="cards.length" class="add-inventory-container">
        <button @click="addToInventory" class="add-inventory-button">Add Cards to Inventory</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import account from '@/supabase'

const loading = ref(true)
const cards = ref([])
const cardVisibility = ref([])
const selectedCard = ref(null)
const isShaking = ref(false)
const zoomCardRef = ref(null)

setTimeout(() => { loading.value = false }, 2000)

async function openPack() {
  isShaking.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isShaking.value = false

  const randomPage = Math.floor(Math.random() * 1400) + 1
  const response = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${randomPage}`)
  const data = await response.json()
  cards.value = data.data
  cardVisibility.value = Array(cards.value.length).fill(false)
  cards.value.forEach((_, idx) => setTimeout(() => cardVisibility.value[idx] = true, idx * 300))
}

function zoomCard(card) { selectedCard.value = card }
function closeZoom() { selectedCard.value = null }

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
  if (zoomCardRef.value) zoomCardRef.value.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.05)`
}

async function addToInventory() {
  try {
    const { data: { user }, error: userErr } = await account.auth.getUser()
    console.log('Current user response:', { user, userErr })
    if (userErr || !user) throw userErr || new Error('Not authenticated')
    const userId = user.id
    console.log('Authenticated userId:', userId)

    const setsPayload = [
      ...new Map(cards.value.map(c => [c.set.id, {
        id:            c.set.id,
        name:          c.set.name,
        series:        c.set.series,
        printed_total: c.set.printedTotal,
        total:         c.set.total,
        legalities:    c.set.legalities,
        ptcgo_code:    c.set.ptcgoCode,
        release_date:  c.set.releaseDate,
        updated_at:    c.set.updatedAt,
        images:        c.set.images
      }])).values()
    ]

    const { data: setsData, error: setsError } = await account.from('sets').upsert(setsPayload, { onConflict: ['id'] })
    console.log('Sets upsert result:', { setsData, setsError })
    if (setsError) throw setsError

    const cardsPayload = cards.value.map(c => ({
      card_id:                 c.id,
      name:                    c.name,
      supertype:               c.supertype,
      subtypes:                c.subtypes,
      hp:                      parseInt(c.hp, 10) || null,
      types:                   c.types,
      evolves_from:            c.evolvesFrom || null,
      evolves_to:              c.evolvesTo || [],
      attacks:                 c.attacks,
      weaknesses:              c.weaknesses,
      resistances:             c.resistances,
      retreat_cost:            c.retreatCost,
      converted_retreat_cost:  c.convertedRetreatCost,
      set_id:                  c.set.id,
      number:                  c.number,
      artist:                  c.artist,
      rarity:                  c.rarity,
      flavor_text:            c.flavorText,
      national_pokedex_numbers: c.nationalPokedexNumbers,
      legalities:             c.legalities,
      images:                  c.images,
      tcgplayer:              c.tcgplayer,
      cardmarket:             c.cardmarket
    }))

    const { data: cardsData, error: cardsError } = await account.from('cards').upsert(cardsPayload, { onConflict: ['card_id'] })
    console.log('Cards upsert result:', { cardsData, cardsError })
    if (cardsError) throw cardsError

    const userCardsPayload = cards.value.map(c => ({
      user_id:   userId,
      card_id:   c.id,
      card_data: c
    }))

    const { data: userCardsData, error: userCardsError } = await account.from('user_cards').upsert(userCardsPayload, { onConflict: ['user_id', 'card_id'] })
    console.log('User_cards upsert result:', { userCardsData, userCardsError })
    if (userCardsError) throw userCardsError

    alert('Cards added to inventory!')
  } catch (err) {
    console.error('Error in addToInventory:', err)
    alert('Error adding cards to inventory: ' + err.message)
  }
}
</script>

<style scoped>
.zoom-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000; perspective: 1000px; }
.zoom-card { position: relative; max-width: 400px; max-height: 600px; padding: 1rem; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); animation: zoomIn 1s ease-out; transition: transform 0.2s ease-in; will-change: transform; }
.zoom-card img { width: 100%; height: auto; border-radius: 12px; }
@keyframes zoomIn { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; }}
.pack-opening-container { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.loader-container { display: flex; justify-content: center; align-items: center; height: 100vh; }
.pokeball { width: 500px; height: 500px; border: 50px solid black; border-radius: 50%; position: relative; background: white; animation: spin 1s linear infinite; }
.pokeball::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 50%; background: red; border-top-left-radius: 50% 100%; border-top-right-radius: 50% 100%; transform: translateY(-50%); }
.pokeball::after { content: ''; position: absolute; top: 50%; left: 50%; width: 120px; height: 120px; background: white; border: 20px solid black; border-radius: 50%; transform: translate(-50%, -50%); z-index: 2; }
@keyframes spin { to { transform: rotate(360deg); }}
.open-button-container { margin: 20px; display: flex; flex-direction: column; align-items: center; }
.open-button { padding: 10px 20px; font-size: 18px; background-color: #e63946; color: white; border: none; border-radius: 12px; cursor: pointer; margin-top: 16px; }
.cards-container { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; padding: 20px; }
.card img { width: 150px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
.pack-wrapper { display: flex; justify-content: center; align-items: center; margin-bottom: 8px; }
.booster-pack { width: 240px; transition: transform 0.2s ease; }
.shake { animation: shake 1s ease; }
.add-inventory-button { padding: 10px 20px; font-size: 18px; background-color: #1d3557; color: white; border: none; border-radius: 10px; cursor: pointer; margin-top: 20px; }
@keyframes shake { 0% { transform: translateX(0); } 10% { transform: translateX(-10px); } 20% { transform: translateX(10px); } 30% { transform: translateX(-10px); } 40% { transform: translateX(10px); } 50% { transform: translateX(-8px); } 60% { transform: translateX(8px); } 70% { transform: translateX(-6px); } 80% { transform: translateX(6px); } 90% { transform: translateX(-4px); } 100% { transform: translateX(0); }}
</style>
