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
          this.blogs = blogs
        })

        .catch(error => console.log(error))

        },
      async fetchRandom(){
        // REQUEST RANDOM WORDS API
        const options = {
          method:'GET',
          url:'http://random-word-api.herokuapp.com/word?number=10'

        }
        this.axios.request(options)
        .then(response=>{
          this.randomQuery = response.data[0].slice(0,3)

          // WAIT FOR A RANDOM WORD BEFORE FETCHING NEWS
          this.fetchNews()
          
        })
        .catch(error => console.log(error))
      },
      async fetchNews(){

        // REQUEST FREE NEWS API 
        const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {q: this.randomQuery, lang: 'en'},
        headers: {
          'x-rapidapi-key': '56ac13e70bmsh887dc6b584d5c44p113f1ajsnc13135524d37',
          'x-rapidapi-host': 'free-news.p.rapidapi.com'
            }
          };

          this.axios(options)
          .then((response) => {
            let {articles} = response.data
            console.log(articles);
            this.articleNews = articles
            
            // save it to vuex news store
            this.inputArticles(articles)
          }).catch((error) => {
            console.log(error);
          });

        },

    },
    computed:{
      ...mapGetters({
        'getCount': 'counter/getCount',
        'getArticles' : 'news/getArticles'
        })
    },
    async created(){
      await this.go()
      await this.fetchRandom()
      // await this.fetchNews()

      // Fetch if article is not saved on the vuex
      // if (this.getArticles.length){
      //   this.articleNews = this.getArticles
      // } else{
      //   this.fetchNews()
      // }
    }
  }
</script>
