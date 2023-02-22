<template>
   <ion-tabs>
      <IonRouterOutlet></IonRouterOutlet>
      <ion-tab-bar slot="bottom">
         <ion-tab-button
            tab="/dashboard"
            href="/dashboard"
            class="tab-menu__item"
         >
            <ion-icon :icon="playCircle" />
            <ion-label class="tab-menu__label">
               <p>dashboard</p>
            </ion-label>
         </ion-tab-button>

         <ion-tab-button tab="/customers" href="/customers">
            <ion-icon :icon="radio" />
            <ion-label class="tab-menu__label">
               <p>pelanggan</p>
            </ion-label>
         </ion-tab-button>

         <ion-tab-button tab="pesanan" href="/orders">
            <ion-icon :icon="library" />
            <ion-label class="tab-menu__label">
               <p>pesanan</p>
            </ion-label>
         </ion-tab-button>

         <ion-tab-button tab="orders" href="/bills">
            <ion-icon :icon="search" />
            <ion-label class="tab-menu__label">
               <p>tagihan</p>
            </ion-label>
         </ion-tab-button>
      </ion-tab-bar>
   </ion-tabs>
</template>

<script lang="ts">
import {
   IonPage,
   IonTabs,
   IonRouterOutlet,
   IonTabBar,
   IonTabButton,
   IonLabel,
   IonIcon,
} from '@ionic/vue'

import { playCircle, radio, library, search } from 'ionicons/icons'

export default {
   components: {
      IonPage,
      IonTabs,
      IonRouterOutlet,
      IonTabBar,
      IonTabButton,
      IonLabel,
      IonIcon,
   },
   data() {
      return {
         playCircle,
         radio,
         library,
         search,
      }
   },
}
</script>
