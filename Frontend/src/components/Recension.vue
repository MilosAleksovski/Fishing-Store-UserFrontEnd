<template>
  
<div >
  <b-card
    tag="article"
    style="max-width: 35rem;"
    class="mb-2"
    >

    <b-card-text >
        <p id = 'pR'>User: {{rec.username}} </p>
        <br>
        <p>{{rec.recension}}</p>
    </b-card-text>
    
    
  </b-card>

  </div>
</template>

<script>
  export default {
      
    name: 'Recension',
    data() {
      return {
        
        
       
       
      }
    },
    
    

    props: {
      rec: Object
    }
    
  }

</script>

<style scoped>
#pR{
    font-size: 1.6em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
 
</style>