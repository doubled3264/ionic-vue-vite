<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonPopover,
  onIonViewWillEnter,
  useBackButton,
  popoverController,
} from '@ionic/vue'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, threeDots } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const pageName = 'product detail'
const product = ref({
  name: '',
  portion_type: '',
  selling_price: 0,
})

useBackButton(10, (processNextHandler) => {
  /* terminal.log(`backbutton pressed from ${pageName}`) */
  if (pageNavigation.getActive() == pageName) {
    navigate('/products')
  } else {
    processNextHandler()
  }
})

onIonViewWillEnter(() => {
  pageNavigation.setToActive(pageName)
  fetchProduct()
})

async function fetchProduct() {
  terminal.log(`params id: ${route.params.id}`)
  await store.dispatch('product/getOne', route.params.id)
  product.value = store.getters['product/getProductDetail']
  console.log(product.value)
}

function navigate(path: string) {
  router.push({ path: path })
}
</script>
<template>
  <ion-page class="product-detail-page">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>produk</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="navigate('/products')">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" @click="">
          <ion-button>
            <custom-icon :svg-icon="threeDots" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="product-detail-page__inner">
      <div class="product-detail-page__info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.selling_price }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>
