<template lang="">
     <v-snackbar
      v-model="alertProp"
      :color ="color"
      timeout="3000"
      multi-line
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="closeStatus"
        >
          POGGERS
        </v-btn>
      </template>
      </v-snackbar>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            color : 'alert/getColor',
            status : 'alert/getStatus',
            text : 'alert/getText'

        }),
        alertProp:{
            get(){
                return this.status
            },
            set(){
                this.closeStatus()
            }
        }
    },
    methods: {
        ...mapActions({
            'setAction': 'alert/setAction'
        }),
        closeStatus(){
            this.setAction({
                status: false,
                color: this.color,
                text : this.text
            })
        }

    },
}
</script>
<style lang="">
    
</style>