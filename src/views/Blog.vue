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
          
          <v-dialog persistent v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-3 ml-3" v-bind="attrs" v-on="on" text @click="editBlog(blog)">
                    <v-icon>mdi-pencil</v-icon>
                    Edit
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <v-icon>mdi-post</v-icon>
                    <span> Edit Blogs</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field required v-model="title" label="Judul Blog"></v-text-field>
                    <v-textarea required v-model="description" label="Blog Description"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-row class='ma-3 pa-3'>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" text @click="updateBlog(idEditBlog)">Edit Blog</v-btn>
                        <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
          </v-dialog>

        <v-btn class="mr-3" text>
            <v-icon>mdi-delete</v-icon>
            Delete
        </v-btn>
        <v-dialog persistent v-model="dialogPhoto">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                    <v-icon>mdi-upload</v-icon>
                    Upload Photo
                </v-btn>
            </template>
            <template>
                <v-card>
                    <v-card-title>
                        <!-- <v-icon>mdi-post</v-icon> -->
                        <span> Upload Blog Photo</span>
                    </v-card-title>
                    <v-file-input
                        v-model="fileInput"
                        show-size
                        counter
                        label="File input"
                        truncate-length="125"
                        accept="image/*"
                    ></v-file-input>
                    <v-card-actions>
                        <v-row class='ma-3 pa-3'>
                            <v-spacer></v-spacer>
                            <v-btn color="blue" text @click="submitPhoto(idUploadBlog)">Upload</v-btn>
                            <v-btn color="blue" text @click="dialogPhoto = false">Cancel</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'Blog',
    data() {
        return {
            title: '',
            description: '',
            blog:{},
            error: [],
            domain:'https://demo-api-vue.sanbercloud.com',
            dialog: false,
            dialogPhoto: false,
            idEditBlog: null,
            idUploadBlog: null,
            fileInput: null
        }
    },
    computed: {
        ...mapGetters({
            token : 'auth/getToken'
        })
    },
    methods: {
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
        },
        editBlog: function(blog){
            this.title = blog.title
            this.description = blog.description
            this.idEditBlog = blog.id
        },
        clearForm: function(){
            this.title = ''
            this.description = ''
            this.idEditBlog = null
            this.idUploadBlog = null
        },
        updateBlog: function(id){
            if(this.error.length === 0){
                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('description', this.description)

                let config = {
                    method : "post",
                    url : `http://demo-api-vue.sanbercloud.com/api/v2/blog/${id}`,
                    params : {_method : 'PUT'},
                    headers :{'Authorization' : 'Bearer ' + this.token},
                    data : formData
                }

                this.axios(config)
                    .then( () =>{
                        this.clearForm()
                        this.setAction({
                            status: true,
                            color: 'deep-purple darken-2',
                            text : 'Blog berhasil di edit'
                        })
                        this.$forceUpdate()
                    })
                    .catch( (error) => {
                        console.log(error)
                        this.setAction({
                            status : true,
                            color: 'deep-purple darken-2',
                            text : error.data
                        })
                    })
            }
        },

        submitPhoto: function(){
            let formData = new FormData()
            let {id} = this.$route.params
            formData.append('photo', this.fileInput)

            let config = {
                method : "post",
                url : `http://demo-api-vue.sanbercloud.com/api/v2/blog/${id}/upload-photo`,
                headers :{'Authorization' : 'Bearer ' + this.token},
                data : formData
            }

            this.axios(config)
                .then( () =>{
                    this.$forceUpdate()
                    this.setAction({
                        status: true,
                        color: 'deep-purple darken-2',
                        text : 'Photo berhasil di upload'
                    })
                })
                .catch( (error) => {
                    console.log(error)
                    this.setAction({
                        status : true,
                        color: 'deep-purple darken-2',
                        text : error.data
                    })
                })
        },
        ...mapActions({
            'setAction' : 'alert/setAction',
        })
    },
    created() {
        this.go()
    },
}
</script>
<style>

</style>