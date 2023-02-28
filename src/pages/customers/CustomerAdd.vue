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
   onIonViewWillLeave,
   onIonViewDidLeave,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { back, diskette } from '../../utils/svg'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import * as customerSchema from '../../utils/validation/customer'

type ErrorState = {
   name: {
      isError: boolean
      message: string
   }
   phone: {
      isError: boolean
      message: string
   }
}
const route = useRoute()
const customer = ref({
   name: '',
   phone: '',
})
const errorState = ref<ErrorState>({
   name: {
      isError: false,
      message: '',
   },
   phone: {
      isError: false,
      message: '',
   },
})
onIonViewWillEnter(() => {
   const { name, phone } = route.query
   customer.value.name = name as string
   customer.value.phone = phone as string
})

onIonViewDidLeave(() => {
   console.log('pindah halaman')
})
/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
   await customerSchema.add
      .validateAt(field, customer.value)
      .then(() => {
         errorState.value[field as keyof ErrorState].isError = false
      })
      .catch((err) => {
         errorState.value[field as keyof ErrorState].isError = true
         errorState.value[field as keyof ErrorState].message = err.message
      })
}

/* function navigate(path: string) { */
/*    router.push({ path: path }) */
/* } */
</script>

<template>
   <ion-page class="customers-add-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>tambah pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button>
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="customers-add-page__inner">
            <ion-grid>
               <ion-row>
                  <ion-col>
                     <custom-input
                        label="nama"
                        v-model:input-value="customer.name"
                        :error-state="errorState.name"
                        @validate-input="validateInput('name')"
                     ></custom-input>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <ion-col>
                     <custom-input
                        label="no telepon"
                        v-model:input-value="customer.phone"
                        :error-state="errorState.phone"
                        @validate-input="validateInput('phone')"
                     ></custom-input>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <ion-col>
                     <ion-button expand="block">Simpan</ion-button>
                  </ion-col>
               </ion-row>
            </ion-grid>
         </div>
      </ion-content>
   </ion-page>
</template>
