<script setup lang="ts">
import { IonPage, IonContent, onIonViewWillEnter } from '@ionic/vue'
import { terminal } from 'virtual:terminal'

onIonViewWillEnter(() => {
   terminal.log('print on terminal')
})
</script>
<template>
   <ion-page class="login-page">
      <ion-content> Login Page </ion-content>
   </ion-page>
</template>
