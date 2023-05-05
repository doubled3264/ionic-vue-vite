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
  onIonViewDidEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { useToggleSegment } from '../../composable/toggle-segment-component'
import * as pageNavigation from '../../utils/page-navigation'
import { setToIDR, setPricePerPortion } from '../../utils/formater'
import { back, pencil, threeDots, plus } from '../../utils/svg'
import CustomPageReload from '../../components/custom/PageReload.vue'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomPopover from '../../components/custom/Popover.vue'
import PriceInfo from './product-detail/PriceInfo.vue'
import HistoryPriceChange from './product-detail/HistoryPriceChange.vue'
import HalfPortionPrice from './product-detail/HalfPortionPrice.vue'
import ModalAddHalfPortionPrice from '../../components/modal/product/product-detail/AddHalfPortionPrice.vue'

const store = useStore()
const route = useRoute()
const pageName = 'product detail'
const popover = useToggleComponent()
const halfPriceModal = useToggleComponent()
const popoverItems = ref([
  {
    title: 'harga lainnya',
    icon: plus,
    actionName: 'add half portion',
  },
  {
    title: 'ubah harga',
    icon: pencil,
    actionName: 'edit',
  },
])
const segment = useToggleSegment()
const segmentMenuItems = [
  {
    type: 'price-info',
    title: 'info harga',
    isActive: false,
  },
  {
    type: 'another-price',
    title: 'harga lainnya',
    isActive: false,
  },
  {
    type: 'history-price-change',
    title: 'riwayat kenaikan',
    isActive: false,
  },
]
const product = ref({
  id: '',
  name: '',
  category: '',
  portion_type: '',
  portion: 0,
  purchase_price: {
    id: '',
    product_id: '',
    price: '',
  },
  selling_price: {
    id: '',
    portion_id: '',
    price: '',
  },
  reseller_price: {
    id: '',
    portion_id: '',
    price: '',
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
  segment.initItem(segmentMenuItems)
})

onIonViewDidEnter(() => {
  segment.toggling('another-price')
})

async function fetchProduct() {
  await store.dispatch('product/getOne', route.params.id)
  product.value = store.getters['product/getProductDetail']

  await store.dispatch('product/getPriceList', route.params.id)
}

function actionPopover(actionName: string) {
  if (actionName == 'edit') {
    pageNavigation.goToPage(`/products/edit/${product.value.id}`)
  } else if (actionName == 'add half portion') {
    halfPriceModal.toggling()
  }
}
</script>
<template>
  <ion-page class="product-detail-page">
    <custom-page-reload />
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
    <ion-content>
      <div class="product-detail-page__inner">
        <div class="product-detail-page__info">
          <div class="product-title">
            <h3>{{ product.name }}</h3>
            <p>#{{ product.category }}</p>
          </div>
          <div class="product-price">
            <p>
              Rp. {{ setToIDR(Number(product.selling_price.price)) }}
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
        <div class="segment-menu">
          <ion-segment mode="ios" :value="segment.activeSegment.value">
            <ion-segment-button v-for="(item, index) in segment.items.value" :key="index + 1" :value="item.type"
              @click="segment.toggling(item.type)">
              {{ item.title }}
            </ion-segment-button>
          </ion-segment>
        </div>
        <price-info v-show="segment.activeSegment.value == 'price-info'" :purchase-price="product.purchase_price.price"
          :selling-price="product.selling_price.price" :reseller-price="product.reseller_price.price" />
        <half-portion-price v-show="segment.activeSegment.value == 'another-price'" />
        <history-price-change :is-show="segment.activeSegment.value == 'history-price-change'" />
        <custom-popover :is-open="popover.isOpen.value" @hide-popover="popover.toggling" :event="popover.event.value"
          :items="popoverItems" @action="actionPopover" trigger-id="product-detail" />
        <modal-add-half-portion-price :is-open="halfPriceModal.isOpen.value" @hide-modal="halfPriceModal.toggling"
          :product-id="product.id" />
      </div>
    </ion-content>
  </ion-page>
</template>
