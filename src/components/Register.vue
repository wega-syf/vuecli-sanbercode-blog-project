<template lang="">
    <v-card>
        <v-toolbar dark color='success'>
            <v-btn icon dark @click.native='close'>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <v-container fluid >
            <v-form ref=form>
                <!-- Email Field -->
                <v-text-field
                    name="email"
                    v-model="email"
                    label="E-mail"
                    required
                    append-icon = 'mdi-email'
                ></v-text-field>

                <!-- Name Field -->
                <v-text-field
                    name="name"
                    v-model="name"
                    label="Name"
                    required
                    append-icon = 'mdi-account'
                ></v-text-field>

                <!-- Password Field -->
                <v-text-field
                    name="password"
                    v-model="password"
                    label="Password"
                    required
                    :append-icon = 'showPassword ? "mdi-eye" : "mdi-eye-off"'
                    :type='showPassword ? "text" : "password"'
                    @click:append='showPassword = !showPassword'
                ></v-text-field>

          <div>
              <v-file-input 
              v-model="file"
              name="uploadfile"
              label="Select File..."
              truncate-length="125"
               accept="image/*"
              required/>
          </div>
                <!-- Submit Button -->
                <div class='text-xs-center'>
                    <v-btn color="blue"
                    @click='submit'>
                    Sign me up!
                    <v-icon right small>mdi-lock</v-icon>
                    </v-btn>

                </div>

            </v-form>
        </v-container>


    </v-card>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
       return {showPassword: false,
        email: '',
        password: '',
        name: '',
        file: null,
        domain: 'https://demo-api-vue.sanbercloud.com'}
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
            this.fil=null
        },
       
        submit(){
            console.log('submitted')
            
            let formdata= new FormData();
            formdata.append('email', this.email)
            formdata.append('password', this.password)
            formdata.append('name', this.name)
            formdata.append('photo', this.file)

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