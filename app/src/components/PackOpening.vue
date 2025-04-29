<template>
  <div>
    <button @click="openPack" :disabled="isLoading">
      {{ isLoading ? "Opening Pack..." : "Open Pack" }}
    </button>

    <div v-if="isLoading" class="loading-spinner">
      <img src="@/assets/pokeball.svg" alt="Loading Pokeball" class="spinning-pokeball"/>
    </div>

    <div v-else-if="cards.length > 0" class="cards-grid">
      <div v-for="(card, index) in cards" :key="index">
        <CardFlipAnimation>
          <img :src="card.images.small" alt="Card" />
        </CardFlipAnimation>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CardFlipAnimation from './CardFlipAnimation.vue';

export default {
  name: 'PackOpening',
  components: { CardFlipAnimation },
  setup() {
    const cards = ref([]);
    const isLoading = ref(false);

    const openPack = async () => {
      isLoading.value = true;
      try {
        const response = await fetch('https://api.pokemontcg.io/v2/cards');
        const data = await response.json();
        cards.value = data.data.slice(0, 10); // 10 cards for a full pack
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        isLoading.value = false;
      }
    };

    return { cards, isLoading, openPack };
  }
}
</script>

<style scoped>
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.spinning-pokeball {
  width: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

button {
  background-color: #ffcb05;
  color: #2a75bb;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #2a75bb;
  color: #ffcb05;
}
</style>
