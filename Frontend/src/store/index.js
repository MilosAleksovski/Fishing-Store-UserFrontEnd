import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rods: [],
    recensions: [],
    token: '',
    user:Object,
    userById:Object
  },

  mutations: {
    
    addRods(state, rods) {
      state.rods = [];
      state.rods.push(rods);
    },
    addRecension(state, rec) {
      state.recensions = [];
      state.recensions = rec;
    },
    addRecensionSocket(state, rec) {
      state.recensions.push(rec);
    },
    
    setUser(state, user) {
      state.user = user;
      
    },
    setUserById(state, user) {
      state.userById = user;
      
    },
   
   
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
  },

  actions: {
    fetchRods({ commit }) {
      fetch('http://localhost:8020/stapovi/vratiStapove')
        .then( obj => obj.json() )
          .then( res => {
  
            commit('addRods', res);
          });

    },
 
    fetchRecension({ commit }, obj) {
      fetch('http://localhost:8020/recenzije/vratiRecenzije', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
      .then( tkn => {
        
        commit('addRecension', tkn);
        
    });
        
    }
    ,
 
    fetchRecensionUser({ commit }, obj) {
      fetch('http://localhost:8020/recenzije/vratiRecenzijeUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
      .then( tkn => {
        
        commit('addRecension', tkn);
        
    });
        
    },
   
  
        createRecension({ commit }, obj) {
          fetch('http://localhost:8020/recenzije/dodajRecenziju', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
          }).then( res => res.json() )
            
        },
        

    getUser({ commit },obj) {
          fetch('http://localhost:8020/korisnici/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
          }).then( res => res.json() )
            .then( tkn => {
              
                commit('setUser', tkn)
              
          });
    },
    getUserById({ commit },obj) {

      fetch('http://localhost:8020/korisnici/getUserById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          
            commit('setUserById', tkn)
          
      });
    }, 
    register({ commit }, obj) {
      fetch('http://localhost:8020/korisnici/dodajKorisnika', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn.token)
          }
        });
      },

    login({ commit }, obj) {
      fetch('http://localhost:9000/api_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    socket_rec({ commit }, msg) {
      const rec = JSON.parse(msg);
      commit('addRecensionSocket', rec);
    }
  }
})
