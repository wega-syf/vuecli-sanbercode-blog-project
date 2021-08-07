<template >
    <v-container >
        <v-row justify="center">

            <v-col cols="12" xs='12' md='10' >
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
                <v-card>
                    <v-img
                    :src="article.media" height="400px">
                    </v-img>
                    <v-card-title >
                        <div class="pa-4 text-md-h3 text-center">{{article.title}}</div> 
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        <div class="text-md-h6 pa-4 text-center">
                           <a :href="article.link" > {{article.link}} </a> 
                        </div>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    
                    <v-card-subtitle
                   >
                        <div class="text-md-h6 pa-4 text-justify">
                            {{article.summary}}
                        </div>
                        <div class="text-xs-caption pa-4 text-justify mt-3">
                            *you cannot edit a news article
                        </div>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name:'News',
    data() {
        return {
            article:{}
        }
    },
    methods: {
        go(){
            let{index} = this.$route.params
            console.log(index);
            this.article = this.getArticles[index]
            console.log(this.article);
        }
    },
    computed:{
        ...mapGetters({
            'getArticles' : 'news/getArticles'
        })
    },
    created(){
        this.go()
    }
}
</script>
<style lang="">
    
</style>