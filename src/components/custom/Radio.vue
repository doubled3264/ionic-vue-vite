<script setup lang="ts">
import {
   IonLabel,
   IonRadioGroup,
   IonRadio,
   IonList,
   IonItem,
   IonGrid,
   IonRow,
   IonCol,
} from '@ionic/vue'
import terminal from 'virtual:terminal'

interface IProps {
   label: string
   inputValue: string
   items?: Array<string>
}

defineProps<IProps>()
const emit = defineEmits(['update:inputValue'])

function validateInput(item: string) {
   terminal.log('radio button clicked.')
   /* terminal.log(item) */
   emit('update:inputValue', item)
}
</script>
<template>
   <div class="custom-radio">
      <div class="custom-radio__inner">
         <ion-label>{{ label }}</ion-label>
         <div class="custom-radio__item">
            <ion-list lines="none">
               <ion-radio-group :value="inputValue">
                  <ion-item
                     v-for="(item, index) in items"
                     :key="index + 1"
                     @click="validateInput(item)"
                  >
                     <ion-label>{{ item }}</ion-label>
                     <ion-radio slot="start" :value="item"></ion-radio>
                  </ion-item>
               </ion-radio-group>
            </ion-list>
         </div>
      </div>
   </div>
</template>
