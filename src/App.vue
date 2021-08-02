<template>
 <!-- App.vue -->
  <v-app>
    <!-- NAV SIDEBAR -->
    <v-navigation-drawer app v-model="drawer"> 
      
        <v-list>

          <v-list-item>
            <v-list-item-avatar > 
                <v-img src='https://picsum.photos/200/300'></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              Wega Winarso
            </v-list-item-content>
          </v-list-item>

          <div class="pa-2" v-if="guest">
            <v-btn block color='primary' class="mb-1" >
              <v-icon left>mdi-lock</v-icon>
              Login
            </v-btn>
            <v-btn block color='success' class="mb-1">
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
    <v-app-bar app color='orange' dark>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blogs Tutorial</v-toolbar-title>
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
      @Wegs 2022
    </v-footer>
  </v-app>

</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    drawer:false,
    guest:true,
    menus:[
      {title: 'Home', icon :'mdi-home', route:'/'},
      {title :' Blogs', icon : 'mdi-note', route: '/blogs'},
      {title :' About', icon : 'mdi-information', route: '/about'}
    ]
  }),
  methods:{
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }, 
};
</script>
