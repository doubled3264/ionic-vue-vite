<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonTabButton,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue'
import { chevronBack, grid, share, trash } from 'ionicons/icons'
import CustomIcon from '../components/custom/Icon.vue'
import { home, order, bill, user } from '../utils/svg'
</script>
<template>
  <ion-page>
    <ion-content>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button> </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <div class="footer">
        <ion-grid>
          <ion-row>
            <ion-col size="3" router-link="/dashboard">
              <div class="bottom-nav__item">
                <custom-icon :svg-icon="home" width="26"></custom-icon>
                <p>home</p>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="bottom-nav__item">
                <custom-icon :svg-icon="order" width="26"></custom-icon>
                <p>pesanan</p>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="bottom-nav__item">
                <custom-icon :svg-icon="bill" width="26"></custom-icon>
                <p>tagihan</p>
              </div>
            </ion-col>
            <ion-col size="3">
              <div class="bottom-nav__item">
                <custom-icon :svg-icon="user" width="26"></custom-icon>
                <p>pelanggan</p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>
