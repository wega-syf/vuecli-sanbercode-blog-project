import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        count:0
    },
    getters:{
        getCount : (state) =>{
            return state.count
        }
    },
    // Mutations must be synchronous
    mutations:{
        incrementCount : (state, payload) => {
            state.count += payload
        }
    },
    // Actions can handle asynchronous calls
    actions:{
        incrementAction : ({commit}, payload) =>{
            commit('incrementCount',payload)
        }
    }
})