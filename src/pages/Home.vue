<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import BottomNavigation from '../layout/BottomNavigation.vue'

const store = useStore()
const page = 'home'
const bottomNavigationItem = ref([])

onIonViewWillEnter(() => {
  store.commit('bottomNavigation/turnOffAll')
  store.commit('bottomNavigation/turnOn', page)
  bottomNavigationItem.value = store.getters['bottomNavigation/getItem']
})
</script>
<template>
  <ion-page class="home-page">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <bottom-navigation :navigation-item="bottomNavigationItem"></bottom-navigation>
    </ion-content>
  </ion-page>
</template>
