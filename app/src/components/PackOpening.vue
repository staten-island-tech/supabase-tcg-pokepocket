<template>
    <div class="pack-opening-container">
      <div v-if="selectedCard" class="zoom-overlay" @click.self="closeZoom">
        <div
          class="zoom-card"
          @mousemove="handleMouseMove"
          @mouseleave="resetTilt"
          ref="zoomCard"
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
            :key="index"
            class="card"
            v-show="cardVisibility[index]"
            @click="zoomCard(card)"
          >
            <img :src="card.images.small" :alt="card.name" />
          </div>
        </div> <!-- close cards-container -->

        <div v-if="cards.length" class="add-inventory-container">
  <button @click="addToInventory" class="add-inventory-button">
    Add Cards to Inventory
  </button>
</div>

      </div> <!-- close v-else -->
    </div> <!-- close pack-opening-container -->
</template>

<script>

import account from '@/supabase'

export default {
  data() {
    return {
      loading: true,
      cards: [],
      cardVisibility: [],
      selectedCard: null,
      isShaking: false,

    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  methods: {
    
    async addToInventory() {
      try {
        const {
          data: { user },
          error: userError
        } = await account.auth.getUser()

        if (userError) throw userError
        if (!user) throw new Error('User not authenticated')

        const userId = user.id

        const insertPayload = this.cards.map(card => ({
          user_id: userId,
          card_id: card.id,
          card_data: card
        }))

        const { error } = await account.from('user_cards').upsert(insertPayload, {
          onConflict: ['user_id', 'card_id'] // handles duplicates based on your unique constraint
        })

        if (error) throw error

        alert('Cards added to your Supabase inventory!')
      } catch (error) {
        console.error('Error adding to Supabase inventory:', error)
        alert('Something went wrong adding cards to inventory.')
      }
    },

      async openPack() {
      try {
        this.blurring = true;
        this.isShaking = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isShaking = false;

        // There are about ~14000 cards total, so 1400 pages with pageSize=10
        const randomPage = Math.floor(Math.random() * 1400) + 1;

        const response = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${randomPage}`);
        const data = await response.json();
        this.cards = data.data;
        this.cardVisibility = Array(this.cards.length).fill(false);

        this.revealCards();
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    },

    revealCards() {
      this.cards.forEach((_, index) => {
        setTimeout(() => {
          this.cardVisibility[index] = true;
        }, index * 300);
      });
    },
    zoomCard(card) {
      this.selectedCard = card;
    },
    closeZoom() {
      this.selectedCard = null;
    },
    handleMouseMove(event) {
      const card = this.$refs.zoomCard;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 3;
      const centerY = rect.height / 3;

      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    },
    resetTilt() {
      const card = this.$refs.zoomCard;
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1.05)`;
    }
  }
};
</script>

<style scoped>
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
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
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

.pack-opening-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.pokeball {
  width: 500px;
  height: 500px;
  border: 50px solid black;
  border-radius: 50%;
  position: relative;
  background: white;
  animation: spin 1s linear infinite;
}

.pokeball::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  background: red;
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  transform: translateY(-50%);
}

.pokeball::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  background: white;
  border: 20px solid black;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.open-button-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.open-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 16px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px;
}

.card img {
  width: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.pack-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.booster-pack {
  width: 240px;
  transition: transform 0.2s ease;
}

.shake {
  animation: shake 1s ease;
}
.add-inventory-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #1d3557;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
}



@keyframes shake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-8px); }
  60% { transform: translateX(8px); }
  70% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
  90% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
</style>
