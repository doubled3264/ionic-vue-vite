<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { back } from '../../../../utils/svg'
import Swal from 'sweetalert2'
import * as sweetalertDialog from '../../../../utils/sweetalert-dialog'
import CustomIcon from '../../../custom/Icon.vue'
import CustomInput from '../../../custom/Input.vue'
import * as productSchema from '../../../../utils/validation/product.schema'
import * as pageNavigation from '../../../../utils/page-navigation'
import { ErrorStateObj } from '../../../../utils/interface/error-state'
import { includes } from 'lodash'

interface IProps {
  isOpen: boolean
  productId: string
  purpose: string | 'add' | 'edit' | 'up'
}

interface ErrorState {
  price: ErrorStateObj
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store = useStore()
const title = ref('')
const purchasePrice = ref({
  id: '',
  price: '',
})

const errorState = ref({
  price: {
    isError: true,
    message: '',
  },
})

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

function setTitle() {
  if (props.purpose == 'add') {
    title.value = 'masukan harga modal'
  } else if (props.purpose == 'edit') {
    title.value = 'ubah harga modal'
  } else if (props.purpose == 'up') {
    title.value = 'naikan harga modal'
  }
}

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
  await productSchema.modalEdit.purchase_price
    .validateAt(field, purchasePrice.value)
    .then(() => {
      errorState.value[field as keyof ErrorState].isError = false
    })
    .catch((err) => {
      errorState.value[field as keyof ErrorState].isError = true
      errorState.value[field as keyof ErrorState].message = err.message
    })
}

function validateForm() {
  /* validate input component */
  for (const item in errorState.value) {
    /* validate input component */
    if (errorState.value[item as keyof ErrorState].isError) {
      Swal.fire(sweetalertDialog.error('terdapat form yang belum terisi'))
      return ''
    }
  }
  Swal.fire(
    sweetalertDialog.confirm('Perubahan akan disimpan.', 'Ya simpan.')
  ).then(async (result) => {
    if (result.isConfirmed) {
      if (props.purpose == 'up') {
        await savePrice()
      } else if (includes(['add', 'edit'], props.purpose)) {
        await updatePrice()
      }
    }
  })
}

async function savePrice() {
  const admin = store.getters['auth/admin']
  const priceData = {
    admin: admin.id,
    product_id: props.productId,
    purchase_price: purchasePrice.value.price,
  }
  await store
    .dispatch('product/addPurchasePrice', priceData)
    .then(() => {
      Swal.fire(sweetalertDialog.success('Harga modal berhasil ditambahan.'))
      pageNavigation.goToPage(`/products/${props.productId}`)
      emit('hideModal')
    })
    .catch((err) => {
      Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
    })
}

async function updatePrice() {
  const admin = store.getters['auth/admin']
  const priceData = {
    admin: admin.id,
    id: purchasePrice.value.id,
    purchase_price: purchasePrice.value.price,
  }
  await store
    .dispatch('product/editPurchasePrice', priceData)
    .then(() => {
      Swal.fire(sweetalertDialog.success('Harga modal berhasil diubah.'))
      pageNavigation.goToPage(`/products/${props.productId}`)
      emit('hideModal')
    })
    .catch((err) => {
      Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
    })
}
watch(
  () => props.isOpen,
  async () => {
    await store.dispatch('product/getOne', props.productId)
    purchasePrice.value =
      store.getters['product/getSinglePriceDataOfProduct']('purchase_price')
    validateInput('price')
    setTitle()
  }
)
</script>
<template>
  <ion-modal :is-open="isOpen" class="modal-edit-product name" @didDismiss="hideModal">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="hideModal">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="inner">
        <ion-grid>
          <ion-row>
            <ion-col>
              <custom-input label="harga modal" input-mode="numeric" v-model:input-value="purchasePrice.price"
                :error-state="errorState.price" @validate-input="validateInput('price')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="mt-6">
              <ion-button expand="block" @click="validateForm">Simpan</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-modal>
</template>
