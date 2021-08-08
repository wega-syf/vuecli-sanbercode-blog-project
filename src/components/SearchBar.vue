<template>
    <div class="justify-center">
        <v-text-field
        v-if="showed"
        name="search"
        label="Search"
        placeholder="Press Enter to search"
        solo
        rounded
        v-model="search"
        prepend-icon="mdi-magnify"
        v-on:keyup.enter="callComponent"></v-text-field>

    </div>
</template>
<script>
export default{
    props: ['showed'],
name: 'SearchBar',
data(){
    return{
        search:'',
        blogs:[],
        path:`/search`,
        domain: 'https://demo-api-vue.sanbercloud.com',
        page: 0
    }
},

methods: {
    callComponent(){
       if (this.$route.path !== this.path) this.$router.push(`/search/${this.search}`)
    }
    //     go(){
    //     const config={
    //         method:'get',
    //         url: this.domain+ '/api/v2/blog?page=' + this.page
    //     }
    //     this.axios(config)
    //     .then(response =>{
    //         console.log(response.data);
    //         let{blogs}=response.data
    //         this.blogs.push(blogs.data)
            
    //     }).catch(error => console.log(error))
    // },
    //     filteredList() {    
    //         let filtered=this.filterblog()
    //     localStorage.setItem("filtered", JSON.stringify(filtered))
    //     if (this.$route.path !== this.path){ this.$router.push({path:`/search/${}`})
    //     }
        
    //    },
    //    pageIncrement(){
    //        this.page++
    //    },
    //    filterblog(){
    //     this.blogs.filter(
    //     blogs => {
    //     return blogs.title.includes(this.search)
    //                                 }
    //                         )
    //    },
    //    call20blog(){
    //        for(let j=0; j<19; j++){
    //        this.go()
    //        this.pageIncrement()
    //        }
    //    }

    },
    created (){
        // this.call20blog()
    }
}
</script>