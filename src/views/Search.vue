<template>
    <v-container>
        <div class="pa-3">
            <v-subheader>Search Results</v-subheader>
            <div v-if="!blogs.length" class="ml-4">
                We cannot find any blogs that matches the title "{{queryComp}}" 
            </div>
            <div v-else class="ml-4 text-md-h4">
                We found {{filteredList.length}} blogs with the title "{{queryComp}}" 
            </div>

        </div>
        <v-flex xs12 class="mt-4">
            <v-row class="d-flex" justify='center'>
            <v-col cols="12" xs='12' md="6" lg='3'
            v-for="(blog, index) in filteredList" :key="index">
                <BlogCard 
                :blog='blog'/>
            </v-col>
            </v-row>
        </v-flex>
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
        total:0
    }

},
computed: {
    queryComp(){
        let searchQuery = this.$route.params.query
        console.log(searchQuery + 'KONTOL');
        return searchQuery
    },
    // View ones that match the search query
    filteredList() {
      return this.blogs.filter(blog => {
        return blog.title.toLowerCase().includes(this.queryComp.toLowerCase())
      })
    }
  },
methods:{
    // Take the total amount blogs
    async go(){
        const config={
            method:'get',
            url: this.domain+ '/api/v2/blog'
        }
        this.axios(config)
        .then(response =>{
            console.log(response.data);
            let {total} = response.data.blogs
            this.total = total
            console.log(this.total);

            this.getAll()
            
        }).catch(error => console.log(error))
    },
    // Get all the blogs
    async getAll(){
        const config={
            method:'get',
            url: this.domain+ `/api/v2/blog/random/${this.total}`
        }
        this.axios(config)
        .then(response =>{
            console.log(response.data);
            let {blogs} = response.data
            this.blogs = blogs
            console.log(this.blogs);
            
        }).catch(error => console.log(error))
    }

    // getdata(){
    //     this.blogs.push(localStorage.getItem("filtered"))
    //     },
    
},
async created() {
    await this.go()
    
}


}

</script>