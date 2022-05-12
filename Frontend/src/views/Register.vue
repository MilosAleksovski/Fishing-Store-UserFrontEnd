<template>
  <div id="app">
    <h1>Create Account</h1>
<br><br><br><br>
    <b-form @submit="onSubmit">

      <b-form-group label="First name:" label-for="firstname">
        <b-form-input id="firstname" v-model="form.firstName" placeholder="Enter first name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name:" label-for="lastname">
        <b-form-input id="lastname" v-model="form.lastName"  placeholder="Enter last name" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.username" placeholder="Enter username" required ></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password"  placeholder="Enter password" required></b-form-input>
      </b-form-group>

      
      <br>
      <b-button type="submit" variant="info">Submit</b-button>
    </b-form>
  </div>
</template>

<script>


  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
 

    data() {
      return {
        form: {
          firstName:'',
          lastName:'',
          email: '',
          username: '',
          password: '',
          role:'Korisnik'
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.register(this.form);
        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>

</style>
