<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  onIonViewWillEnter,
  useBackButton,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import * as pageNavigation from '../../utils/page-navigation'
import { setToIDR, setPricePerPortion } from '../../utils/formater'
import { back, pencil, threeDots, info } from '../../utils/svg'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomPopover from '../../components/custom/Popover.vue'
import terminal from 'virtual:terminal'

const store = useStore()
const route = useRoute()
const pageName = 'product detail'
const popover = useToggleComponent()
const popoverItems = ref([
  {
    title: 'ubah harga',
    icon: pencil,
    actionName: 'edit',
  },
  {
    title: 'info harga',
    icon: info,
    actionName: 'price info',
  },
])
const product = ref({
  id: '',
  name: '',
  category: '',
  portion_type: '',
  portion: 0,
  purchase_price: {
    id: '',
    price: 0,
  },
  selling_price: {
    id: '',
    price: 0,
  },
  reseller_price: {
    id: '',
    price: 0,
  },
})

useBackButton(10, (processNextHandler) => {
  if (pageNavigation.getActive() == pageName) {
    pageNavigation.goToPage('/products')
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

function actionPopover(actionName: string) {
  if (actionName == 'edit') {
    pageNavigation.goToPage(`/products/edit/${product.value.id}`)
  } else if (actionName == 'price info') {
    pageNavigation.goToPage(`/products/price-info/${product.value.id}`)
  }
}
</script>
<template>
  <ion-page class="product-detail-page">
    <ion-header mode="ios">
      <ion-toolbar>
        <ion-title>produk</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="pageNavigation.goToPage('/products')">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons id="product-detail" slot="end" @click="popover.toggling">
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
            Rp. {{ setToIDR(product.selling_price.price) }}
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
      <custom-popover :is-open="popover.isOpen.value" @hide-popover="popover.toggling" :event="popover.event.value"
        :items="popoverItems" @action="actionPopover" trigger-id="product-detail" />
    </ion-content>
  </ion-page>
</template>
