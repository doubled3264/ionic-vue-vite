<script setup lang="ts">
import { Ref, ref } from 'vue'
import {
   IonModal,
   IonHeader,
   IonContent,
   IonSearchbar,
   IonList,
   IonItem,
   IonButtons,
   IonButton,
} from '@ionic/vue'
import { Contacts } from '@capacitor-community/contacts'
import { cloneDeep, forEach } from 'lodash'
import { phoneBook, plus } from '../../../utils/svg'
import CustomIcon from '../../custom/Icon.vue'

interface ISearcResult {
   id: string
   name: string
   phone: string
}

const props = defineProps({
   isOpen: Boolean,
})
const emit = defineEmits(['closeModal', 'processContact'])
const modal = ref()
const contactList: any = ref([])
/* const contactToSave: Ref<ISearcResult> = ref({} as ISearcResult) */
let contactToSave = {}
const searchResult: Ref<ISearcResult[]> = ref([])

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
            phone: cleanPhoneNumber(contact.phones[0].number!),
         })
      }
   }
   searchResult.value = cloneDeep(contactList.value)
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
   <ion-modal
      :is-open="isOpen"
      @didDismiss="closeModal"
      @didPresent="fetchContact"
      :initial-breakpoint="0.75"
      :breakpoints="[0.25, 0.5, 0.75]"
      class="modal-search-contact"
   >
      <ion-header class="ion-no-border">
         <ion-searchbar
            class="modal-search-contact searchbar"
            show-clear-button="focus"
            :debounce="800"
            @ionChange="handleChange"
            placeholder="Masukan nama"
         ></ion-searchbar>
      </ion-header>
      <ion-content>
         <ion-list lines="none">
            <ion-item v-for="(item, index) in searchResult" :key="index + 1">
               <div class="modal-search-contact__item">
                  <div class="modal-search-contact__info">
                     <h3>{{ item.name }}</h3>
                     <p>
                        <span
                           ><custom-icon
                              :svg-icon="phoneBook"
                              width="16" /></span
                        >{{ item.phone }}
                     </p>
                  </div>
                  <div class="modal-search-contact__nav">
                     <ion-buttons>
                        <ion-button @click="selectedContact(item.id)">
                           <custom-icon :svg-icon="plus" width="32" />
                        </ion-button>
                     </ion-buttons>
                  </div>
               </div>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-modal>
</template>
