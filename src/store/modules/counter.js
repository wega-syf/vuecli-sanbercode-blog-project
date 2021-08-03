const state = {
    count:0
}
const getters = {
    getCount : (state) =>{
        return state.count
    }
}
// Mutations must be synchronous
const mutations = {
    incrementCount : (state, payload) => {
        state.count += payload
    }
}
// Actions can handle asynchronous calls
const actions = {
    incrementAction : ({commit}, payload) =>{
        commit('incrementCount',payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}