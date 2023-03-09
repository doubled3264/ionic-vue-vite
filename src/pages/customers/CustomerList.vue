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
} from '@ionic/vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, phoneBook, plus } from '../../utils/svg'
import terminal from 'virtual:terminal'
import * as pageNavigation from '../../utils/page-navigation'

interface ICustomerList {
   id: string
   contact_person_id: string
   name: string
   phone_number: string
}

const store = useStore()
const router = useRouter()
const pageName = 'customer list'
const customerList = ref()
const modal = ref({
   addOptions: false,
   searchContact: false,
})
/* const bottomNavigationItem = ref([]) */

useBackButton(9, (processNextHandler) => {
   terminal.log(`backbutton pressed from ${pageName}`)
   if (pageNavigation.getActive() == pageName) {
      navigate('/home')
   } else {
      processNextHandler()
   }
})
onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   fetchCustomerList()
})

async function fetchCustomerList() {
   await store.dispatch('customer/getAll')
   customerList.value = store.getters['customer/getCustomerList']
}

const getPhoneNumber = computed(() => {
  return (phoneNumber:string)=>{

  return phoneNumber.length > 0 ? phoneNumber : '-'
    }
})

function navigate(path: string) {
   router.push({ path: path })
}
</script>

<template>
   <ion-page class="customers-list-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>daftar pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="navigate('/home')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
               <ion-button @click="navigate('/customers/add')">
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
               @click="navigate(`/customers/${item.id}`)"
            >
               <div class="customer-list__item">
                  <div class="customer-list__info">
                     <h3>{{ item.name }}</h3>
                     <p>
                        <span
                           ><custom-icon
                              :svg-icon="phoneBook"
                              width="16" /></span
                        >{{getPhoneNumber(item.phone_number)}}
                     </p>
                  </div>
               </div>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-page>
</template>
