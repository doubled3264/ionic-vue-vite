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
   createAnimation,
} from '@ionic/vue'
import { nextTick, ref, toRef } from 'vue'
import { useRoute } from 'vue-router'
import * as pageNavigation from '../../utils/page-navigation'
/* import { useCard } from '../../composable/card' */
/* import { useProductPriceInfoAnimation } from '../../composable/animation' */
import { useCardAnimation } from '../../composable/cardAnimation'
import { arrowRight, back } from '../../utils/svg'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomCard from '../../components/custom/Card.vue'

const route = useRoute()
/* const { toggleCardNav, cardProductPriceInfo } = useCard() */
/* const { purchasePriceList } = useProductPriceInfoAnimation() */
const pageName = 'product price info'
const productId = ref()
const purchasePriceListCardElement = ref()
let purchasePriceListCard: any = null

useBackButton(10, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      pageNavigation.goToPage(`/products/${productId.value}`)
   } else {
      processNextHandler()
   }
})

onIonViewWillEnter(async () => {
   pageNavigation.setToActive(pageName)
   productId.value = route.params.id
   await nextTick()
   purchasePriceListCard = useCardAnimation(purchasePriceListCardElement.value)
})
async function rotateNav() {
   purchasePriceListCard.toggleCard()
   console.log(purchasePriceListCard.state.isOpen)
   purchasePriceListCard.cardAnimation.play()
   /* toggle */
   /* toggleCard() */
   /* cardAnimation().play() */
   /* const trigger = cardAnimation() */
   /* trigger.play() */
   /* await nextTick() */
   /* toggleCardNav('productPriceInfo', 'purchasePrice') */
   /* const trigger = await purchasePriceList( */
   /*    toRef(cardPurchasePrice, 'value'), */
   /*    cardProductPriceInfo.purchasePrice */
   /* ) */
   /* trigger.play() */
}
</script>
<template>
   <ion-page class="product-price-info-page">
      <ion-header mode="ios">
         <ion-toolbar>
            <ion-title>info harga produk</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="pageNavigation.goToPage('/products')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="product-price-info-page__inner">
            <custom-card>
               <template #cardTitle>
                  <h3>perubahan harga modal</h3>
               </template>
               <template #cardNav>
                  <div
                     ref="purchasePriceListCardElement"
                     class="custom-card__nav-icon"
                     @click="rotateNav"
                  >
                     <custom-icon :svg-icon="arrowRight" width="18" />
                  </div>
               </template>
               <template #cardBody>
                  <p>harga 1</p>
                  <p>harga 2</p>
                  <p>harga 3</p>
               </template>
            </custom-card>
         </div>
      </ion-content>
   </ion-page>
</template>
