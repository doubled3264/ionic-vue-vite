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
import { useModal } from '../../../composable/modal'
import * as pageNavigation from '../../../utils/page-navigation'
import CustomIcon from '../../../components/custom/Icon.vue'
import { back, pencil } from '../../../utils/svg'
import CustomInfo from '../../../components/custom/Info.vue'
import ModalEditName from '../../../components/modal/product/product-edit/Name.vue'
import ModalEditCategory from '../../../components/modal/product/product-edit/Category.vue'
import ModalEditPurchasePrice from '../../../components/modal/product/product-edit/PurchasePrice.vue'
import ModalEditSellingPrice from '../../../components/modal/product/product-edit/SellingPrice.vue'
import ModalEditResellerPrice from '../../../components/modal/product/product-edit/ResellerPrice.vue'
import ModalEditPriceOptions from '../../../components/modal/product/product-edit/PriceEditOptions.vue'
import { setToIDR } from '../../../utils/formater'
import terminal from 'virtual:terminal'

interface IAdmin {
   id: string
   nama: string
   role: string
}

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
const { modalProductEdit, toggleModal } = useModal()
const productId = ref()
const admin: IAdmin | any = ref()
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
   portion_type: '',
   portion: 0,
   purchase_price: 0,
   selling_price: 0,
   reseller_price: 0,
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
   productId.value = route.params.id
   getAdminInfo()
   fetchProduct()
})

function getAdminInfo() {
   admin.value = store.getters['auth/admin']
}
function setPropsForModalPriceEditOptions(
   modalPurposeObject: ToRef<TModalPurposeItem[]>,
   productPrice: number
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
   return product.value.purchase_price == null
      ? '-'
      : setToIDR(product.value.purchase_price)
})
const getResellerPrice = computed(() => {
   return product.value.reseller_price == null
      ? '-'
      : setToIDR(product.value.reseller_price)
})

function actionPurchasePriceEditOptions(actionName: string) {
   modalPurpose.value.purchase_price.itemActive = actionName
   toggleModal('productEdit', 'editPurchasePrice')
}
function actionSellingPriceEditOptions(actionName: string) {
   modalPurpose.value.selling_price.itemActive = actionName
   toggleModal('productEdit', 'editSellingPrice')
  }

function actionResellerPriceEditOptions(actionName: string) {
   modalPurpose.value.reseller_price.itemActive = actionName
   toggleModal('productEdit', 'editResellerPrice')
}

watch(modalProductEdit, (newValue) => {
   if (newValue.purchasePriceEditOptions) {
      setPropsForModalPriceEditOptions(
         toRef(modalPurpose.value.purchase_price, 'items'),
         product.value.purchase_price
      )
   } else if (newValue.resellerPriceEditOptions) {
      setPropsForModalPriceEditOptions(
         toRef(modalPurpose.value.reseller_price, 'items'),
         product.value.reseller_price
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
                  <ion-item @click="toggleModal('productEdit', 'editName')">
                     <custom-info label="nama produk" :item="product.name" />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item @click="toggleModal('productEdit', 'editCategory')">
                     <custom-info label="kategori" :item="product.category" />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
               </ion-list>
            </div>
            <div class="product-price">
               <h3>harga produk</h3>
               <ion-list lines="none">
                  <ion-item
                     @click="
                        toggleModal('productEdit', 'purchasePriceEditOptions')
                     "
                  >
                     <custom-info
                        label="harga modal"
                        :item="`Rp. ${getPurchasePrice}`"
                     />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item
                     @click="
                        toggleModal('productEdit', 'sellingPriceEditOptions')
                     "
                  >
                     <custom-info
                        label="harga jual"
                        :item="`Rp. ${setToIDR(product.selling_price)}`"
                     />
                     <custom-icon :svg-icon="pencil" />
                  </ion-item>
                  <ion-item
                     @click="
                        toggleModal('productEdit', 'resellerPriceEditOptions')
                     "
                  >
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
            :is-open="modalProductEdit.editName"
            @hide-modal="toggleModal('productEdit', 'editName')"
            :product-id="productId"
         />
         <modal-edit-category
            :is-open="modalProductEdit.editCategory"
            @hide-modal="toggleModal('productEdit', 'editCategory')"
            :product-id="productId"
         />
         <modal-edit-purchase-price
            :is-open="modalProductEdit.editPurchasePrice"
            @hide-modal="toggleModal('productEdit', 'editPurchasePrice')"
            :product-id="productId"
            :purpose="modalPurpose.purchase_price.itemActive"
         />
         <modal-edit-selling-price
            :is-open="modalProductEdit.editSellingPrice"
            @hide-modal="toggleModal('productEdit', 'editSellingPrice')"
            :product-id="productId"
            :purpose="modalPurpose.selling_price.itemActive"
         />
         <modal-edit-reseller-price
            :is-open="modalProductEdit.editResellerPrice"
            @hide-modal="toggleModal('productEdit', 'editResellerPrice')"
            :product-id="productId"
            :purpose="modalPurpose.reseller_price.itemActive"
         />
         <modal-edit-price-options
            :is-open="modalProductEdit.purchasePriceEditOptions"
            @hide-modal="toggleModal('productEdit', 'purchasePriceEditOptions')"
            :items="modalPurpose.purchase_price.items"
            @action="actionPurchasePriceEditOptions"
         />
         <modal-edit-price-options
            :is-open="modalProductEdit.sellingPriceEditOptions"
            @hide-modal="toggleModal('productEdit', 'sellingPriceEditOptions')"
            :items="modalPurpose.selling_price.items"
            @action="actionSellingPriceEditOptions"
         />
         <modal-edit-price-options
            :is-open="modalProductEdit.resellerPriceEditOptions"
            @hide-modal="toggleModal('productEdit', 'resellerPriceEditOptions')"
            :items="modalPurpose.reseller_price.items"
            @action="actionResellerPriceEditOptions"
         />
      </ion-content>
   </ion-page>
</template>
