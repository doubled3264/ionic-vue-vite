<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import BottomNavigation from '../layout/BottomNavigation.vue'
import CustomIcon from '../components/custom/Icon.vue'
import { plusCircle } from '../utils/svg'

const store = useStore()
const page = 'tagihan'
const bottomNavigationItem = ref([])

onIonViewWillEnter(() => {
  store.commit('bottomNavigation/turnOffAll')
  store.commit('bottomNavigation/turnOn', page)
  bottomNavigationItem.value = store.getters['bottomNavigation/getItem']
})
</script>

<template>
  <ion-page class="bills-page">
    <ion-header class="ion-no-border">
      <ion-toolbar mode="ios">
        <ion-title>tagihan</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <custom-icon :svg-icon="plusCircle" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <bottom-navigation :navigation-item="bottomNavigationItem"></bottom-navigation>
    </ion-content>
  </ion-page>
</template>
