<template>
    <div class="pt-1">
        <v-switch v-model="darkmodeComp" color="blue"> 
            <v-icon slot="prepend" color='white'> {{iconName}} </v-icon>
            <h3 class="font-weight-light" slot="label">Dark Mode</h3>
            
        </v-switch>
    </div>
</template>
<script>
export default {
name:'ToggleDarkMode',
  data () {
    return {
      darkmode: false,
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

        //   Change icon
        if (this.darkmode === false) this.iconName ='mdi-white-balance-sunny'
        if (this.darkmode === true) this.iconName = 'mdi-moon-waxing-crescent'
      }
    },
  },
  created () {
    if (process.browser) {
      if (localStorage.getItem('DarkMode')) {
        const cookieValue = JSON.parse(localStorage.getItem('DarkMode'))
        this.darkmode = cookieValue
        this.$vuetify.theme.dark = cookieValue
      } 
    }
  },

}
</script>
<style lang="">
    
</style>