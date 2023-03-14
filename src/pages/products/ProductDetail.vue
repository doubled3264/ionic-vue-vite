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
import { back, pencil, threeDots, trash } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { ref } from 'vue'
import { setToIDR, setPricePerPortion } from '../../utils/formater'
import CustomPopover from '../../components/custom/Popover.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const pageName = 'product detail'
const popover = ref({
  isOpen: false,
  event: undefined,
  items: [
    {
      title: 'ubah data',
      icon: pencil,
      actionName: 'ubah',
    },
    /* { */
    /*    title: '', */
    /*    icon: trash, */
    /* }, */
  ],
})
const product = ref({
  id: '',
  name: '',
  category: '',
  portion_type: '',
  portion: 0,
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
  await store.dispatch('product/getOne', route.params.id)
  product.value = store.getters['product/getProductDetail']
}

function togglePopover(ev: any) {
  popover.value.isOpen = !popover.value.isOpen
  if (popover.value.isOpen) {
    popover.value.event = ev
  } else {
    popover.value.event = undefined
  }
}

function actionPopover(actionName: string) {
  terminal.log(`action : ${actionName}`)
  if (actionName == 'ubah') {
    navigate(`/products/edit/${product.value.id}`)
  }
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
        <ion-buttons slot="end" @click="togglePopover">
          <ion-button>
            <custom-icon :svg-icon="threeDots" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="product-detail-page__inner">
      <div class="product-detail-page__info">
        <div class="product-title">
          <h3>{{ product.name }}</h3>
          <p>#{{ product.category }}</p>
        </div>
        <div class="product-price">
          <p>
            Rp. {{ setToIDR(product.selling_price) }}
            <span>
              {{
    setPricePerPortion(
      product.portion_type,
      Number(product.portion)
    )
}}
            </span>
          </p>
        </div>
      </div>
      <custom-popover :is-open="popover.isOpen" @hide-popover="togglePopover" :event="popover.event"
        :items="popover.items" @action="actionPopover" />
    </ion-content>
  </ion-page>
</template>
