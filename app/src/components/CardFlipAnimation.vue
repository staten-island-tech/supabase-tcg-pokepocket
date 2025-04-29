<template>
    <div class="card-flip">
      <div class="card-inner">
        <div class="card-front">
          <!-- Front of the card (could be a Pokéball) -->
          <img src="@/assets/pokeball.svg" alt="Pokeball" />
        </div>
        <div class="card-back">
          <!-- Back of the card (revealed card image) -->
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardFlipAnimation'
  }
  </script>
  
  <style scoped>
  .card-flip {
    width: 150px;
    height: 200px;
    perspective: 1000px;
    margin: 10px;
  }
  
  .card-inner {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    position: relative;
  }
  
  .card-flip:hover .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  
  .card-front {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card-back {
    background: white;
    transform: rotateY(180deg);
    overflow: hidden;
  }
  </style>
  