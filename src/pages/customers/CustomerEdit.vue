<script setup lang="ts">
import {
   IonPage,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonGrid,
   IonRow,
   IonCol,
   IonButtons,
   IonButton,
   onIonViewWillEnter,
   useBackButton,
} from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
import { back } from '../../utils/svg'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import * as customerSchema from '../../utils/validation/customer'
import terminal from 'virtual:terminal'
import * as pageNavigation from '../../utils/page-navigation'
import * as formValidation from '../../utils/validation'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import { CustomerDataForSave } from '../../utils/interface/customer'
import { Admin } from '../../utils/interface/auth'

interface ErrorState {
   name: {
      isError: boolean
      message: string
   }
   phone_number: {
      isError: boolean
      message: string
   }
}

const store = useStore()
const route = useRoute()
const customerId = ref()
const pageName = 'customer edit'

const customer = ref({
   id: '',
   name: '',
   phone_number: '',
})
const errorState = ref<ErrorState>({
   name: {
      isError: false,
      message: '',
   },
   phone_number: {
      isError: false,
      message: '',
   },
})

useBackButton(10, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      pageNavigation.goToPage(`/customers/${customerId.value}`)
   } else {
      processNextHandler()
   }
})

onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   customerId.value = route.params.id
   fetchCustomer()
})

async function fetchCustomer() {
   await store.dispatch('customer/getOne', route.params.id)
   let data = store.getters['customer/getCustomerDetail']
   customer.value.id = data.id
   customer.value.name = data.name
   customer.value.phone_number = data.phone_number
}

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: 'name' | 'phone_number') {
   await formValidation.validateInput(
      toRef(customer, 'value'),
      toRef(errorState, 'value'),
      customerSchema.add,
      field
   )
}

/**
 * validate form before saving
 */
async function validateForm() {
   /* validate input component */
   for (const item in errorState.value) {
      /* validate input component */
      if (errorState.value[item as keyof ErrorState].isError) {
         Swal.fire(sweetalertDialog.error('terdapat form yang belum terisi'))
         return ''
      }
   }
   Swal.fire(
      sweetalertDialog.confirm('Perubahan akan disimpan.', 'Ya simpan.')
   ).then(async (result) => {
      if (result.isConfirmed) {
         await editCustomer()
      }
   })
}
async function editCustomer() {
   const admin = <Admin>store.getters['auth/admin']
   const customerData = <CustomerDataForSave>{
      admin: admin.id,
      ...customer.value,
   }
   await store
      .dispatch('customer/edit', customerData)
      .then(() => {
         Swal.fire(sweetalertDialog.success('Kontak berhasil diubah.'))
         pageNavigation.goToPage(`/customers/${customerId.value}`)
      })
      .catch((err) => {
         Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
      })
}
</script>
<template>
   <ion-page class="customer-edit-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>ubah data pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button
                  @click="pageNavigation.goToPage(`/customers/${customerId}`)"
               >
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
                        label="no telepon *"
                        v-model:input-value="customer.phone_number"
                        :error-state="errorState.phone_number"
                        @validate-input="validateInput('phone_number')"
                     ></custom-input>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <ion-col>
                     <ion-button expand="block" @click="validateForm"
                        >Simpan</ion-button
                     >
                  </ion-col>
               </ion-row>
            </ion-grid>
         </div>
      </ion-content>
   </ion-page>
</template>
