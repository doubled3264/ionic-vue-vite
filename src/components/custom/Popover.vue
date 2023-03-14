<script setup lang="ts">
import { IonPopover, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue'
import { indexOf } from 'lodash'
import { watch } from 'vue'
import CustomIcon from './Icon.vue'

interface IItems {
   title: string
   icon: string
   actionName: string
}

interface IProps {
   isOpen: boolean
   event: Event | undefined
   items?: Array<IItems>
}
const props = defineProps<IProps>()
const emit = defineEmits(['hidePopover', 'action'])

function hidePopover() {
   if (props.isOpen) {
      emit('hidePopover')
   }
}

function action(actionName: string) {
   emit('action', actionName)
   hidePopover()
}

watch(
   () => props.items,
   (value) => {
      console.log(value)
   }
)
</script>
<template>
   <ion-popover
      class="custom-popover"
      :is-open="isOpen"
      :reference="event"
      :arrow="false"
      @didDismiss="hidePopover"
   >
      <ion-content class="custom-popover__inner">
         <ion-grid>
            <ion-row v-for="(item, index) in items" :key="index + 1">
               <ion-col @click="action(item.actionName)">
                  <custom-icon :svg-icon="item.icon" width="20"></custom-icon>
                  <p>{{ item.title }}</p>
               </ion-col>
            </ion-row>
         </ion-grid>
      </ion-content>
   </ion-popover>
</template>
