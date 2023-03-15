<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { back } from '../../../../utils/svg'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import * as sweetalertDialog from '../../../../utils/sweetalert-dialog'
import CustomIcon from '../../../custom/Icon.vue'
import CustomInput from '../../../custom/Input.vue'
import CustomRadio from '../../../custom/Radio-v2.vue'
import CustomButton from '../../../custom/Button.vue'
import { useRouter } from 'vue-router'

interface IProps {
  isOpen: boolean
  productId: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store = useStore()
const router = useRouter()
const modal = ref({
  categoryOptions: false,
})
const categoryListItem = ref([
  'umpan',
  'reel',
  'joran',
  'mata kail',
  'pelampung',
])
const product = ref({
  id: '',
  category: '',
})

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

function toggleModalCategoryOptions() {
  modal.value.categoryOptions = !modal.value.categoryOptions
}

function navigate(path: string) {
  router.push({ path: path })
}

function validateForm() {
  Swal.fire(
    sweetalertDialog.confirm('Perubahan akan disimpan.', 'Ya simpan.')
  ).then(async (result) => {
    if (result.isConfirmed) {
      await editProduct()
    }
  })
}

async function editProduct() {
  const admin = store.getters['auth/admin']
  const productData = {
    id: props.productId,
    item: { admin: admin.id, category: product.value.category },
  }
  await store
    .dispatch('product/editBasicInfo', productData)
    .then(() => {
      Swal.fire(sweetalertDialog.success('Produk berhasil diubah.'))
      navigate(`/products/${props.productId}`)
      emit('hideModal')
    })
    .catch((err) => {
      terminal.log(err.response)
      Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
    })
}

watch(
  () => props.isOpen,
  () => {
    store.dispatch('product/getOne', props.productId)
    product.value = store.getters['product/getCategory']
    terminal.log(product.value)
  }
)
</script>
<template>
  <ion-modal :is-open="isOpen" class="modal-edit-product category">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>ubah kategori produk</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="hideModal">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="inner">
        <div class="form">
          <custom-input label="kategori" v-model:input-value="product.category" disabled />
          <div class="button-nav">
            <custom-button text="pilih kategori" color="lapis-lazuli" @click="toggleModalCategoryOptions" />
            <custom-button text="simpan" color="lapis-lazuli" @click="validateForm" />
          </div>
        </div>
      </div>
      <custom-radio :is-open="modal.categoryOptions" :items="categoryListItem" :initial-breakpoint="0.5"
        v-model:input-value="product.category" @hide-modal="toggleModalCategoryOptions" />
    </ion-content>
  </ion-modal>
</template>
