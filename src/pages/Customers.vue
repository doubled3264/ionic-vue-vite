<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonModal,
  IonLabel,
  IonImg,
  IonAvatar,
  IonList,
  IonItem,
  onIonViewWillEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import BottomNavigation from '../layout/BottomNavigation.vue'
import CustomIcon from '../components/custom/Icon.vue'
import { plusCircle } from '../utils/svg'

const store = useStore()
const page = 'pelanggan'
const modal = ref()
const bottomNavigationItem = ref([])

onIonViewWillEnter(() => {
  store.commit('bottomNavigation/turnOffAll')
  store.commit('bottomNavigation/turnOn', page)
  bottomNavigationItem.value = store.getters['bottomNavigation/getItem']
})
</script>

<template>
  <ion-page class="customers-page">
    <ion-header class="ion-no-border">
      <ion-toolbar mode="ios">
        <ion-title>pelanggan</ion-title>
        <ion-buttons slot="end">
          <ion-button id="open-add-modal">
            <custom-icon :svg-icon="plusCircle" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-modal ref="modal" trigger="open-add-modal" class="modal-customer-add">
        <div class="modal-customer-add__inner">
          <h3>Pilih salah satu</h3>
          <ion-list lines="none">
            <ion-item>
              <p>Tambah data pelanggan</p>
            </ion-item><ion-item>
              <p>Tambah data sales</p>
            </ion-item>
          </ion-list>
        </div>
      </ion-modal>
      <bottom-navigation :navigation-item="bottomNavigationItem"></bottom-navigation>
    </ion-content>
  </ion-page>
</template>
