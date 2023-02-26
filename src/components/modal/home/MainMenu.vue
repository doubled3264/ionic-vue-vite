<script setup lang="ts">
import { ref } from 'vue'
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/vue'
import { Contacts } from '@capacitor-community/contacts'
import { useRouter } from 'vue-router'
import CustomIcon from '../../custom/Icon.vue'
import { order, cross, user, bill, box, trolley } from '../../../utils/svg'

const props = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['closeModal'])
const router = useRouter()
const contactList: any = ref([])
function closeModal() {
  if (props.isOpen) {
    emit('closeModal')
  }
}
function navigate(path: string) {
  closeModal()
  router.push({ path: path })
}

const printContactsData = async () => {
  const result = await Contacts.getContacts({
    projection: {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    },
  })

  for (const contact of result.contacts) {
    const number = contact.phones?.[0]?.number
    const street = contact.postalAddresses?.[0]?.street
    console.log(number, street)
    contactList.value.push({
      id: contact.contactId,
      name: contact.name?.display,
      phone: contact.phones?.[1]?.number,
    })
  }
}
</script>
<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal" class="modal-main-menu">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>menu utama</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="closeModal">
            <custom-icon :svg-icon="cross" width="16"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="modal-main-menu__inner">
        <h3>pelanggan</h3>
        <ion-list lines="none">
          <ion-item @click="navigate('/customers')">
            <custom-icon :svg-icon="user" width="20"></custom-icon>
            <ion-label>daftar pelanggan</ion-label>
          </ion-item>
          <ion-item @click="navigate('/orders')">
            <custom-icon :svg-icon="order" width="20"></custom-icon>
            <ion-label>daftar pesanan</ion-label>
          </ion-item>
          <ion-item @click="navigate('/bills')">
            <custom-icon :svg-icon="bill" width="20"></custom-icon>
            <ion-label>daftar tagihan</ion-label>
          </ion-item>
        </ion-list>
        <h3>sales</h3>
        <ion-list lines="none">
          <ion-item>
            <custom-icon :svg-icon="trolley" width="20"></custom-icon>
            <ion-label>daftar sales</ion-label>
          </ion-item>
          <ion-item>
            <custom-icon :svg-icon="bill" width="20"></custom-icon>
            <ion-label>daftar tagihan</ion-label>
          </ion-item>
        </ion-list>
        <h3>barang</h3>
        <ion-list lines="none">
          <ion-item>
            <custom-icon :svg-icon="box" width="20"></custom-icon>
            <ion-label>daftar barang</ion-label>
          </ion-item>
          <ion-item @click="printContactsData">
            <custom-icon :svg-icon="box" width="20"></custom-icon>
            <ion-label>get contact</ion-label>
          </ion-item>
          <ion-item @click="printContactsData">
            <p>{{ contactList }}</p>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-modal>
</template>
