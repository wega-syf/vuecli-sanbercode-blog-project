<template lang="">

    <v-flex  xs6>
        <v-card :to='"/blog/"+blog.id'>
          <!-- Bakal routing ke halaman per blog -->
          <v-img
          :src='blog.photo?domain + blog.photo : "https://picsum.photos/590/200"'
          height="200px"
          class="white--text"
          >
            <!-- ada text di dalem gambar -->
            <v-card-title
            class="fill-height align-end"
            v-text="blog.title"
            >
            </v-card-title>
          </v-img>

          <v-card-actions>
            <v-progress-linear
            color="blue-grey"
            height="7"
            ></v-progress-linear>
          </v-card-actions>
          
          <v-card-actions>
            <span>{{ blog.title.substring(0,15)}} ... </span>
          </v-card-actions>
        </v-card>
        
      </v-flex>
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