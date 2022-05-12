import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Rod from '@/views/Rod.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import SingleItemView from '@/views/SingleItemView.vue';
import Acc from '@/views/Acc.vue';
Vue.use(VueRouter);

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rod',
    name: 'Rod',
    component: Rod
  },
  {
    path: '/acc',
    name: 'Acc',
    component: Acc
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/singleItem:id',
    name: 'SingleItemView',
    component: SingleItemView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
