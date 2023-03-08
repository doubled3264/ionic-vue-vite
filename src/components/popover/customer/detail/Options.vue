<script setup lang="ts">
import { IonPopover, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue'
import { pencil, trash } from '../../../../utils/svg'
import CustomIcon from '../../../custom/Icon.vue'

interface IPopover {
   isOpen: boolean
   event: Event | undefined
}
const props = defineProps<IPopover>()
const emit = defineEmits(['closePopover', 'editAction'])

function closeModal() {
   if (props.isOpen) {
      emit('closePopover')
   }
}
function editAction() {
   emit('editAction')
   closeModal()
}
</script>
<template>
   <ion-popover
      class="customer-detail-page popover"
      :is-open="isOpen"
      :reference="event"
      :arrow="false"
      @didDismiss="closeModal"
   >
      <ion-content class="customer-detail-page popover__inner">
         <ion-grid>
            <ion-row>
               <ion-col @click="editAction">
                  <custom-icon :svg-icon="pencil" width="20" />
                  <p>ubah data</p>
               </ion-col>
            </ion-row>
            <ion-row>
               <ion-col>
                  <custom-icon :svg-icon="trash" width="20" />
                  <p>arsipkan data</p>
               </ion-col>
            </ion-row>
         </ion-grid>
      </ion-content></ion-popover
   >
</template>
