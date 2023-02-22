<script setup lang="ts">
import {
   IonHeader,
   IonToolbar,
   IonTitle,
   IonContent,
   IonPage,
} from '@ionic/vue'
import BasePages from '../layout/BasePages.vue'
</script>

<template>
   <ion-page>
      <ion-header>
         <ion-toolbar>
            <ion-title>Customers</ion-title>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="example-content">Customers content</div>
      </ion-content>
   </ion-page>
</template>
