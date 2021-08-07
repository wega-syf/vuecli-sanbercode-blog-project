<template lang="">
<<<<<<< HEAD
  <v-card class='mx-auto' max-width="400" :to='"/blog/"+blog.id'>
    <v-img
      :src='blog.photo?domain + blog.photo : "https://picsum.photos/590/200"'
=======
  <v-card class='mx-auto' max-width="400" :to='routeMethod(blog)'>
    <v-img
      :src='photoMethod(blog)'
>>>>>>> master
      height="300px"
      class="white--text"
      >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="primary lighten-3"
          ></v-progress-circular>
        </v-row>
      </template>
      <v-row class='fill-height' align='center' >
        <v-col cols='10'>
          <v-img 
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)">
            <div class='white--text 
            ml-6 pa-3
            text-center  
            text-caption
<<<<<<< HEAD
            text-md-subtitle-1
            text-lg-h6'>
=======
            text-md-subtitle-2'>
>>>>>>> master
              {{blog.title}}
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-img>

    <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="primary lighten-3"
            ></v-progress-circular>
          </v-row>
        </template>

    <v-card-text class='mt-6'>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>
      <div>
<<<<<<< HEAD
        {{blog.description.substring(0,70)}}...
=======
        {{ dataMethod(blog)}}...
>>>>>>> master
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>Read more</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    props:['blog','index'],
    data() {
        return {
            domain:'https://demo-api-vue.sanbercloud.com'
        }
    },
    methods:{
      dataMethod(blog){
        if (blog.description) {
          return blog.description.slice(0,30)
        }
        else if (blog.summary) {
          return blog.summary.slice(0,30)
        }
        else return '/error'
      },
      routeMethod(blog){
        if (blog.description) {
          return "/blog/"+ blog.id
        }
        else if (blog.summary) {
          return "/news/" + this.index
        }
        else return '/error'
      },
      photoMethod(blog){
        if (blog.description) {
          return blog.photo? this.domain + blog.photo : "https://picsum.photos/400/200"
        }
        else if (blog.summary) {
          return blog.media? blog.media : "https://picsum.photos/400/200"
        }
        else return '/error'
      }
    }
}
</script>
<style lang="">
    
</style>