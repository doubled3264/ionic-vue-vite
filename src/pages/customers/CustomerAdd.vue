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
  useBackButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { back, diskette } from '../../utils/svg'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import * as customerSchema from '../../utils/validation/customer'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { forEach, isEmpty } from 'lodash'
import * as pageNavigation from '../../utils/page-navigation'

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
const store = useStore()
const route = useRoute()
const router = useRouter()
const pageName = 'customer add'
const customer = ref({
  name: '',
  phone: '',
})
const errorState = ref<ErrorState>({
  name: {
    isError: true,
    message: '',
  },
  phone: {
    isError: true,
    message: '',
  },
})

useBackButton(10, (processNextHandler) => {
  terminal.log(`backbutton pressed from ${pageName}`)
  if (pageNavigation.getActive() == pageName) {
    router.back()
  } else {
    processNextHandler()
  }
})
onIonViewWillEnter(() => {
  pageNavigation.setToActive(pageName)
  terminal.log(`${pageNavigation.getActive()} is active`)
  if (!isEmpty(route.query)) {
    setForm()
  } else {
    setErrorState(true)
  }
})

function setErrorState(value: boolean) {
  forEach(errorState.value, (item: any, key: any) => {
    errorState.value[key as keyof ErrorState].isError = value
  })
}

function setForm() {
  const { name, phone } = route.query
  customer.value.name = name as string
  customer.value.phone = phone as string
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
          <ion-button @click="router.back()">
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
              <custom-input label="nama" v-model:input-value="customer.name" :error-state="errorState.name"
                @validate-input="validateInput('name')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input label="no telepon" v-model:input-value="customer.phone" :error-state="errorState.phone"
                @validate-input="validateInput('phone')"></custom-input>
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
