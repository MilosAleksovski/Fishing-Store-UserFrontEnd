<template>
  <div >
    
    <div  class="view overlay">
        <b-card-group columns>
          <SingleRod  v-for="rod in paginatedItems" :key="rod.id" :rod="rod" />
        </b-card-group>
    </div>
    
    <b-pagination
          @change="onPageChanged"
          :total-rows=totalRows
          :per-page=perPage
          v-model="currentPage"
          class="my-0"
    />


  </div>
    
</template>

<script>
  import SingleRod from '@/components/SingleRod.vue'; 
  import { mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'ProductList',
    components: {
      SingleRod,
    },
    data() {
      return {
        rodList: [],
        paginatedItems: [],
        currentPage: 1,
        perPage: 6,
        totalRows: null
      }
    },

    computed: {
      ...mapState([
        'rods'
      ])
    },

    watch: {
      
    },

    mounted() {
      this.fetchRods();
    },

    methods: {
       ...mapActions([
        'fetchRods'
      ]),
      
      paginate(page_size, page_number) {
          let itemsToParse = this.rodList;
          this.paginatedItems = itemsToParse.slice(
            page_number * page_size,
            (page_number + 1) * page_size
          );
      },
    
      onPageChanged(page) {
          this.paginate(this.perPage, page - 1);
      }
    }
    ,
    watch:{
      rods(nVal){
          this.rodList = this.rods[0];
          this.totalRows = this.rodList.length;
          this.paginate(this.perPage, 0);
      }
    }

    
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
  
  
</style>