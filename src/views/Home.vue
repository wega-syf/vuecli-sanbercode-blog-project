<template>
  <v-container>
    <div>

      <h1 class="mr-3 mt-3 text-center">
        Featured Blogs
      </h1>
      <v-row justify="center">
        <v-btn right x-large to='/blogs' class="blue--text text-right" text>
          All Blogs 
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </div>

    <v-flex xs12 class="mt-4">
      <v-row class="d-flex" justify='center'>
        <v-col cols="12" xs='12' md="6"
        v-for="(blog, index) in blogs" :key="index">
          <BlogCard 
          :blog='blog'/>
        </v-col>
      </v-row>
    </v-flex>
   
    
  </v-container>
</template>

<script>
  import BlogCard from '../components/BlogCard.vue'
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'Home',
    components:{
      BlogCard,
      
    },
    data() {
      return {
        blogs:[],
        length:4,
        onboarding:0,
        domain:'https://demo-api-vue.sanbercloud.com'
      }
    },
    methods: {
       next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      go(){
        // console.log(this.$store.modules);  //ngetest state store
        const api = this.domain + '/api/v2/blog/random/4'
        this.axios.get(api)
        .then((response) => {
          let {blogs} = response.data
          console.log(blogs)
          this.blogs = blogs})

        .catch(error => console.log(error))
        },
      ...mapActions({
        'incrementAction' : 'counter/incrementAction'
      }),
      add(){
        this.incrementAction(10)
      },
    },
    computed:{
      ...mapGetters({
        'getCount': 'counter/getCount'
        })
    },
    created(){
      this.go()
    }
  }
</script>
