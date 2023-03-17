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
import CustomIcon from '../../components/custom/Icon.vue'
import { back, pencil, threeDots, info } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { ref } from 'vue'
import { setToIDR, setPricePerPortion } from '../../utils/formater'
import CustomPopover from '../../components/custom/Popover.vue'

const store = useStore()
const route = useRoute()
const pageName = 'product detail'
const popover = ref({
   isOpen: false,
   event: undefined,
   items: [
      {
         title: 'ubah data',
         icon: pencil,
         actionName: 'edit',
      },
      {
         title: 'info produk',
         icon: info,
         actionName: 'info',
      },
   ],
})
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

function togglePopover(ev: any) {
   popover.value.isOpen = !popover.value.isOpen
   if (popover.value.isOpen) {
      popover.value.event = ev
   } else {
      popover.value.event = undefined
   }
}

function actionPopover(actionName: string) {
   if (actionName == 'edit') {
      pageNavigation.goToPage(`/products/edit/${product.value.id}`)
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
         <custom-popover
            :is-open="popover.isOpen"
            @hide-popover="togglePopover"
            :event="popover.event"
            :items="popover.items"
            @action="actionPopover"
         />
      </ion-content>
   </ion-page>
</template>
