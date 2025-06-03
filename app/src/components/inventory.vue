<template>
  <div class="inventory-container">
    <h2>Your Inventory</h2>
    <div v-if="inventoryCards.length" class="cards-container">
      <div v-for="card in inventoryCards" :key="card.id" class="card">
        <img :src="card.images.small" :alt="card.name" />
        <p>{{ card.name }}</p>
      </div>
    </div>
    <p v-else>No cards in your inventory yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inventoryCards: [],
    };
  },
  mounted() {
    // Load cards from localStorage on component mount
    const savedCards = JSON.parse(localStorage.getItem('pokemonInventory')) || [];
    this.inventoryCards = savedCards;
  },
};
</script>

<style scoped>
.inventory-container {
  padding: 1rem;
  box-sizing: border-box;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Default: mobile */
  gap: 16px;
  justify-items: center;
}

/* Tablet */
@media (min-width: 600px) {
  .cards-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(8, 1fr);
  }
}

.card {
  width: 100%;
  max-width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  object-fit: contain;
}

.card p {
  text-align: center;
  margin-top: 6px;
  font-weight: bold;
}


</style>
