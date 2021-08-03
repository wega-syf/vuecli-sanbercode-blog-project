export default{
    namespaced: true,
    state:{
        status:false,
        color: 'success',
        text: 'Ini Adalah text Alert'
    },
    getters:{
        getStatus: state => state.status,
        getColor : state => state.color,
        getText : state => state.text
    },
    mutations:{
        set: (state,payload) =>{
            state.status = payload.status
            state.color = payload.color
            state.text = payload.text
        }
    },
    actions:{
        setAction : ({commit}, payload )=>{
            commit('set', payload)
        }
    },
}