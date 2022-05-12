<template>
  
<div >
  <b-card
    tag="article"
    style="max-width: 29rem;"
    class="mb-2"
    >

  
   <b-img v-bind:src="rod.image" fluid alt="Fluid image" ></b-img>

    <b-card-text >
      <b>Brand: </b> {{ rod.brand }} 
      <br>
     <b>Model:</b> {{ rod.model }}
     <br>
     <b>Price:</b> {{ rod.price }} eu
    </b-card-text>
    
    <b-button v-if="token" variant="info " id= "btn" @click="modalShow = !modalShow">Buy  Rod</b-button>
    <b-button  @click="showRod(rod.id)" variant="info " id= "btn">Show Rod</b-button>

    
    <b-modal v-model="modalShow" title="Confirmation of the purchase of the rod" size="xl" header-bg-variant="info" header-text-variant="light">
      <p><b>Brand: </b> {{ rod.brand }} , <b>Model:</b> {{ rod.model }},<b>Type:</b> {{ rod.type }}, <b>Max Casting Weight:</b> {{ rod.weight }} g</p><br>
      <b-img v-bind:src="rod.image"  ></b-img> <br>
      <strong>Price: {{ rod.price }} eu  </strong>
      
      <template #modal-footer>
        <div class="w-100">

          <b-button variant="info " id= "btn" @click="modalShow=false">
            Confirm
          </b-button>

          <b-button variant="info " id= "btn" @click="modalShow=false">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
    
  </b-card>

  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
     
    name: 'SingleRod',

    data() {
      return {
        modalShow: false
      }
    }
    ,
    computed: {
      ...mapState([
        'token'
      ])
    },
    props: {
      rod: Object
    }
    ,
     methods: {
      
      showRod(rodId) {
          this.$router.push({ name: 'SingleItemView', params: { id: rodId } });
      }
    }
    
  }

</script>

<style scoped>
p{
    font-size: 1.5em;
      text-align: left;
  }
  #btn{
    margin-left: 24px;
  }

 

</style>