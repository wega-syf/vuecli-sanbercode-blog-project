<template>
    <v-row justify="center">
        <v-col cols='12' xs='12'  lg='9'>
            <v-btn
                    class="ma-2"
                    fab
                    dark
                    x-large
                    color="indigo"
                    to="/blogs"
                    >
                    <v-icon dark>mdi-arrow-left</v-icon>
                    </v-btn>
            <v-card >
                <v-img
                :src='blog.photo ? domain + blog.photo : "https://picsum.photos/590/200"'
                height="200px"
                class="white--text"
                >
                </v-img> 
                    <!-- ada text di dalem gambar -->
                    <v-card-title
                    class="pa-7 text-h6 text-lg-h4 text-capitalize"
                    v-text="blog.title"
                    >
                    </v-card-title>
                    <v-divider></v-divider>
                
                <v-card-text dense>
                    <v-simple-table>
                        <tbody>
                            <tr>
                                <td class='text-center pa-3'> <v-icon>mdi-account</v-icon> Judul</td>
                                <td class='blue--text'> {{blog.title}} </td>
                            </tr>
                            <tr>
                                <td class='text-center pa-3'> <v-icon>mdi-text-box-multiple-outline</v-icon> Deskripsi</td>
                                <td class='blue--text pa-3 ml-4'> {{blog.description}} </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>

                <div class="pa-4">
                    <v-subheader v-if="!token">You have to login first</v-subheader>

                    <v-dialog persistent v-model="dialog" width="80vw">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mr-3 ml-3" v-bind="attrs" v-on="on" text @click="editBlog(blog)"
                            :disabled='!token'>
                                <v-icon>mdi-pencil</v-icon>
                                Edit
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-icon color="grey darken-3">mdi-post</v-icon>
                                <span class="text-h5"> Edit Blogs</span>
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
                    <v-dialog persistent transition="dialog-top-transition" max-width="600" v-model="dialogDelete">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :disabled='!token' class="mr-3" text v-bind="attrs" v-on="on">
                                <v-icon>mdi-delete</v-icon>
                                Delete
                            </v-btn>
                        </template>
                        <v-card>
                            <v-toolbar color="primary" class="text-h5 pb-3 pl-4">Are you sure you want to delete this blog?</v-toolbar>
                            <v-card-text>
                                <div class="text-lg-h6 mt-4 pa-3">Blog that you have deleted cannot be returned</div>
                            </v-card-text>
                            <v-card-actions>
                                <v-row class="ma-3 pa-3">
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue" text @click="removeBlog(blog.id)">Delete</v-btn>
                                    <v-btn color="blue" text @click="dialogDelete = false">Cancel</v-btn>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog persistent v-model="dialogPhoto" width="50vw">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :disabled='!token' text v-bind="attrs" v-on="on">
                                <v-icon>mdi-upload</v-icon>
                                Upload Photo
                            </v-btn>
                        </template>
                        <template>
                           
                            <v-card >
                                <div class="pa-9">

                                    <v-card-title>
                                        <v-icon color="grey darken-3">mdi-upload</v-icon>
                                        <span class="text-h5"> Upload Blog Photo</span>
                                    </v-card-title>
                                    <v-file-input
                                        v-model="file"
                                        show-size
                                        counter
                                        label="File input"
                                        truncate-length="125"
                                        accept="image/*"
                                    ></v-file-input>
                                    <v-card-actions>
                                        <v-row class='ma-3'>
                                            <v-btn color="blue" text @click="submitPhoto">Upload</v-btn>
                                            <v-btn color="blue" text @click="dialogPhoto = false">Cancel</v-btn>
                                        </v-row>
                                    </v-card-actions>
                                </div>
                                
                            </v-card>
                                
                        </template>
                    </v-dialog>
                </div>
            </v-card>
        </v-col>

    </v-row>
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
            dialogDelete: false,
            idEditBlog: null,
            // idUploadBlog: null,
            file: null
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
            // this.idUploadBlog = null
        },
        updateBlog: function(id){
            if(this.error.length === 0){
                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('description', this.description)

                let config = {
                    method : "post",
                    url : `${this.domain}/api/v2/blog/${id}`,
                    params : {_method : 'PUT'},
                    headers :{'Authorization' : 'Bearer ' + this.token},
                    data : formData
                }

                this.axios(config)
                    .then( () =>{
                        // let {id} = this.$route.params
                        // this.$router.push(`/blog/:${id}`)
                        this.$forceUpdate()
                        this.clearForm()
                        this.setAction({
                            status: true,
                            color: 'deep-purple darken-2',
                            text : 'Blog has been successfully edited'
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
        removeBlog: function(id){
            const config ={ 
                method : "post",
                url : `${this.domain}/api/v2/blog/${id}`,
                headers :{'Authorization' : 'Bearer ' + this.token},
                params : {_method : "DELETE"}
            }
            this.axios(config)
                .then( () =>{
                    this.$router.push('/blogs')
                    this.setAction({
                        status: true,
                        color: 'deep-purple darken-2',
                        text : 'Blog has been successfully deleted'
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
        submitPhoto: function(){
            
            let formData = new FormData()
            let {id} = this.$route.params
            formData.append('photo', this.file)

            let config = {
                method : "post",
                url : `${this.domain}/api/v2/blog/${id}/upload-photo`,
                headers :{'Authorization' : 'Bearer ' + this.token},
                data : formData
            }

            this.axios(config)
                .then( () =>{
                    // this.go()
                    // this.$router.push(`/blog/${id}`)
                    this.setAction({
                        status: true,
                        color: 'deep-purple darken-2',
                        text : 'Photo uploaded successfully'
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