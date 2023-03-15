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
  IonLabel,
  onIonViewWillEnter,
  useBackButton,
} from '@ionic/vue'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as sweetalertDialog from '../../../utils/sweetalert-dialog'
import * as pageNavigation from '../../../utils/page-navigation'
import CustomIcon from '../../../components/custom/Icon.vue'
import { back, pencil } from '../../../utils/svg'
import CustomInfo from '../../../components/custom/Info.vue'
import terminal from 'virtual:terminal'
import ModalEditName from '../../../components/modal/product/product-edit/Name.vue'
import ModalEditCategory from '../../../components/modal/product/product-edit/Category.vue'
import ModalEditPriceOptions from '../../../components/modal/product/product-edit/PriceEditOptions.vue'
import { setToIDR } from '../../../utils/formater'

interface IAdmin {
  id: string
  nama: string
  role: string
}

const store = useStore()
const route = useRoute()
const router = useRouter()
const productId = ref()
const admin: IAdmin | any = ref()
const pageName = 'product edit'
const modal = ref({
  editName: false,
  editCategory: false,
  purchasePriceEditOptions: false,
  sellingPriceEditOptions: false,
  resellerPriceEditOptions: false,
})
const modalPurpose = ref({
  purchase_price: [
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
  selling_price: [
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
  reseller_price: [
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
    navigate(`/products/${productId.value}`)
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

function toggleModalEditName() {
  modal.value.editName = !modal.value.editName
}

function toggleModalEditCategory() {
  modal.value.editCategory = !modal.value.editCategory
}

function toggleModalSellingPriceEditOptions() {
  modal.value.sellingPriceEditOptions = !modal.value.sellingPriceEditOptions
}

function toggleModalPurchasePriceEditOptions() {
  setPropsModalForPurchasePriceEditOptions()
  modal.value.purchasePriceEditOptions = !modal.value.purchasePriceEditOptions
}

function toggleModalResellerPriceEditOptions() {
  setPropsModalForResellerPriceEditOptions()
  modal.value.resellerPriceEditOptions = !modal.value.resellerPriceEditOptions
}

function setPropsModalForPurchasePriceEditOptions() {
  modalPurpose.value.purchase_price.forEach((item, index) => {
    if (product.value.purchase_price == null) {
      if (item.type == 'add') {
        modalPurpose.value.purchase_price[index].active = true
      } else {
        modalPurpose.value.purchase_price[index].active = false
      }
    } else {
      if (item.type == 'add') {
        modalPurpose.value.purchase_price[index].active = false
      } else {
        modalPurpose.value.purchase_price[index].active = true
      }
    }
  })
}

function setPropsModalForResellerPriceEditOptions() {
  modalPurpose.value.reseller_price.forEach((item, index) => {
    if (product.value.reseller_price == null) {
      if (item.type == 'add') {
        modalPurpose.value.reseller_price[index].active = true
      } else {
        modalPurpose.value.reseller_price[index].active = false
      }
    } else {
      if (item.type == 'add') {
        modalPurpose.value.reseller_price[index].active = false
      } else {
        modalPurpose.value.reseller_price[index].active = true
      }
    }
  })
}

async function fetchProduct() {
  await store.dispatch('product/getOne', route.params.id)
  product.value = store.getters['product/getProductDetail']
}

function navigate(path: string) {
  router.push({ path: path })
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
</script>
<template>
  <ion-page class="product-edit-page">
    <ion-header class="ion-no-border">
      <ion-toolbar mode="ios">
        <ion-title>ubah data produk</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="navigate(`/products/${productId}`)">
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
            <ion-item @click="toggleModalEditName">
              <custom-info label="nama produk" :item="product.name" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
            <ion-item @click="toggleModalEditCategory">
              <custom-info label="kategori" :item="product.category" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
          </ion-list>
        </div>
        <div class="product-price">
          <h3>harga produk</h3>
          <ion-list lines="none">
            <ion-item @click="toggleModalPurchasePriceEditOptions">
              <custom-info label="harga modal" :item="`Rp. ${getPurchasePrice}`" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
            <ion-item @click="toggleModalSellingPriceEditOptions">
              <custom-info label="harga jual" :item="`Rp. ${setToIDR(product.selling_price)}`" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
            <ion-item @click="toggleModalResellerPriceEditOptions">
              <custom-info label="harga reseller" :item="`Rp. ${getResellerPrice}`" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
          </ion-list>
        </div>
      </div>
      <modal-edit-name :is-open="modal.editName" @hide-modal="toggleModalEditName" :product-id="productId" />
      <modal-edit-category :is-open="modal.editCategory" @hide-modal="toggleModalEditCategory"
        :product-id="productId" />
      <modal-edit-price-options :is-open="modal.purchasePriceEditOptions"
        @hide-modal="toggleModalPurchasePriceEditOptions" :items="modalPurpose.purchase_price" />
      <modal-edit-price-options :is-open="modal.sellingPriceEditOptions"
        @hide-modal="toggleModalSellingPriceEditOptions" :items="modalPurpose.selling_price" />
      <modal-edit-price-options :is-open="modal.resellerPriceEditOptions"
        @hide-modal="toggleModalResellerPriceEditOptions" :items="modalPurpose.reseller_price" />
    </ion-content>
  </ion-page>
</template>
