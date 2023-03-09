<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonPopover,
  onIonViewWillEnter,
  useBackButton,
  popoverController,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { useRoute, useRouter } from 'vue-router'
import CustomIcon from '../../components/custom/Icon.vue'
import PopoverOptions from '../../components/popover/customer/detail/Options.vue'
import { back, whatsapp, threeDots } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import Swal from 'sweetalert2'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'

const store = useStore()
const route = useRoute()
const router = useRouter()
const pageName = 'customer detail'
const customer = ref({
  id: '',
  contact_person_id: '',
  name: '',
  phone_number: '',
})
const popOver = ref({
  options: {
    isOpen: false,
    event: undefined,
  },
})

useBackButton(10, (processNextHandler) => {
  terminal.log(`backbutton pressed from ${pageName}`)
  if (pageNavigation.getActive() == pageName) {
    navigate('/customers')
  } else {
    processNextHandler()
  }
})

onIonViewWillEnter(() => {
  pageNavigation.setToActive(pageName)
  fetchCustomer()
})

async function fetchCustomer() {
  terminal.log(`params id: ${route.params.id}`)
  await store.dispatch('customer/getOne', route.params.id)
  customer.value = store.getters['customer/getCustomerDetail']
  terminal.log(store.getters['customer/getCustomerDetail'])
}

async function togglePopOverOptions(ev: any) {
  /* const popover = await popoverController.create({ */
  /*    component: PopoverOptions, */
  /*    event: ev, */
  /*    size: 'auto', */
  /*    cssClass: 'customer-detail-page popover', */
  /* }) */
  /* await popover.present() */
  popOver.value.options.isOpen = !popOver.value.options.isOpen
  if (popOver.value.options.isOpen) {
    popOver.value.options.event = ev
  } else {
    popOver.value.options.event = undefined
  }
  console.log(popOver.value.options.event)
}

const getPhoneNumber = computed(() => {
  return customer.value.phone_number == '' ? '-' : customer.value.phone_number
})

function navigate(path: string) {
  router.push({ path: path })
}

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
          <ion-button @click="navigate('/customers')">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" @click="togglePopOverOptions">
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
      <popover-options :is-open="popOver.options.isOpen" :event="popOver.options.event"
        @close-popover="togglePopOverOptions" @edit-action="navigate(`/customers/edit/${customer.id}`)" />
    </ion-content>
  </ion-page>
</template>
