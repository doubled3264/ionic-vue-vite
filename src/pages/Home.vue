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
   onIonViewWillLeave,
   useBackButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import BottomNavigation from '../layout/BottomNavigation.vue'
import MainMenu from '../components/modal/home/MainMenu.vue'
import CustomIcon from '../components/custom/Icon.vue'
import { bell, burgerMenu } from '../utils/svg'
import bottomNavigation from '../store/modules/bottom-navigation'
import terminal from 'virtual:terminal'
import * as pageNavigation from '../utils/page-navigation'
import { useModal } from '../composable/modal'

const store = useStore()
const pageName = 'home'
const { modalHome, toggleModal } = useModal()

const bottomNavigationItem = ref([])

useBackButton(8, () => {})

onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   store.commit('bottomNavigation/turnOffAll')
   store.commit('bottomNavigation/turnOn', pageName)
   bottomNavigationItem.value = store.getters['bottomNavigation/getItem']
})

onIonViewWillLeave(() => {
   bottomNavigationItem.value = []
})
</script>
<template>
   <ion-page class="home-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>home {{ modalHome.mainMenu }}</ion-title>
            <ion-buttons slot="end">
               <ion-button
                  ><custom-icon :svg-icon="bell"></custom-icon
               ></ion-button>
               <ion-button @click="toggleModal('home', 'mainMenu')"
                  ><custom-icon :svg-icon="burgerMenu"></custom-icon
               ></ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <main-menu
            :is-open="modalHome.mainMenu"
            @close-modal="toggleModal('home', 'mainMenu')"
         ></main-menu>
         <bottom-navigation
            :navigation-item="bottomNavigationItem"
         ></bottom-navigation>
      </ion-content>
   </ion-page>
</template>
