<template>
  <v-container>
    <div>

      <h1 class="mr-3 mt-3 text-center">
        Featured Blogs
      </h1>
      <v-row justify="center">
        <v-btn right x-large to='/blogs' class="blue--text text-right" text>
          All Blogs &amp; News
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </div>

    <v-flex xs12 class="mt-4">
      <v-row class="d-flex" justify='center'>
        <v-carousel delimiter-icon="mdi-circle-outline" cycle height="60vh">
          <v-carousel-item
          :to="'/blog/'+blog.id"
          v-for="(blog, index) in blogs.slice(0,8)" :key="index"
          >
          <v-img
          :src='blog.photo?domain + blog.photo : "https://picsum.photos/590/200"'
          height="300px"
          class="white--text"
          ></v-img>
          <v-card class="pb-2 pt-3">
            <v-card-title>
              {{blog.title}}
            </v-card-title>
          </v-card>
        </v-carousel-item>
          
        </v-carousel>
      </v-row>
    </v-flex>

    <!-- Blogs -->
    <v-flex xs12 class="mt-4">
      <v-row class="d-flex" justify='center'>
        <v-col cols="12" xs='12' md="6" lg='3'
        v-for="(blog, index) in blogs.slice(8)" :key="index">
          <BlogCard 
          :blog='blog'/>
        </v-col>
      </v-row>
    </v-flex>


    <div class='mt-7'>

      <h1 class="mr-3 mt-3 text-center">
        Featured News
      </h1>
      <v-row justify="center">
        <v-btn right x-large to='/blogs' class="blue--text text-right" text>
          All Blogs &amp; News
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </div>

    <v-flex xs12 class="mt-4">
      <v-row class="d-flex" justify='center'>
        <v-carousel delimiter-icon="mdi-circle-outline" cycle height="60vh">
          <v-carousel-item
          v-for="(blog, index) in articleNews.slice(0,6)" :key="index"
          :index='getIndex(blog)' :to="'/news/'+index"

          >
          <v-img
          :src='blog.media? blog.media : "https://picsum.photos/590/200"'
          height="300px"
          class="white--text"
          ></v-img>
          <v-card class="pb-2 pt-3">
            <v-card-title>
              {{blog.title}}
            </v-card-title>
          </v-card>
        </v-carousel-item>
          
        </v-carousel>
      </v-row>
    </v-flex>

    <!-- Articles -->
    <v-flex xs12 class="mt-4">
      <v-row class="d-flex" justify='center'>
        <v-col cols="12" xs='12' md="6" lg='3'
        v-for="(blog, index) in articleNews.slice(6,13)" :key="index">
          <BlogCard 
          :blog='blog'
          :index='getIndex(blog)'/>
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
        domain:'https://demo-api-vue.sanbercloud.com',
        randomQuery:'',
        articleNews:[],
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
      add(){
        this.incrementAction(10)
      },
      ...mapActions({
        'incrementAction' : 'counter/incrementAction',
        'inputArticles': 'news/inputArticles'}),
      
      getIndex(blog){
        let index = this.getArticles.map(e=>e.title).indexOf(blog.title)
        return index
      },
      
      async go(){
        // REQUEST SANBERCODE API
        const api = this.domain + '/api/v2/blog/random/16'
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
