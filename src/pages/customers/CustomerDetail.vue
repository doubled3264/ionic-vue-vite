<script setup lang="ts">
import {
   IonPage,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonButtons,
   IonButton,
   onIonViewWillEnter,
   useBackButton,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { useRoute } from 'vue-router'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomPopover from '../../components/custom/Popover.vue'
import { back, whatsapp, threeDots, pencil } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import Swal from 'sweetalert2'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'

const store = useStore()
const route = useRoute()
const pageName = 'customer detail'
const customer = ref({
   id: '',
   contact_person_id: '',
   name: '',
   phone_number: '',
})
const popover = ref({
   isOpen: false,
   event: undefined,
   items: [
      {
         title: 'ubah data',
         icon: pencil,
         actionName: 'edit',
      },
   ],
})

useBackButton(10, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      pageNavigation.goToPage('/customers')
   } else {
      processNextHandler()
   }
})

onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   fetchCustomer()
})

async function fetchCustomer() {
   await store.dispatch('customer/getOne', route.params.id)
   customer.value = store.getters['customer/getCustomerDetail']
}

function togglePopover(ev: any) {
   popover.value.isOpen = !popover.value.isOpen
   if (popover.value.isOpen) {
      popover.value.event = ev
   } else {
      popover.value.event = undefined
   }
}

function actionPopover(actionName: string) {
   if (actionName == 'edit') {
      pageNavigation.goToPage(`/customers/edit/${customer.value.id}`)
   }
}

const getPhoneNumber = computed(() => {
   return customer.value.phone_number == '' ? '-' : customer.value.phone_number
})

function openWhatsapp() {
   const phoneNumber = '62' + customer.value.phone_number.slice(1)
   Swal.fire(
      sweetalertDialog.confirm(
         `Buka kontak "${customer.value.name}" di Whatapp ?`,
         'Ya, buka.'
      )
   ).then((result) => {
      if (result.isConfirmed) {
         window.open(`https://wa.me/${phoneNumber}`)
      }
   })
}
</script>
<template>
   <ion-page class="customer-detail-page">
      <ion-header mode="ios">
         <ion-toolbar>
            <ion-title>pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="pageNavigation.goToPage('/customers')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons id="customer-detail" slot="end" @click="togglePopover">
               <ion-button>
                  <custom-icon :svg-icon="threeDots" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content class="customer-detail-page__inner">
         <div class="customer-detail-page__info">
            <h3>{{ customer.name }}</h3>
            <p @click="openWhatsapp()">
               <span>
                  <custom-icon :svg-icon="whatsapp" width="26" />
               </span>
               {{ getPhoneNumber }}
            </p>
         </div>
         <custom-popover
            :is-open="popover.isOpen"
            @hide-popover="togglePopover"
            :event="popover.event"
            :items="popover.items"
            @action="actionPopover"
            trigger-id="customer-detail"
         />
      </ion-content>
   </ion-page>
</template>
