<script setup lang="ts">
import {
   IonHeader,
   IonPage,
   IonToolbar,
   IonButtons,
   IonButton,
   IonTitle,
   IonContent,
   IonList,
   IonItem,
   onIonViewWillEnter,
   useBackButton,
   onIonViewDidEnter,
} from '@ionic/vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, phoneBook, plus } from '../../utils/svg'
import terminal from 'virtual:terminal'
import * as pageNavigation from '../../utils/page-navigation'

const store = useStore()
const pageName = 'customer list'
const customerList = ref()

useBackButton(9, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      pageNavigation.goToPage('/home')
   } else {
      processNextHandler()
   }
})
onIonViewDidEnter(() => {})
onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   fetchCustomerList()
})

async function fetchCustomerList() {
   await store.dispatch('customer/getAll')
   customerList.value = store.getters['customer/getCustomerList']
}

const getPhoneNumber = computed(() => {
   return (phoneNumber: string) => {
      return phoneNumber.length > 0 ? phoneNumber : '-'
   }
})
</script>

<template>
   <ion-page class="customers-list-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>daftar pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="pageNavigation.goToPage('/home')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
               <ion-button @click="pageNavigation.goToPage('/customers/add')">
                  <custom-icon :svg-icon="plus" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <ion-list lines="none">
            <ion-item
               v-for="(item, index) in customerList"
               :key="index + 1"
               @click="pageNavigation.goToPage(`/customers/${item.id}`)"
            >
               <div class="customer-list__item">
                  <div class="customer-list__info">
                     <h3>{{ item.name }}</h3>
                     <p>
                        <span
                           ><custom-icon
                              :svg-icon="phoneBook"
                              width="16" /></span
                        >{{ getPhoneNumber(item.phone_number) }}
                     </p>
                  </div>
               </div>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-page>
</template>
