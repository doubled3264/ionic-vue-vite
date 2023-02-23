<script setup lang="ts">
import { IonGrid, IonRow, IonCol, onIonViewWillEnter } from '@ionic/vue'
import { watch } from 'vue'
import CustomIcon from '../components/custom/Icon.vue'
import { home, order, bill, user } from '../utils/svg'

type NavigationItem = {
   title: string
   path: string
   icon: string
   isActive: boolean
}

const props = defineProps<{ navigationItem: Array<NavigationItem> }>()

watch(
   () => props.navigationItem,
   (newValue) => {
      console.log(newValue)
   }
)
onIonViewWillEnter(() => {
   console.log('show dashboard')
})
</script>
<template>
   <div class="bottom-navigation">
      <ion-grid>
         <ion-row>
            <ion-col
               v-for="(item, index) in props.navigationItem"
               :key="index + 1"
               size="3"
               :router-link="item.path"
            >
               <div
                  :class="[
                     'bottom-navigation__item',
                     { 'bottom-navigation__item--active': item.isActive },
                  ]"
               >
                  <custom-icon :svg-icon="item.icon" width="26"></custom-icon>
                  <p>{{ item.title }}</p>
               </div>
            </ion-col>
         </ion-row>
      </ion-grid>
   </div>
</template>
