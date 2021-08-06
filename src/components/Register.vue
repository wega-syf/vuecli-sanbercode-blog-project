<template lang="">
    <v-card class='d-flex justify-center' width="100vw">
        <v-img :src= "require('../assets/' + getSrc)" height="100vh">
            <v-container class='fill-height' fluid>
                <v-row align='center' justify='center' >
                    <v-col cols='12' lg='5' md='8' sm='8'>
                        <v-card class='d-flex justify-center elevation-6 rounded-xl' color="background lighten">
                            <v-container fluid >
                                <v-row align='center' justify='center' >
                                    <v-col cols='12' lg='10'>
                                        <v-form ref=form class='pa-3 pb-5 mt-2'>
                                            <!-- Header -->
                                            <div class='pa-3 text-left'>
                                                <h1 class='mb'>Sign Up</h1>
                                                <v-divider></v-divider>
                                                <p class='mt-5 '>
                                                Fill out the form below to create your account!</p>
                                            </div>
                                            <div class='mt-5 mb-8'>
                                                <!-- Email Field -->
                                                <v-text-field
                                                    name="email"
                                                    v-model="email"
                                                    label="E-mail"
                                                    required
                                                    solo
                                                    rounded
                                                    prepend-icon = 'mdi-email'
                                                ></v-text-field>

                                                <!-- Name Field -->
                                                <v-text-field
                                                    name="name"
                                                    v-model="name"
                                                    label="Name"
                                                    required
                                                    solo
                                                    rounded
                                                    prepend-icon = 'mdi-account'
                                                ></v-text-field>

                                                <!-- Password Field -->
                                                <v-text-field
                                                    name="password"
                                                    v-model="password"
                                                    label="Password"
                                                    required
                                                    solo
                                                    rounded
                                                    :prepend-icon = 'showPassword ? "mdi-eye" : "mdi-eye-off"'
                                                    :type='showPassword ? "text" : "password"'
                                                    @click:prepend='showPassword = !showPassword'
                                                ></v-text-field>
                                                <!-- Avatar Input Field -->
                                                
                                                    <v-file-input 
                                                    v-model="file"
                                                    name="uploadfile"
                                                    label="Select image for avatar..."
                                                    truncate-length="125"
                                                    accept="image/*"
                                                    required
                                                    rounded
                                                    solo/>
                                            
                                            </div>
                                            <!-- Submit Button -->
                                            <div class='text-xl-center mt-5'>
                                                <v-row justify='center'>
                                                    <v-btn color="primary"
                                                    @click='submit' dark medium >
                                                    <v-icon left small>mdi-lock</v-icon>Sign me up
                                                    </v-btn>
                                                </v-row>

                                            </div>
                                            
                                            <!-- Close Button -->
                                            <div class='text-xl-center mt-5 mb-3'>
                                                <v-row justify='center'>
                                                    <v-btn color="red darken-2" dark medium 
                                                    @click='close'>
                                                        <v-icon left small>mdi-close</v-icon>
                                                    Close
                                                    </v-btn>
                                                </v-row>
                                            </div>
                                        </v-form>
                                    </v-col>
                                 </v-row>       
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </v-card>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data(){
       return {showPassword: false,
        email: '',
        password: '',
        name: '',
        file: null,
        domain: 'https://demo-api-vue.sanbercloud.com'}
    },
    computed:{
      ...mapGetters({
        'getSrc' : 'dialog/getSrc'
      })
    },
    methods:{
        ...mapActions({
            'setAlert': 'alert/setAction',
            'setToken' : 'auth/setToken'
            }),
        close(){
            this.$emit('closed',false)  // di emit ke parents, dimana ditangkep oleh event closed, nanti di panggil setDialogStatus
        },
        clearform(){
            this.email= '',
            this.password= '',
            this.name=''
            this.file=null
        },
       
        submit(){
            console.log('submitted')
            
            let formdata= new FormData();
            formdata.append('email', this.email)
            formdata.append('password', this.password)
            formdata.append('name', this.name)
            formdata.append('photo_profile', this.file)

             const config = {
                method:'post',
                url: this.domain + '/api/v2/auth/register',
                data: formdata
            }
            this.axios(config)
            .then( response => {
                console.log(response.data);
                this.clearform()
                this.setAlert({
                    status : true,
                    color : 'success',
                    text:'Register Berhasil'
                })
                this.close() 
            })
            .catch(error =>  {
                console.log(error.response.data)
                this.setAlert({
                    status : true,
                    color : 'error',
                    text: 'Register Gagal'
                })
            })
        },
    },
   

}//te
</script>