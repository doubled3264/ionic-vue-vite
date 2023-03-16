<script setup lang="ts">
import { IonModal, IonList, IonItem, IonLabel } from '@ionic/vue'

const props = defineProps({
   isOpen: Boolean,
})
const emit = defineEmits(['closeModal', 'serchContact', 'manualAdd'])

function closeModal() {
   if (props.isOpen) {
      emit('closeModal')
   }
}
</script>
<template>
   <ion-modal
      :is-open="isOpen"
      @didDismiss="closeModal"
      class="modal-add-options"
   >
      <div class="modal-add-options__inner">
         <h3>tambah data pelanggan</h3>

         <ion-list lines="none">
            <ion-item
               :button="true"
               :detail="false"
               @click="emit('serchContact')"
            >
               <p>Pilih dari kontak</p>
            </ion-item>
            <ion-item :button="true" :detail="false" @click="emit('manualAdd')">
               <p>Tambahkan manual</p>
            </ion-item>
         </ion-list>
      </div>
   </ion-modal>
</template>
