<template>
  <v-container grid-list-xs class="ma-1 pa-0">
    
    <h1 class="mr-3 mt-3 text-center">
      Recommended Blogs For You
    </h1>
    <br>
    <v-divider></v-divider>
    <br>
    <div class="text-right">
      <v-btn x-large to='/blogs' class="blue--text" text>
        All Blogs 
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-layout wrap >
      <BlogCard
      v-for="(blog, index) in blogs" 
      :key="index"
      :blog='blog' 
      />
    </v-layout>
    <br>
    <h3>This is just a counter</h3>
    <p>It was just for practice purpose</p>
    <v-btn color="success" @click="add">Add by 10</v-btn>
    <h3> Counter : {{getCount}} </h3>
  </v-container>
</template>

<script>
  import BlogCard from '../components/BlogCard.vue'

  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'Home',
    components:{
      BlogCard
    },
    data() {
      return {
        blogs:[],
        domain:'https://demo-api-vue.sanbercloud.com'
      }
    },
    methods: {
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
