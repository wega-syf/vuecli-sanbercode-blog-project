<template>
 <!-- App.vue -->
  <v-app>
    <Alert/>
    <Dialog />
    <!-- NAV SIDEBAR -->
    <v-navigation-drawer app v-model="drawer"> 
      
        <v-list>

          <v-list-item v-if="!guest">
            <v-list-item-avatar > 
                <v-img :src='user.photo_profile ? (domain + user.photo_profile) : "https://picsum.photos/200/300"'></v-img>
            </v-list-item-avatar>
            <v-list-item-content >
              {{user.name}}
            </v-list-item-content>
          </v-list-item>

          <div class="pa-2" v-if="guest">
            <v-btn block color='primary' class="mb-1" @click="login">
              <v-icon left>mdi-lock</v-icon>
              Login
            </v-btn>
            <v-btn block color='success' @click="signUp" class="mb-1">
              <v-icon left>mdi-account</v-icon>
              Sign Up
            </v-btn>
          </div>

          <v-divider></v-divider>
          
          <v-list-item
           v-for="(item, index) in menus" :key="index" :to="item.route">
            <v-list-item-icon>
              <v-icon left>{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{item.title}}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>  

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn color="red" block dark @click="logout">
            <v-icon>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template> 


    </v-navigation-drawer>

     <!--TOP NAV BAR -->
    <v-app-bar app color='primary'>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blogs Tutorial</v-toolbar-title>
      <div class="pt-4 ml-3">

        <ToggleDarkMode  />
      </div>
    </v-app-bar> 

    <!-- Sizes your content based upon application components -->
    <v-main>
    
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-slide-y-transition>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
      @Wegs 2022 | Sanbercode Official
    </v-footer>
  </v-app>

</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import Alert from './components/Alert.vue'
import Dialog from './components/Dialog.vue'
import ToggleDarkMode from './components/ToggleDarkMode.vue'

export default {
  name: 'App',
  components:{
    Alert,
    Dialog,
    ToggleDarkMode
  },
  data: () => ({
    //
    drawer:false,
    domain:'http://demo-api-vue.sanbercloud.com',
    menus:[
      {title: 'Home', icon :'mdi-home', route:'/'},
      {title :' Blogs', icon : 'mdi-note', route: '/blogs'},
      {title :' About', icon : 'mdi-information', route: '/about'}
    ]
  }),
  computed: {
    ...mapGetters({
      guest : 'auth/getGuest',
      user : 'auth/getUser',
      token : 'auth/getToken'
    })
  },
  methods:{
    toggleDrawer(){
      this.drawer = !this.drawer
    },
    ...mapActions({
      'setAction' : 'alert/setAction', // Dari alert
      'setDialogComponent' : 'dialog/setComponentAction',
      'setToken' : 'auth/setToken',
      'setUser' : 'auth/setUser',
      'checkToken' : 'auth/checkToken'
      
    }),
    login(){
      
      // panggil component login
      this.setDialogComponent({component : 'login'})

      //  *** GAPERLU LAGI KARENA UDAH DIHANDLE LOGIN ***
        // // user is no longer a guest
        // this.guest = false


      // ***UDAH DIPINDAHIN KE COMPONENT LOGIN *** 
        // // Call a success alert 
        // this.setAction({
        //   status : true,
        //   color: 'success',
        //   text : 'Selamat, anda berhasil login'

      // })
    },
    signUp(){
      this.setDialogComponent({component: 'register'})
    },
    logout(){
      // Call a request to the API to logout
      const config = {
        method : 'post',
        url: this.domain + '/api/v2/auth/logout',
        headers:{
          'Authorization' : 'Bearer' + this.token
        }
      }
      this.axios(config)
      .then(response=>{

        console.log(response);
        // Clears out token and user state from the store
        this.setToken('')
        this.setUser({})

        // Call a successful logout alert 
        this.setAction({
          status : true,
          color: 'deep-purple darken-2',
          text : 'Selamat, anda berhasil logout'
  
        })
      })
      .catch(error => {
        console.log(error);
        this.setAction({
          status : true,
          color: 'deep-purple darken-2',
          text : error.data
  
        })
      })

      
    },

  },
  mounted() {
    // Perlu di cek lagi tokennya, meskipun sudah ada, karena mungkin token sudah expire atau terjadi perubahan sehingga sudah tidak valid
    if(this.token){
      this.checkToken(this.token)  
    }
  }, 
};
</script>
