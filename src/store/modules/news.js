export default{
    namespaced : true,
    state:{
        articles:[]
    },
    getters:{
        getArticles: state => state.articles
    },
    mutations:{
        setArticles: (state,payload )=> {
            state.articles = payload}
    },
    actions:{
        inputArticles: ({commit}, payload) =>{
            commit('setArticles', payload)
        }
    },
}