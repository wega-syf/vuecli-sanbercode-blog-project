<template lang="">
    <!-- Pake keep alive supaya ter cache -->
    <keep-alive>
        <v-dialog
            v-model="dialogProp"
            fullscreen 
            persistent hide-overlay
            transition="dialog-bottom-transition"
        >
            <!-- Use dynamic component -->
            <component :is="dialogComponent" @closed='setDialogStatus'></component>
            <!-- <Login @closed='setDialogStatus'/> -->
        </v-dialog>
    </keep-alive>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
// import Login from './Login.vue'

export default {
    components:{
        Login : () => import('./Login.vue')
    },
    computed:{
        ...mapGetters({
            dialogStatus : 'dialog/getStatus',
            dialogComponent : 'dialog/getComponent'
        }),
        dialogProp:{
            get(){
                return this.dialogStatus
            },
            set(value){
                this.setDialogStatus(value)
            }
        }
    },
    methods: {
        ...mapActions({
            'setDialogStatus' : 'dialog/setStatusAction'
        })
    },
}
</script>
<style lang="">
    
</style>