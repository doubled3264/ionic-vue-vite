<script setup lang="ts">
import { ref, watch } from 'vue'
import {
   IonModal,
   IonHeader,
   IonToolbar,
   IonContent,
   IonSearchbar,
   IonList,
   IonItem,
   IonLabel,
   IonButtons,
   IonButton,
} from '@ionic/vue'
import { Contacts } from '@capacitor-community/contacts'
import { cloneDeep, filter } from 'lodash'
import { phoneBook, plus } from '../../../utils/svg'
import CustomIcon from '../../custom/Icon.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
   isOpen: Boolean,
})
const emit = defineEmits(['closeModal'])
const router = useRouter()
const modal = ref()
const contactList: any = ref([])
const contactToSave = ref({})
const searchResult = ref([])

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
            phone: cleanPhoneNumber(contact.phones?.[0]?.number),
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

function navigate(contactId: string) {
   contactToSave.value = filter(contactList.value, { id: contactId })
   router.push({ path: '/customers/add', query: contactToSave.value[0] })
   closeModal()
}
</script>
<template>
   <ion-modal
      ref="modal"
      :is-open="isOpen"
      @didDismiss="closeModal"
      @didPresent="fetchContact"
      :initial-breakpoint="0.75"
      class="modal-search-contact"
   >
      <ion-header class="ion-no-border">
         <ion-toolbar>
            <ion-searchbar
               :debounce="1000"
               @ionChange="handleChange"
               placeholder="Masukan nama"
            ></ion-searchbar>
         </ion-toolbar>
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
                        <ion-button @click="navigate(item.id)">
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
