<template>
  <v-container>
    <v-row justify="center">
      <div class="text-center text-h6 text-lg-h3 ma-6">
        Meet The Creators Of This Website
      </div>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="350">
            <v-img height="150px" src="../assets/foto diri.jpeg"></v-img>
            <v-card-title>Adnan Mukhtar</v-card-title>
            <v-card-subtitle>Mahasiswa UI</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text>Contacts</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                  <v-icon>{{show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row class="ma-2 pa-2" justify="center">
                    <v-btn text href="https://www.instagram.com/adnanmkhtr/" target="_blank">
                        <v-img width="40px" src="../assets/ig-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://line.me/R/ti/p/adnanmuchtar02" target="_blank">
                        <v-img width="40px" src="../assets/line-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://t.me/adnanmkhtr" target="_blank">
                        <v-img width="43px" src="../assets/telegram-logo-image-1.png"></v-img>
                    </v-btn>
                    <v-card-subtitle>adnanmuchtar8e01@gmail.com</v-card-subtitle>
                  </v-row>
                </v-card-actions>
              </div>
            </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="350">
            <v-img height="150px" src="../assets/mepic.jpg"></v-img>
            <v-card-title>Burhanudin Rifa</v-card-title>
            <v-card-subtitle>Mahasiswa ITS</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text>Contacts</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show1 = !show1">
                  <v-icon>{{show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show1">
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row class="ma-2 pa-2" justify="center">
                    <v-btn text href="https://www.instagram.com/rifa_hsw/" target="_blank">
                        <v-img width="40px" src="../assets/ig-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://line.me/R/ti/p/deletedforonce" target="_blank">
                        <v-img width="40px" src="../assets/line-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://t.me/hesua1" target="_blank">
                        <v-img width="43px" src="../assets/telegram-logo-image-1.png"></v-img>
                    </v-btn>
                    <v-card-subtitle>handofchaos93@gmail.com</v-card-subtitle>
                  </v-row>
                </v-card-actions>
              </div>
            </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" max-width="350">
            <v-img height="150px" src="../assets/20200620_123850.jpg"></v-img>
            <v-card-title>Wega Syafitra Winarso</v-card-title>
            <v-card-subtitle>Mahasiswa UI</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text>Contacts</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show2 = !show2">
                  <v-icon>{{show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show2">
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row class="ma-2 pa-2" justify="center">
                    <v-btn text href="https://www.instagram.com/wega.syafitra/" target="_blank">
                        <v-img width="40px" src="../assets/ig-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://line.me/R/ti/p/wegsyafitra13" target="_blank">
                        <v-img width="40px" src="../assets/line-small.png"></v-img>
                    </v-btn>
                    <v-btn text href="https://t.me/winars" target="_blank">
                        <v-img width="43px" src="../assets/telegram-logo-image-1.png"></v-img>
                    </v-btn>
                    <v-card-subtitle>wega.syafitra@gmail.com</v-card-subtitle>
                  </v-row>
                </v-card-actions>
              </div>
            </v-expand-transition>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return{
      show: false,
      show1: false,
      show2: false
    }
  }
}
</script>