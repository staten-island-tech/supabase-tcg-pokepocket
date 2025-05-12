<template>
  <div class="home">
    <h1>Welcome to the Pokémon Card Pack Simulator!</h1>
    <button @click="invertColors">Invert Colors</button>
  </div>
</template>

<script setup>
const invertColors = () => {
  const body = document.body
  const currentBg = getComputedStyle(body).backgroundColor
  if (currentBg === 'rgb(173, 216, 230)') {
    body.style.backgroundColor = '#111'
    body.style.color = '#00ff00'
  } else {
    body.style.backgroundColor = '#add8e6'
    body.style.color = 'yellow'
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 2rem;
}

button {
  background-color: transparent;
  color: inherit;
  border: 2px solid currentColor;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
