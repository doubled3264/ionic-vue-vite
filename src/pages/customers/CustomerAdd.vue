<script setup lang="ts">
import {
   IonPage,
   IonHeader,
   IonToolbar,
   IonTitle,
   onIonViewWillEnter,
} from '@ionic/vue'

onIonViewWillEnter(() => {
   console.log('fire on add page')
})
</script>

<template>
   <ion-page class="customers-add-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>tambah pelanggan</ion-title>
         </ion-toolbar>
      </ion-header>
   </ion-page>
</template>
