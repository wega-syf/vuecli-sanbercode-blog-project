<template>
    <div>
        <v-text-field
            v-model="title"
            name="title"
            label="Judul Blogs"
            hide-details="auto"
        ></v-text-field>
        <v-textarea label="Blog Description" name="description" v-model="description"></v-textarea>
        <div>
            <v-btn color="success" fab small @click="submit">
                <v-icon>mdi-book-plus</v-icon>
            </v-btn>
            <v-btn color="blue-grey darken-1" fab small @click='closeAddBlog'>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
    </div>
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
                this.$emit('closed',false)
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
                                text : 'Selamat, anda berhasil menambahkan blog baru'
                            })
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