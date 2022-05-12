<template>
  <div id="app">

    <br><br><br><br>
     
    <div id="main">
        


            <div v-for="rec in recs" :key="rec.id">
                <pre class="mt-3 mb-0">Recension for rod {{ rec.rodName }} : <b>{{ rec.recension }}</b></pre>
                <b-form-textarea
                    id="textarea"
                    v-model="text"
                    placeholder="Change Recension..."
                    rows="3"
                    max-rows="6"
                > fsafasfsa</b-form-textarea>
                <div>
                    <b-button variant="info" @click="change" >Change</b-button>
                    <b-button  id= "btn" variant="info" @click="deleteRec(rec)">Delete</b-button>
                </div>
                <br><br>
            </div>
        <div>
  
</div>    

       
    </div>  
  </div>
</template>

<script>
    
  import { mapActions, mapState, mapMutations } from 'vuex';
 import Recension from '@/components/Recension.vue'; 
  export default {
    name: 'SingleItemView',
    components: {
      Recension,
    },
    data() {
      return {
        text:'',
        recs:[]
       
      }
    },
    computed: {
      ...mapState([
        'recensions',
        'user',
        'rods'
      ])
    },
    
    
    methods: {
  
      ...mapActions([
        'createRecension',
        'fetchRecensionUser',
        'getUser',
        'fetchRods',
        'deleteRec'
      ]),
      change() {
          console.log("AA");
          this.text = "AAAA";
          
      },
      deleteRec(rec) {
          console.log("A");
          
      }
    }
    ,
    mounted() {
      let form = {
        var:1,
        token:localStorage.token
      }
      this.getUser(form);
        this.fetchRods();
      
     }
    ,
    watch:{
      user(nVal){
        let form2 = {
            id : nVal.id
        }
        this.fetchRecensionUser(form2);

      },
      
      rods(nVal){
      },
      recensions(nVal){
          console.log(this.recensions.length);
         let ro = this.rods[0];
        for(let i = 0; i < this.recensions.length;i++){
            
            for(let j = 0; j < ro.length; j++){
                if(this.recensions[i].rodId == ro[j].id){
                    let forma = {
                        id:this.recensions[i].id,
                        idUser:this.recensions[i].userId,
                        recension:this.recensions[i].recension,
                        rodName:ro[j].model,
                    }
                    this.recs.push(forma);
                }
            }
        }
        console.log(this.recs[0]);
      }
    }
    
  }
</script>

<style scoped>
   
.product {
    background-color: #eee
}
#main{
  margin: auto;
  overflow:auto;
  height: 36rem;
  width: 60rem;
  background-color: #eee;
   
}


#pR{
    font-size: 1.6em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#btn{
    margin-left: 30px;
}


</style>
