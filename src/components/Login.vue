<template lang="">
  <v-card >
      <v-toolbar dark
      src="https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60">
          <v-btn icon dark @click.native='close'>
              <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title >
              <h3>
                  Welcome Back !
              </h3>
              </v-toolbar-title>
      </v-toolbar>

      <v-container fluid >
          <v-form ref=form class='pa-5 pb-10 mt-2'>
<!-- Email Field -->
              <v-text-field
                  name="email"
                  v-model="email"
                  label="E-mail"
                  required

                  :rules='emailRules'
                  prepend-icon = 'mdi-email'
              ></v-text-field>
<!-- Password Field -->
              <v-text-field
                  name="password"
                  v-model="password"
                  label="Password"
                  required
                  
                  :prepend-icon = 'showPassword ? "mdi-eye" : "mdi-eye-off"'
                  :rules='passwordRules'
                  :type='showPassword ? "text" : "password"'
                  @click:prepend='showPassword = !showPassword'
              ></v-text-field>

<!-- Submit Button -->
              <div class='text-xl-center mt-8'>
                  <v-row justify='center'>
                      
                      <v-btn color="primary" medium
                      @click='submit'>
                      &nbsp;	&nbsp;Login	&nbsp;	&nbsp;
                      <v-icon right small>mdi-lock</v-icon>
                      </v-btn>
                  </v-row>
              </div>
              
          </v-form>
      </v-container>
    </v-card>
        
</template>
<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            showPassword:false,
            email:'',
            password:'',
            domain:'https://demo-api-vue.sanbercloud.com',
            emailRules:[
                value => !!value || 'Please enter your email address'
            ],
            passwordRules:[
                value => !!value || 'Please enter your password'
            ]
        }
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
}
</script>
<style scoped>
.v-btn{
   width: 200px;
}
</style>