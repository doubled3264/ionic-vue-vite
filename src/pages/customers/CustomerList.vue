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
  onIonViewDidEnter,
  useBackButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AddOptions from '../../components/modal/customer/AddOptions.vue'
import SelectContact from '../../components/modal/customer/SelectContact.vue'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, phoneBook, plus, threeDots } from '../../utils/svg'
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

useBackButton(10, (processNextHandler) => {
  terminal.log(`backbutton pressed from ${pageName}`)
  if (pageNavigation.getActive() == pageName) {
    router.back()
  } else {
    processNextHandler()
  }
})
onIonViewWillEnter(() => {
  terminal.log(`${pageName} is rendered.`)
  pageNavigation.setToActive(pageName)
  terminal.log(`${pageNavigation.getActive()} is active`)

  fetchCustomerList()
})

async function fetchCustomerList() {
  await store.dispatch('customer/getAll')
  customerList.value = store.getters['customer/getCustomerList']
}

function toggleAddOptions() {
  modal.value.addOptions = !modal.value.addOptions
}

function toggleSearchContact() {
  if (modal.value.addOptions) {
    toggleAddOptions()
  }
  modal.value.searchContact = !modal.value.searchContact
}

function addFromContact(credentials: any) {
  router.push({ path: '/customers/add', query: { ...credentials } })
  /* navigate('/customers/add') */
}

function manualAdd() {
  toggleAddOptions()
  navigate('/customers/add')
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
          <ion-button @click="router.back">
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
        <ion-item v-for="(item, index) in customerList" :key="index + 1">
          <div class="customer-list__item">
            <div class="customer-list__info" @click="terminal.log('click from item')">
              <h3>{{ item.name }}</h3>
              <p>
                <span><custom-icon :svg-icon="phoneBook" width="16" /></span>{{ item.phone }}
              <p>{{ item.phone_number }}</p>
              </p>
            </div>
            <div class="customer-list__nav">
              <ion-buttons>
                <ion-button @click="">
                  <custom-icon :svg-icon="threeDots" width="26">
                  </custom-icon>
                </ion-button>
              </ion-buttons>
            </div>
          </div>
        </ion-item>
      </ion-list>
      <add-options :is-open="modal.addOptions" @close-modal="toggleAddOptions" @serch-contact="toggleSearchContact"
        @manual-add="manualAdd"></add-options>
      <select-contact :is-open="modal.searchContact" @close-modal="toggleSearchContact"
        @process-contact="addFromContact"></select-contact>
    </ion-content>
  </ion-page>
</template>
