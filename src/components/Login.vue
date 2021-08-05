<template lang="">
    <v-card>
        <v-toolbar dark color='success'>
            <v-btn icon dark @click.native='close'>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Login</v-toolbar-title>
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
                <!-- Password Field -->
                <v-text-field
                    name="name"
                    v-model="password"
                    label="Password"
                    required
                    :append-icon = 'showPassword ? "mdi-eye" : "mdi-eye-off"'
                    :type='showPassword ? "text" : "password"'
                    @click:append='showPassword = !showPassword'
                ></v-text-field>

                <!-- Submit Button -->
                <div class='text-xs-center'>
                    <v-btn color="success"
                    @click='submit'>
                    Login
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
    data() {
        return {
            showPassword:false,
            email:'',
            password:'',
            domain:'https://demo-api-vue.sanbercloud.com',
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
<style lang="">
    
</style>