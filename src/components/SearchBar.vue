<template>
    <div class="justify-center">
        <v-text-field
        v-if="showed"
        name="search"
        label="Search"
        placeholder="Press Enter to search"
        solo
        rounded
        v-model="search"
        prepend-icon="mdi-magnify"
        v-on:keyup.enter="callComponent"></v-text-field>

    </div>
</template>
<script>
export default{
    props: ['showed'],
name: 'SearchBar',
data(){
    return{
        search:'',
        blogs:[],
        path:`/search`,
        domain: 'https://demo-api-vue.sanbercloud.com',
        page: 0
    }
},

methods: {
    callComponent(){
       if (this.$route.path !== this.path) this.$router.push(`/search/${this.search}`)
    }

    },
    created (){
        // this.call20blog()
    }
}
</script>