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
   onIonViewWillLeave,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import { back, phoneBook } from '../../utils/svg'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import SelectContact from '../../components/modal/customer/SelectContact.vue'
import * as customerSchema from '../../utils/validation/customer'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { forEach } from 'lodash'
import * as pageNavigation from '../../utils/page-navigation'
import { useModal } from '../../composable/modal'

type TAdmin = {
   id: string
   nama: string
   role: string
}

type ErrorState = {
   name: {
      isError: boolean
      message: string
   }
   phone_number: {
      optional: true
      isError: boolean
      message: string
   }
}
const store = useStore()
const router = useRouter()
const pageName = 'customer add'
const admin: TAdmin | any = ref()
const modal = ref({
   searchContact: false,
})
const { modalCustomerAdd, toggleModal } = useModal()
const customer = ref({
   name: '',
   phone_number: '',
})
const errorState = ref<ErrorState>({
   name: {
      isError: true,
      message: '',
   },
   phone_number: {
      optional: true,
      isError: false,
      message: '',
   },
})

useBackButton(10, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      router.back()
   } else {
      processNextHandler()
   }
})
onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   getAdminInfo()
})

onIonViewWillLeave(() => {
   customer.value.name = ''
   customer.value.phone_number = ''
})

function toggleSearchContact() {
   modal.value.searchContact = !modal.value.searchContact
}

function getAdminInfo() {
   admin.value = store.getters['auth/admin']
}

function setErrorState(value: boolean) {
   forEach(errorState.value, (item: any, key: any) => {
      if ('optional' in item) {
         errorState.value[key as keyof ErrorState].isError = false
      } else {
         errorState.value[key as keyof ErrorState].isError = value
      }
   })
}

function addFormContact(credentials: any) {
   const { name, phone } = credentials
   customer.value.name = name as string
   customer.value.phone_number = phone as string
   setErrorState(false)
}
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
/**
 * validate form before saving
 */
async function validateForm() {
   /* validate input component */
   for (const item in errorState.value) {
      /* validate input component */
      if (errorState.value[item as keyof ErrorState].isError) {
         Swal.fire(
            sweetalertDialog.error(
               'terdapat form yang belum terisi'
            ) as SweetAlertOptions
         )
         return ''
      }
   }
   Swal.fire(
      sweetalertDialog.confirm('Kontak akan disimpan.', 'Ya simpan.')
   ).then(async (result) => {
      if (result.isConfirmed) {
         await saveCustomer()
      }
   })
}

async function saveCustomer() {
   const customerData = { admin: admin.value.id, ...customer.value }
   await store
      .dispatch('customer/add', customerData)
      .then(() => {
         Swal.fire(sweetalertDialog.success('Kontak berhasil disimpan.'))
         pageNavigation.goToPage('/customers')
      })
      .catch((err) => {
         Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
      })
}
</script>

<template>
   <ion-page class="customers-add-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>tambah pelanggan</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="pageNavigation.goToPage('/customers')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
               <ion-button @click="toggleSearchContact">
                  <custom-icon :svg-icon="phoneBook" width="26"></custom-icon>
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
               <ion-row class="form-helper">
                  <ion-col>
                     <p>* boleh dikosongkan.</p>
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
         <select-contact
            :is-open="modal.searchContact"
            @close-modal="toggleSearchContact"
            @process-contact="addFormContact"
         ></select-contact>
      </ion-content>
   </ion-page>
</template>
