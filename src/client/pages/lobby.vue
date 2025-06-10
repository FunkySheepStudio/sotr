<template>
  <div id="game-container"></div>
</template>
<script>
  module.exports = {
    components: {
    },
    data() {
      return {
        store
      }
    },
    mounted () {
      store.StartPhaserGame()
    }
  }
</script>