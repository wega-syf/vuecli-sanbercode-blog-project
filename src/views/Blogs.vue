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

        <!-- PENOMORAN HALAMAN / PAGINATION -->
        <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
        @input="go"
        circle
        ></v-pagination>

    </v-container>
</template>
<script>
import BlogCard from '../components/BlogCard.vue'

export default {
    name:'Blogs',
    components:{
        BlogCard
    },
    data() {
        return {
            domain:'https://demo-api-vue.sanbercloud.com',
            blogs:[],
            page: 0,
            lengthPage: 0,
            perPage:0,
        }
    },methods:{
        go(){
            const config = {
                method:'get',
                url: this.domain+ '/api/v2/blog?page=' + this.page
            }
            this.axios(config)
            .then(response =>{
                let {blogs} = response.data
                this.blogs = blogs.data
                this.page = blogs.current_page
                this.lengthPage = blogs.last_page
                this.perPage = blogs.per_page
            })
            .catch(error => console.log(error))
        },


    },
    created() {
        this.go()
    },
}
</script>
<style lang="">
    
</style>