<template>
  <div class="inventory-container">
    <h2>Your Inventory</h2>

    <div v-if="inventoryCards.length" class="cards-container">
      <div
        v-for="card in inventoryCards"
        :key="card.id"
        class="card"
        @click="zoomCard(card)"
      >
        <img :src="card.images.small" :alt="card.name" />
        <p>{{ card.name }}</p>
      </div>
    </div>
    <p v-else>No cards in your inventory yet.</p>

    <!-- Zoom Overlay -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      inventoryCards: [],
      selectedCard: null,
    };
  },
  mounted() {
    const savedCards = JSON.parse(localStorage.getItem('pokemonInventory')) || [];
    this.inventoryCards = savedCards;
  },
  methods: {
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
.inventory-container {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.cards-container {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column;
  gap: 24px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card img {
  width: 100%;
  height: auto;
  max-width: 160px;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card p {
  text-align: center;
  margin-top: 12px;
  font-size: 1rem;
  font-weight: bold;
}

/* Zoom overlay styles */
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
  animation: zoomIn 0.5s ease-out;
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
