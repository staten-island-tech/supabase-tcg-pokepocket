<template>
  <div class="pack-opening">
    <Sidebar /> <!-- Navigation sidebar -->

    <div class="content">
      <button @click="openPack" class="open-button">Open a Pack</button>
      <div v-if="cards.length" class="card-grid">
        <img
          v-for="(card, index) in cards"
          :key="index"
          :src="card.images.small"
          :alt="card.name"
          class="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    async openPack() {
      try {
        const response = await fetch(
          'https://api.pokemontcg.io/v2/cards?pageSize=5'
        );
        const data = await response.json();
        this.cards = data.data;

        // ✅ Added this: Save pulled cards to localStorage
        const existing = JSON.parse(localStorage.getItem('inventory') || '[]');
        localStorage.setItem('inventory', JSON.stringify([...existing, ...this.cards]));

      } catch (error) {
        console.error('Error opening pack:', error);
      }
    },
  },
};
</script>

<style scoped>
.pack-opening {
  display: flex;
}

.content {
  flex: 1;
  padding: 2rem;
}

.open-button {
  background-color: #ff3c3c;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.25rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.2s ease;
}

.open-button:hover {
  background-color: #e63232;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
