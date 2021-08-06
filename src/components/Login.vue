<template lang="">
  <v-card class='d-flex justify-center' width="100vw">
    <v-img :src= "require('../assets/' + getSrc)" height="100vh">
      <v-container class='fill-height' fluid>
        <v-row align='center' justify='center' >
          <v-col cols='12' lg='5' md='8' sm='8'>    
            <v-card class='d-flex justify-center elevation-6 rounded-xl' color="background lighten" >
              <v-container fluid>
                <v-row align='center' justify='center' >
                  <v-col cols='12' lg='10'>
                    <v-form ref=form class='pa-5 pb-10 mt-2'>
                      <!-- Header -->
                      <div class='pa-3 text-left'>
                        <h1 class='mb'>Login</h1>
                        <v-divider></v-divider>
                        <p class='mt-5 '>Hello! Welcome back to Sanberposts Blogs &amp; News!</p>
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
                            placeholder="Enter your email here..."

                            :rules='emailRules'
                            prepend-icon = 'mdi-email'
                        ></v-text-field>

                        <!-- Password Field -->
                        <v-text-field
                            name="password"
                            v-model="password"
                            label="Password"
                            required
                            solo
                            rounded
                            placeholder="Enter your password here..."
                            
                            :prepend-icon = 'showPassword ? "mdi-eye" : "mdi-eye-off"'
                            :rules='passwordRules'
                            :type='showPassword ? "text" : "password"'
                            @click:prepend='showPassword = !showPassword'
                        ></v-text-field>
                      </div>

                      <!-- Login Button -->
                      <div class='text-xl-center mt-3'>
                        <v-row justify='center'>
                          <v-btn color="primary" medium
                          @click='submit'>
                            <v-icon left small>mdi-lock</v-icon> &nbsp;
                          Login
                          </v-btn>
                        </v-row>
                      </div>
                      <!-- Close Button -->
                      <div class='text-xl-center mt-5'>
                        <v-row justify='center'>
                          <v-btn color="red darken-2" dark medium 
                          @click='close'>
                            <v-icon left small>mdi-close</v-icon>&nbsp;
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
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            showPassword:false,
            email:'',
            password:'',
            darkMode:false,
            domain:'https://demo-api-vue.sanbercloud.com',
            emailRules:[
                value => !!value || 'Please enter your email address'
            ],
            passwordRules:[
                value => !!value || 'Please enter your password'
            ]
        }
    },
    computed:{
      ...mapGetters({
        'getSrc' : 'dialog/getSrc'
      })
    },
    methods: {
        ...mapActions({
            'setAlert': 'alert/setAction',
            'setToken' : 'auth/setToken'
            }),
        close(){
            this.$emit('closed',false)  // di emit ke parents, dimana ditangkep oleh event closed, nanti di panggil setDialogStatus
        },
        submit(){
            console.log('submitted');

            const config = {
                method:'post',
                url: this.domain + '/api/v2/auth/login',
                data:{
                    'email' : this.email,
                    'password' : this.password
                }
            }
            this.axios(config)
            .then( response => {
                console.log(response.data);
                // pasang token menggunakan setToken action
                this.setToken(response.data.access_token)

                // Tampilkan alert
                this.setAlert({
                    status : true,
                    color : 'success',
                    text:'Login Berhasil'
                })
                this.close() //tutup dialog
            })
            .catch(response =>  {
                console.log(response)
                this.setAlert({
                    status : true,
                    color : 'error',
                    text: 'Login Gagal'
                })
            })
        }
    },
    activated(){
      console.log(this.$vuetify.theme.dark); 
    }
}
</script>
<style scoped>
.v-btn{
   width: 200px;
}
</style>