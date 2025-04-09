<template>
    <div>
      <button @click="openPack">Open Pack</button>
      <div v-if="cards.length > 0">
        <div v-for="(card, index) in cards" :key="index">
          <CardFlipAnimation />
          <!-- You can display more card information here -->
          <img :src="card.imageUrl" alt="Card" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import supabase from '../services/supabaseClient'; // Import Supabase service
  import CardFlipAnimation from './CardFlipAnimation.vue'; // Import animation component
  
  export default {
    name: 'PackOpening',
    components: {
      CardFlipAnimation,
    },
    setup() {
      const cards = ref([]);
  
      const openPack = async () => {
        try {
          const response = await fetch('https://api.pokemontcg.io/v2/cards');
          const data = await response.json();
          cards.value = data.data.slice(0, 5); // Assuming the API returns cards data, take the first 5 cards
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };
  
      return {
        cards,
        openPack,
      };
    },
  };
  </script>
  