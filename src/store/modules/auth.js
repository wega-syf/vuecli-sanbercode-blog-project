import axios from "axios"

export default{
    namespaced: true,
    state:{
        token: '',
        user : {}
    },
    getters:{
        getUser : state => state.user,
        getToken : state => state.token,
        getGuest: state => Object.keys(state.user).length === 0
    },
    mutations:{
        setToken: (state,payload) => {
            state.token = payload
        },
        setUser: (state,payload) => {
            state.user = payload
        }
    },
    actions: {
        setUser: ({commit}, payload) => {
            commit('setUser',payload)
        },
        setToken : ({commit,dispatch}, payload) =>{
            commit('setToken', payload)
            dispatch('checkToken', payload)  //memanggil action untuk mengecek apakah token benar (??) trus baru kita ambil user yang megang bearer token tsb
        },
        // checkToken harus di action karena dia asynchronous
        checkToken: ({commit}, payload) => {
            const config = {
                method:'post',
                url:'https://demo-api-vue.sanbercloud.com/api/v2/auth/me',
                headers :{
                    'Authorization' : 'Bearer ' + payload
                    // bearer nya kudu di spasiin bruh
                }
            }

            axios(config)
            .then(response => {
                commit('setUser',response.data)
            })
            .catch(error => { 
                console.log(error)
                commit('setUser', {}) 
                commit('setToken', '') 
            })
        }
    }
}