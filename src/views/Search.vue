<template lang="">
    <v-container class='ma-0 pa-0' grid-list-sm>
        <v-subheader>All Blogs</v-subheader>
        <v-layout row wrap>
            <BlogCard
            v-for="(blog, index) in blogs" 
            :key="index"
            :blog='blog' 
            />
        </v-layout>
    </v-container>
</template>


<script>
import BlogCard from '../components/BlogCard.vue'
export default{
components:{
BlogCard
},
data(){
    return{
        showSearch:null,
        domain:'https://demo-api-vue.sanbercloud.com',
        blogs:[],
    }

},
methods:{
    getdata(){
        this.blogs.push(localStorage.getItem("filtered"))
        },
    
},
created() {
setTimeout(this.getdata(),3000)
}


}

</script>