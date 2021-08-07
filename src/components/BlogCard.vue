<template lang="">
  <v-card class='mx-auto' max-width="400" :to='"/blog/"+blog.id'>
    <v-img
      :src='blog.photo?domain + blog.photo : "https://picsum.photos/590/200"'
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
            text-md-subtitle-1
            text-lg-h6'>
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
        {{blog.description.substring(0,70)}}...
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>Read more</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    props:['blog'],
    data() {
        return {
            domain:'https://demo-api-vue.sanbercloud.com'
        }
    },
}
</script>
<style lang="">
    
</style>