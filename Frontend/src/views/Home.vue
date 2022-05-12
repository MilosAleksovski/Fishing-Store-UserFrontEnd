<template>
  <div id="app">

    <p>
     
    </p>

  <div>
    <b-carousel
       id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      
    >
     

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="500"
            height="480"
            src="../assets/backq.jpg"
            alt="image slot"
            
          >
        </template>
      </b-carousel-slide>

       <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/4.png"
            alt="image slot"
          >
        </template>
        
      </b-carousel-slide>

       <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../assets/3.jpg"
            alt="image slot"
          >
        </template>
        
      </b-carousel-slide>
       

      
 </b-carousel>
    
  </div>

  </div>
</template>

<script>
 

  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    
    
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
   
   methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    
    components: {
      Header
    }
  }

</script>
