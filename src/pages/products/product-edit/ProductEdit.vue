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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as sweetalertDialog from '../../../utils/sweetalert-dialog'
import * as pageNavigation from '../../../utils/page-navigation'
import CustomIcon from '../../../components/custom/Icon.vue'
import { back, pencil } from '../../../utils/svg'
import CustomInfo from '../../../components/custom/Info.vue'
import terminal from 'virtual:terminal'
import ModalEditName from '../../../components/modal/product/product-edit/Name.vue'

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

async function fetchProduct() {
  await store.dispatch('product/getOne', route.params.id)
  product.value = store.getters['product/getProductDetail']
}

function navigate(path: string) {
  router.push({ path: path })
}
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
            <ion-item class="product-info__item">
              <custom-info label="kategori" :item="product.category" />
              <custom-icon :svg-icon="pencil" />
            </ion-item>
          </ion-list>
        </div>
        <div class="product-price">
          <h3>harga produk</h3>
        </div>
      </div>
      <modal-edit-name :is-open="modal.editName" @hide-modal="toggleModalEditName" :product-id="productId" />
    </ion-content>
  </ion-page>
</template>
