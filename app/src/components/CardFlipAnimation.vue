<template>
    <svg ref="card" viewBox="0 0 100 100">
      <!-- SVG content here -->
      <rect width="100" height="100" rx="15" fill="#ff0" />
      <!-- Add more elements here for the front and back of the card -->
    </svg>
  </template>
  
  <script>
  import { gsap } from 'gsap';
  
  export default {
    name: 'CardFlipAnimation',
    mounted() {
      this.animateCardFlip();
    },
    methods: {
      animateCardFlip() {
        const card = this.$refs.card;
        gsap.fromTo(card, { rotationY: 0 }, { rotationY: 180, duration: 1 });
      }
    }
  };
  </script>
  