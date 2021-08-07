<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col>
                <v-card class='d-flex justify-center elevation-6 rounded-xl'>
                    <v-container fluid>
                        <v-row justify="center">
                            <v-col cols="12" xs='12' md="10">
                                <v-form>
                                    <!-- Header -->
                                    <div class="pa-3 text-left">
                                        <h2 class="mb">Add Blog</h2>
                                    </div>
                                    <div class="mt-5 mb-5">
                                        <v-text-field
                                            v-model="title"
                                            name="title"
                                            label="Title Blogs"
                                            required
                                            solo
                                            rounded
                                            placeholder="Enter your title blog here"

                                            prepend-icon="mdi-post"
                                        ></v-text-field>
                                        <v-textarea 
                                            label="Blog Description" 
                                            name="description" 
                                            v-model="description"
                                            required
                                            solo
                                            rounded
                                            placeholder="Enter your description blog here"
                                            prepend-icon="mdi-book-open-variant"
                                        ></v-textarea>
                                    </div>
                                    <!-- Button -->
                                    <div class="text-xl-center mt-3">
                                        <v-row justify="center">
                                            <v-btn color="success" text @click="submit">
                                                <v-icon>mdi-book-plus</v-icon>
                                                Add
                                            </v-btn>
                                        </v-row>
                                        <div class="text-xl-center mt-3 mb-5">
                                            <v-row justify="center">
                                                <v-btn color="blue-grey darken-1" text @click='closeAddBlog'>
                                                    <v-icon>mdi-close</v-icon>
                                                    Cancel
                                                </v-btn>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return{
                title: '',
                description: '',
                error: [],
                domain: 'https://demo-api-vue.sanbercloud.com',
            }
        },
        computed: {
            ...mapGetters({
                token : 'auth/getToken'
            })
        },
        methods: {
            clearForm(){
                this.title = ''
                this.description = ''
            },

            closeAddBlog(){
                this.$router.push('/blogs')
            },

            submit(){
                if(this.error.length === 0){
                    let formData = new FormData()
                    formData.append('title', this.title)
                    formData.append('description', this.description)

                    const config = {
                        method: 'post',
                        url: this.domain + '/api/v2/blog',
                        headers :{'Authorization' : 'Bearer ' + this.token},
                        data: formData
                    }
                    this.axios(config)
                        .then(() => {
                            this.clearForm()
                            this.setAction({
                                status: true,
                                color: 'deep-purple darken-2',
                                text : 'Congratulations, you have successfully added a new blog'
                            })
                            this.closeAddBlog()
                        }).catch((error) => {
                            console.log(error)
                            this.setAction({
                                status : true,
                                color: 'deep-purple darken-2',
                                text : error.data
                            })
                        });
                }
            },
            ...mapActions({
                'setAction' : 'alert/setAction',
            })
        }
    }
</script>