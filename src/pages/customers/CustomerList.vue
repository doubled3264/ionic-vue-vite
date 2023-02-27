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
   onIonViewDidEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AddOptions from '../../components/modal/customer/AddOptions.vue'
import SelectContact from '../../components/modal/customer/SelectContact.vue'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, plus } from '../../utils/svg'

/* const store = useStore() */
/* const page = 'pelanggan' */
const router = useRouter()
const modal = ref({
   addOptions: false,
   searchContact: false,
})
/* const bottomNavigationItem = ref([]) */

onIonViewWillEnter(() => {
   /* store.commit('bottomNavigation/turnOffAll') */
   /* store.commit('bottomNavigation/turnOn', page) */
   /* bottomNavigationItem.value = store.getters['bottomNavigation/getItem'] */
})

function toggleAddOptions() {
   modal.value.addOptions = !modal.value.addOptions
}

function toggleSearchContact() {
   if (modal.value.addOptions) {
      toggleAddOptions()
   }
   modal.value.searchContact = !modal.value.searchContact
}
function dismiss() {
   /* modal.value.$el.dismiss() */
   alert('maman racin')
}

function navigate(path: string) {
   router.push({ path: path })
}
</script>

<template>
   <ion-page class="customers-list-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="navigate('/home')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
               <ion-button @click="toggleAddOptions">
                  <custom-icon :svg-icon="plus" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <add-options
            :is-open="modal.addOptions"
            @close-modal="toggleAddOptions"
            @serch-contact="toggleSearchContact"
         ></add-options>
         <select-contact
            :is-open="modal.searchContact"
            @close-modal="toggleSearchContact"
         ></select-contact>
      </ion-content>
   </ion-page>
</template>
