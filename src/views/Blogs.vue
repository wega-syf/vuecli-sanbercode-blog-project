<template lang="">
    <v-container>
        <div class='text-center '>
            <h1>All Blogs</h1>
        </div>
        <div class='mt-12 pl-5 pr-5'>

            <v-flex xs12 class="mt-4">
                <v-row class="d-flex" justify='center'>
                <v-col cols="12" xs='12' md="6"
                v-for="(blog, index) in blogs" :key="index">
                    <BlogCard 
                    :blog='blog'/>
                </v-col>
                </v-row>
            </v-flex>

            <!-- PENOMORAN HALAMAN / PAGINATION -->
            <v-pagination
            class='mt-8'
            v-model="page"
            :length="15"
            :total-visible="7"
            @input="go"
            circle
            ></v-pagination>
        </div>

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