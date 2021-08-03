export default{
    namespaced: true,
    state :{
        status : false,  // muncul atau tidaknya
        component : 'login',  // bisa digunakan bbrp komponen(login, register)
        params : {}  // data apa saja yang digunakan dialog
    },
    getters:{
        getStatus : state => state.status,
        getComponent : state => state.component,
        getParams : state => state.params, 
    },
    mutations:{
        setStatus: (state, status) =>{
            state.status = status
        },
        setComponent : (state, {component, params}) => {
            state.component = component
            state.params = params
        }
    },
    actions : {
        setStatusAction : ({commit}, status) => {
            commit('setStatus', status)
        },
        setComponentAction : ({commit}, {component, params}) =>{
            commit('setComponent', {component, params})
            // view the dialog
            commit('setStatus', true)
        }
    }
}