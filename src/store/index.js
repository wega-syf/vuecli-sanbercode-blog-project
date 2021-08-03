import Vue from 'vue'
import Vuex from 'vuex'
import alert from './modules/alert'
import auth from './modules/auth'
import counter from './modules/counter'
import dialog from './modules/dialog'

// Perlu VUEX PERSIST supaya data login tersimpan meskipun halamannya di refresh. Penyimpanan data dilakukan dengan localStorage
// Install dulu vuexpersist dengan npm install --save vuex-persist

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist ({
    key:'sanbercode',  // terserah, gak harus 'sanbercode'
    storage:localStorage
})




Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin] ,  //kita masukkan vuexpersist sebagai plugin
    modules:{
        alert,
        auth,
        counter,
        dialog,
    },
    
})