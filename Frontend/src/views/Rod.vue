<template>
  <div id="app">
    <strong>Rods</strong>
    <ProductList />
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList.vue';

  export default {
    name: 'Rod',
    
    components: {
      ProductList
    },
  }
</script>

<style scoped>
  strong{
    font-size: 2rem;
  }
</style>
