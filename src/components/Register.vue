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
export default {
    methods:{
        close(){
            this.$emit('closed',false)  // di emit ke parents, dimana ditangkep oleh event closed, nanti di panggil setDialogStatus
        },
    }
}
</script>