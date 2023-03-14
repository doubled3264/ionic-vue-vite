<script setup lang="ts">
import {
   IonHeader,
   IonPage,
   IonToolbar,
   IonButtons,
   IonButton,
   IonTitle,
   IonContent,
   IonList,
   IonItem,
   onIonViewWillEnter,
   useBackButton,
} from '@ionic/vue'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomInput from '../../components/custom/Input.vue'
import { back, phoneBook, plus } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { setToIDR } from '../../utils/formater'

const store = useStore()
const router = useRouter()
const pageName = 'product list'
const productList = ref()

useBackButton(9, (processNextHandler) => {
   if (pageNavigation.getActive() == pageName) {
      navigate('/home')
   } else {
      processNextHandler()
   }
})

onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   fetchProductList()
})

async function fetchProductList() {
   terminal.log('fetch data productList')
   await store.dispatch('product/getAll')
   productList.value = store.getters['product/getProductList']
}

function navigate(path: string) {
   router.push({ path: path })
}
</script>
<template>
   <ion-page class="product-list-page">
      <ion-header>
         <ion-toolbar mode="ios">
            <ion-title>daftar produk</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="navigate('/home')">
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
               <ion-button @click="navigate('/products/add')">
                  <custom-icon :svg-icon="plus" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <ion-list lines="none">
            <ion-item
               v-for="(item, index) in productList"
               @click="navigate(`/products/${item.id}`)"
            >
               <div class="product-list__item">
                  <h3>{{ item.name }}</h3>
                  <p>Rp {{ setToIDR(item.selling_price) }}</p>
               </div>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-page>
</template>
