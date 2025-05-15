<template>
  <div class="pack-opening-container">
    <div v-if="loading" class="loader-container">
      <div class="pokeball"></div>
    </div>

    <div v-else>
      <div class="open-button-container">
        <button @click="openPack" class="open-button">Open a Pack</button>
      </div>

      <div class="cards-container" v-if="cards.length">
        <div v-for="(card, index) in cards" :key="index" class="card">
          <img :src="card.images.small" :alt="card.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      cards: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000); // Show Pokéball loader for 2 seconds
  },
  methods: {
    async openPack() {
      try {
        const response = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=10');
        const data = await response.json();
        this.cards = data.data;
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    },
  },
};
</script>

<style scoped>
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
}

.open-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
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
</style>
