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
    const savedCards = JSON.parse(localStorage.getItem('pokemonInventory')) || [];
    this.inventoryCards = savedCards;
  },
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
  grid-template-rows: repeat(5, 1fr); /* 5 rows */
  grid-auto-flow: column; /* Fill columns first */
  gap: 24px;
  width: 100%;
  height: 100vh; /* Takes full screen height */
  box-sizing: border-box;
  overflow-y: auto;
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



</style>
