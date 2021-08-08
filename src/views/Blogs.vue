<template>
    <v-container>
        <div class='text-center '>
            <h1>All Blogs</h1>
        </div>
        <div class='mt-12 pl-5 pr-5'>

            <v-flex xs12 class="mt-4">
                <v-row class="d-flex" justify='center'>
                <v-col cols="12" xs='12' md="6" lg='3'
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
            :length="lengthPage"
            :total-visible="7"
            @input="go"
            circle
            ></v-pagination>
        </div>
        <v-divider class="ma-6"></v-divider>

        <div class='text-center mt-3'>
            <h1>All News</h1>
        </div>
        <div class='mt-12 pl-5 pr-5'>

            <v-flex xs12 class="mt-4">
                <v-row class="d-flex" justify='center'>
                <v-col cols="12" xs='12' md="6" lg='3'
                v-for="(blog, index) in articles" :key="index">
                    <BlogCard 
                    :blog='blog'
                    :index='getIndex(blog)'/>
                </v-col>
                </v-row>
            </v-flex>

            <!-- PENOMORAN HALAMAN / PAGINATION -->
            <v-pagination
            class='mt-8'
            v-model="pageNews"
            :length="7"
            :total-visible="7"
            @input="goNews"
            circle
            ></v-pagination>
        </div>

    </v-container>
</template>
<script>
import BlogCard from '../components/BlogCard.vue'
import {mapGetters} from 'vuex'
export default {
    name:'Blogs',
    components:{
        BlogCard
    },
    data() {
        return {
            domain:'https://demo-api-vue.sanbercloud.com',
            blogs:[],
            articles:[],
            page: 0,
            lengthPage: 0,
            perPage:0,
            pageNews:1,
            lastIndex:4,
        }
    },
    computed:{
        ...mapGetters({
            'getArticles' : 'news/getArticles'
        })
    },methods:{
        async go(){
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
    goNews(){
        this.articles = this.getArticles.slice(
        this.lastIndex * (this.pageNews-1),
        (this.pageNews * this.lastIndex))
    },
    getIndex(blog){
        let index = this.getArticles.map(e=>e.title).indexOf(blog.title)
        return index
      },


    },
    created() {
        this.go()
        this.goNews()
    },
}
</script>
<style lang="">
    
</style>