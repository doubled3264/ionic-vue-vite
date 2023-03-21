<script setup lang="ts">
import {
   IonPage,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonButtons,
   IonButton,
   IonList,
   IonItem,
   onIonViewWillEnter,
   useBackButton,
} from '@ionic/vue'
import { computed, ref, toRef, watch, ToRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import * as pageNavigation from '../../utils/page-navigation'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, pencil } from '../../utils/svg'
import CustomInfo from '../../components/custom/Info.vue'
import ModalEditName from '../../components/modal/product/product-edit/Name.vue'
import ModalEditCategory from '../../components/modal/product/product-edit/Category.vue'
import ModalEditPurchasePrice from '../../components/modal/product/product-edit/PurchasePrice.vue'
import ModalEditSellingPrice from '../../components/modal/product/product-edit/SellingPrice.vue'
import ModalEditResellerPrice from '../../components/modal/product/product-edit/ResellerPrice.vue'
import ModalEditPriceOptions from '../../components/modal/product/product-edit/PriceEditOptions.vue'
import { setToIDR } from '../../utils/formater'
import terminal from 'virtual:terminal'
import { isEmpty } from 'lodash'

type TModalPurposeItem = {
   type: string
   active: boolean
   text: string
}

type TModalPurpose = {
   [key: string]: {
      itemActive: string
      items: Array<TModalPurposeItem>
   }
}

const store = useStore()
const route = useRoute()
const pageName = 'product edit'
const modalEditName = useToggleComponent()
const modalEditCategory = useToggleComponent()
const modalPurchasePriceEditOptions = useToggleComponent()
const modalSellingPriceEditOptions = useToggleComponent()
const modalResellerPriceEditOptions = useToggleComponent()
const modalEditPurchasePrice = useToggleComponent()
const modalEditSellingPrice = useToggleComponent()
const modalEditResellerPrice = useToggleComponent()
const productId = ref('')
const modalPurpose = ref<TModalPurpose>({
   purchase_price: {
      itemActive: '',
      items: [
         {
            type: 'add',
            active: false,
            text: 'masukan harga',
         },
         {
            type: 'edit',
            active: false,
            text: 'ubah harga',
         },
         {
            type: 'up',
            active: false,
            text: 'naikan harga',
         },
      ],
   },
   selling_price: {
      itemActive: '',
      items: [
         {
            type: 'edit',
            active: true,
            text: 'ubah harga',
         },
         {
            type: 'up',
            active: true,
            text: 'naikan harga',
         },
      ],
   },
   reseller_price: {
      itemActive: '',
      items: [
         {
            type: 'add',
            active: false,
            text: 'masukan harga',
         },
         {
            type: 'edit',
            active: false,
            text: 'ubah harga',
         },
         {
            type: 'up',
            active: false,
            text: 'naikan harga',
         },
      ],
   },
})
const product = ref({
   id: '',
   name: '',
   category: '',
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
      pageNavigation.goToPage(`/products/${productId.value}`)
   } else {
      processNextHandler()
   }
})

onIonViewWillEnter(() => {
   pageNavigation.setToActive(pageName)
   productId.value = route.params.id as string
   fetchProduct()
})

function setPropsForModalPriceEditOptions(
   modalPurposeObject: ToRef<TModalPurposeItem[]>,
   productPrice: any
) {
   modalPurposeObject.value.forEach((item, index) => {
      if (productPrice == null) {
         item.type == 'add'
            ? (modalPurposeObject.value[index].active = true)
            : (modalPurposeObject.value[index].active = false)
      } else {
         item.type == 'add'
            ? (modalPurposeObject.value[index].active = false)
            : (modalPurposeObject.value[index].active = true)
      }
   })
}

async function fetchProduct() {
   await store.dispatch('product/getOne', route.params.id)
   product.value = store.getters['product/getProductDetail']
}

const getPurchasePrice = computed(() => {
   terminal.log(product.value.purchase_price)
   return product.value.purchase_price.price == null
      ? '-'
      : setToIDR(product.value.purchase_price.price)
})
const getResellerPrice = computed(() => {
   return product.value.reseller_price.price == null
      ? '-'
      : setToIDR(product.value.reseller_price.price)
})

function actionPurchasePriceEditOptions(actionName: string) {
   modalPurpose.value.purchase_price.itemActive = actionName
   modalEditPurchasePrice.toggling()
}
function actionSellingPriceEditOptions(actionName: string) {
   modalPurpose.value.selling_price.itemActive = actionName
   modalEditSellingPrice.toggling()
}

function actionResellerPriceEditOptions(actionName: string) {
   modalPurpose.value.reseller_price.itemActive = actionName
   modalEditResellerPrice.toggling()
}

watch(modalPurchasePriceEditOptions.isOpen, (newValue) => {
   if (newValue) {
      //true
      setPropsForModalPriceEditOptions(
         toRef(modalPurpose.value.purchase_price, 'items'),
         product.value.purchase_price.price
      )
   }
})

watch(modalResellerPriceEditOptions.isOpen, (newValue) => {
   if (newValue) {
      setPropsForModalPriceEditOptions(
         toRef(modalPurpose.value.reseller_price, 'items'),
         product.value.reseller_price.price
      )
   }
})
</script>
<template>
   <ion-page class="product-edit-page">
      <ion-header class="ion-no-border">
         <ion-toolbar mode="ios">
            <ion-title>ubah data produk</ion-title>
            <ion-buttons slot="start">
               <ion-button
                  @click="pageNavigation.goToPage(`/products/${productId}`)"
               >
                  <custom-icon :svg-icon="back" width="26"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="product-edit-page__inner">
            <div class="product-info">
               <h3>info produk</h3>
               <ion-list lines="none">
                  <ion-item @click="modalEditName.toggling" class="bg-red-200">
                     <custom-info label="nama produk" :item="product.name" />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item @click="modalEditCategory.toggling">
                     <custom-info label="kategori" :item="product.category" />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
               </ion-list>
            </div>
            <div class="product-price">
               <h3>harga produk</h3>
               <ion-list lines="none">
                  <ion-item @click="modalPurchasePriceEditOptions.toggling">
                     <custom-info
                        label="harga modal"
                        :item="`Rp. ${getPurchasePrice}`"
                     />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item @click="modalSellingPriceEditOptions.toggling">
                     <custom-info
                        label="harga jual"
                        :item="`Rp. ${setToIDR(product.selling_price.price)}`"
                     />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item @click="modalResellerPriceEditOptions.toggling">
                     <custom-info
                        label="harga reseller"
                        :item="`Rp. ${getResellerPrice}`"
                     />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
               </ion-list>
            </div>
         </div>
         <modal-edit-name
            :is-open="modalEditName.isOpen.value"
            @hide-modal="modalEditName.toggling"
            :product-id="productId"
         />
         <modal-edit-category
            :is-open="modalEditCategory.isOpen.value"
            @hide-modal="modalEditCategory.toggling"
            :product-id="productId"
         />
         <modal-edit-purchase-price
            :is-open="modalEditPurchasePrice.isOpen.value"
            @hide-modal="modalEditPurchasePrice.toggling"
            :product-id="productId"
            :purpose="modalPurpose.purchase_price.itemActive"
         />
         <modal-edit-selling-price
            :is-open="modalEditSellingPrice.isOpen.value"
            @hide-modal="modalEditSellingPrice.toggling"
            :product-id="productId"
            :purpose="modalPurpose.selling_price.itemActive"
         />
         <modal-edit-reseller-price
            :is-open="modalEditResellerPrice.isOpen.value"
            @hide-modal="modalEditResellerPrice.toggling"
            :product-id="productId"
            :purpose="modalPurpose.reseller_price.itemActive"
         />
         <modal-edit-price-options
            :is-open="modalPurchasePriceEditOptions.isOpen.value"
            @hide-modal="modalPurchasePriceEditOptions.toggling"
            :items="modalPurpose.purchase_price.items"
            @action="actionPurchasePriceEditOptions"
         />
         <modal-edit-price-options
            :is-open="modalSellingPriceEditOptions.isOpen.value"
            @hide-modal="modalSellingPriceEditOptions.toggling"
            :items="modalPurpose.selling_price.items"
            @action="actionSellingPriceEditOptions"
         />
         <modal-edit-price-options
            :is-open="modalResellerPriceEditOptions.isOpen.value"
            @hide-modal="modalResellerPriceEditOptions.toggling"
            :items="modalPurpose.reseller_price.items"
            @action="actionResellerPriceEditOptions"
         />
      </ion-content>
   </ion-page>
</template>
