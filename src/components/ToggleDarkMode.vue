<template>
    <div class="pt-1">
        <v-switch v-model="darkmodeComp" color="blue"> 
            <v-icon slot="prepend" color='white'> {{iconName}} </v-icon>
            <h3 class="font-weight-light" slot="label"> {{label}} </h3>
            
        </v-switch>
    </div>
</template>
<script>
import {mapActions} from 'vuex'


export default {
name:'ToggleDarkMode',
  data () {
    return {
      darkmode: false,
      label:'Light',
      iconName:'mdi-white-balance-sunny'
    }
  },
  computed: {
    darkmodeComp : {
      get(){
          
          return this.darkmode
      },
      set(){
          this.darkmode = !this.darkmode
          this.$vuetify.theme.dark = this.darkmode
          localStorage.setItem('DarkMode', this.darkmode)

          this.changeIcon()

          
      }
    },
  },
  methods:{
    ...mapActions({
      'setSrc' : 'dialog/setSrcAction'
    }),
    changeIcon(){
      //   Change icon and label
      if (this.darkmode === false) {
          this.iconName ='mdi-white-balance-sunny'
          this.label = 'Light'
          // CHANGE BACKGROUND SRC for login and register component
          this.setSrc('gradientLight.png')}
      else {
          this.iconName = 'mdi-moon-waxing-crescent'
          this.label = 'Dark'
          this.setSrc('gradientDark.png')}

    }
  },
  created () {
    if (process.browser) {
      if (localStorage.getItem('DarkMode')) {
        // Take data from local storage
        const cookieValue = JSON.parse(localStorage.getItem('DarkMode'))
        this.darkmode = cookieValue
        this.$vuetify.theme.dark = cookieValue

        this.changeIcon()
      } 
    }
  },

}
</script>
<style lang="">
    
</style>