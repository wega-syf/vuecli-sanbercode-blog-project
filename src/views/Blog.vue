<template>
    <v-card >
         <v-img
          :src='blog.photo?domain + blog.photo : "https://picsum.photos/590/200"'
          height="200px"
          class="white--text"
          >
            <!-- ada text di dalem gambar -->
            <v-card-title
            class="fill-height align-end text-h2 text-capitalize "
            v-text="blog.title"
            >
            </v-card-title>
          </v-img> 
          
          <v-card-text dense>
              <v-simple-table>
                  <tbody>
                      <tr>
                          <td class='text-center'> <v-icon>mdi-account</v-icon> Judul</td>
                          <td class='blue--text'> {{blog.title}} </td>
                      </tr>
                      <tr>
                          <td class='text-center pa-3'> <v-icon>mdi-text-box-multiple-outline</v-icon> Deskripsi</td>
                          <td class='blue--text pa-3 ml-4'> {{blog.description}} </td>
                      </tr>
                  </tbody>
              </v-simple-table>
          </v-card-text>
          <!-- Belum pake script -->
          <div class="btn_edit">
              <template>
            <v-btn fab small>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
              </template>
            <v-btn fab small>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn fab small>
                <v-icon>mdi-upload</v-icon>
            </v-btn>
          </div>
    </v-card>
</template>
<script>
export default {
    name:'Blog',
    data() {
        return {
            blog:{},
            domain:'https://demo-api-vue.sanbercloud.com'
        }
    },methods: {
        go(){
            let{id} = this.$route.params
            const config={
                method:'get',
                url: `${this.domain}/api/v2/blog/${id}`
            }
            this.axios(config)
            .then(response =>{
                console.log(response.data);
                this.blog = response.data.blog;
                
            }).catch(error => console.log(error))
        }
    },created() {
        this.go()
    },
}
</script>
<style>
    .btn_edit{
        padding-left: 15px;
    }
</style>