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
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { back, phoneBook } from '../../utils/svg'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import * as customerSchema from '../../utils/validation/schema/customer'
import * as pageNavigation from '../../utils/page-navigation'
import * as formValidation from '../../utils/validation'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import SelectContact from '../../components/modal/customer/SelectContact.vue'
import CustomPageReload from '../../components/custom/PageReload.vue'
import CustomButton from '../../components/custom/Button.vue'

import terminal from 'virtual:terminal'
import {
  ContactProjection,
  CustomerDataForSave,
} from '../../utils/interface/customer'
import { Admin } from '../../utils/interface/auth'

type ErrorState = {
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
const pageName = 'customer add'
const modalSearchContact = useToggleComponent()
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
    isError: false,
    message: '',
  },
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
})

onIonViewWillLeave(() => {
  customer.value.name = ''
  customer.value.phone_number = ''
})

function addFormContact(contactInfo: ContactProjection) {
  const { name, phone_number } = contactInfo
  customer.value.name = name
  customer.value.phone_number = phone_number
  validateInput('name')
  validateInput('phone_number')
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
      await saveCustomerContact()
    }
  })
}

async function saveCustomerContact() {
  const admin = <Admin>store.getters['auth/admin']
  const customerData = <CustomerDataForSave>{
    admin: admin.id,
    ...customer.value,
  }
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
    <custom-page-reload />
    <ion-header class="ion-no-border">
      <ion-toolbar mode="ios">
        <ion-title>tambah pelanggan</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="pageNavigation.goToPage('/customers')">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="modalSearchContact.toggling">
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
              <custom-input label="Nama" v-model:input-value="customer.name" :error-state="errorState.name"
                @validate-input="validateInput('name')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input label="No telepon *" v-model:input-value="customer.phone_number"
                :error-state="errorState.phone_number" @validate-input="validateInput('phone_number')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row class="form-helper">
            <ion-col>
              <p>* boleh dikosongkan.</p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-button text="simpan" block color="lapis-lazuli" @click="validateForm" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <select-contact :is-open="modalSearchContact.isOpen.value" @close-modal="modalSearchContact.toggling"
        @process-contact="addFormContact"></select-contact>
    </ion-content>
  </ion-page>
</template>
