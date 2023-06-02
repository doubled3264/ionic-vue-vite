<script setup lang="ts">
import { nextTick, ref } from 'vue'
import {
  IonModal,
  IonHeader,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonSkeletonText,
  IonLabel,
} from '@ionic/vue'
import { Contacts } from '@capacitor-community/contacts'
import { cloneDeep, forEach } from 'lodash'
import { phoneBook, plusCircle } from '../../../utils/svg'
import CustomIcon from '../../custom/Icon.vue'
import terminal from 'virtual:terminal'
import { ContactProjection } from '../../../utils/interface/customer'

const props = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['closeModal', 'processContact'])
const contactList: any = ref()
let contactToSave = {}
const searchResult = ref<Array<ContactProjection>>()

/* function expandBreakpoint() { */
/*    modal.value.$el.setCurrentBreakpoint(0.5) */
/* } */

async function fetchContact() {
  contactList.value = []
  const result = await Contacts.getContacts({
    projection: {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    },
  })

  for (const contact of result.contacts) {
    if (contact.phones) {
      contactList.value.push({
        id: contact.contactId,
        name: contact.name?.display,
        phone_number: cleanPhoneNumber(contact.phones[0].number!),
      })
    }
  }
  terminal.log(contactList.value?.length)
  searchResult.value = await cloneDeep(contactList.value)
  await nextTick()
  terminal.log(searchResult.value?.length)
}

function cleanPhoneNumber(phoneNumber: string) {
  let result = ''
  const raw = phoneNumber.replace(/[^a-zA-Z0-9]/g, '')
  if (raw.charAt(0) == '6') {
    result = raw.slice(2)
    result = '0' + result
  } else {
    result = raw
  }
  return result
}

function closeModal() {
  if (props.isOpen) {
    contactList.value = []
    searchResult.value = []
    emit('closeModal')
  }
}

function handleChange(event: any) {
  const query = event.target.value.toLowerCase()
  searchResult.value = cloneDeep(
    contactList.value.filter(
      (item: any) => item.name.toLowerCase().indexOf(query) > -1
    )
  )
}

function selectedContact(contactId: string) {
  forEach(contactList.value, (item: any) => {
    if (item.id == contactId) {
      contactToSave = item
    }
  })
  emit('processContact', contactToSave)
  closeModal()
}
</script>
<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal" @didPresent="fetchContact" :initial-breakpoint="0.75"
    class="modal-search-contact">
    <ion-header class="ion-no-border">
      <ion-searchbar class="modal-search-contact searchbar" show-clear-button="focus" :debounce="800"
        @ionChange="handleChange" placeholder="Masukan nama"></ion-searchbar>
    </ion-header>
    <ion-content>
      <div v-show="searchResult?.length == 0 || searchResult == undefined" class="pt-32 text-center">
        <p class="text-3xl font-medium text-gray-500">Memuat kontak...</p>
      </div>
      <ion-list v-if="searchResult?.length == contactList.length" lines="none">
        <ion-item v-for="(item, index) in searchResult" :key="index + 1">
          <div class="modal-search-contact__item">
            <div class="modal-search-contact__info">
              <h3>{{ item.name }}</h3>
              <p>
                <span><custom-icon :svg-icon="phoneBook" width="16" /></span>{{ item.phone_number }}
              </p>
            </div>
            <div class="modal-search-contact__nav">
              <ion-buttons>
                <ion-button @click="selectedContact(item.id)">
                  <custom-icon :svg-icon="plusCircle" width="32" />
                </ion-button>
              </ion-buttons>
            </div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>
