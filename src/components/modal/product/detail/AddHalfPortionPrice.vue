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
  IonButtons,
  IonButton,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { computed, ref, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import { ErrorStateObj } from '../../../../utils/interface/error-state'
import Swal from 'sweetalert2'
import * as formValidation from '../../../../utils/validation'
import * as productDetail from '../../../../utils/validation/product/detail'
import * as sweetalertDialog from '../../../../utils/sweetalert-dialog'
import { back } from '../../../../utils/svg'
import CustomIcon from '../../../custom/Icon.vue'
import CustomInput from '../../../custom/Input.vue'
import CustomButton from '../../../custom/Button.vue'

interface IProps {
  isOpen: boolean
  productId: string
}

interface ErrorState {
  portion: ErrorStateObj
  selling_price: ErrorStateObj
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store = useStore()
const product = ref({
  name: '',
  portion_type: '',
})
const productForm = ref({
  portion_type: '',
  portion: '',
  selling_price: '',
})
const errorState = ref<ErrorState>({
  portion: {
    isError: true,
    message: '',
  },
  selling_price: {
    isError: true,
    message: '',
  },
})

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

async function fetchProduct() {
  await store.dispatch('product/getOne', props.productId)
  product.value = store.getters['product/getProductDetail']
  productForm.value.portion_type = product.value.portion_type
}

const getPortionType = computed(() => {
  return product.value.portion_type == 'satuan' ? 'ukuran' : 'berat *' // satuan | gram
})

const getInputMode = computed(() => {
  return product.value.portion_type == 'satuan' ? 'text' : 'numeric' // satuan | gram
})

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
  await formValidation.validateInput(
    toRef(productForm, 'value'),
    toRef(errorState, 'value'),
    productDetail.addPriceHalfPortion,
    field
  )
}

/**
 * validate form before saving
 */
async function validateForm() {
  /* validate input component */
  for (const item in errorState.value) {
    /* validate input component */
    if (errorState.value[item as keyof ErrorState].isError) {
      Swal.fire(sweetalertDialog.error('terdapat form yang belum terisi'))
      return ''
    }
  }
  Swal.fire(
    sweetalertDialog.confirm('Harga akan disimpan.', 'Ya simpan.')
  ).then(async (result) => {
    if (result.isConfirmed) {
      //await saveNewProduct()
      terminal.log('process save..')
    }
  })
}
watch(
  () => props.isOpen,
  async () => {
    await fetchProduct()
  }
)
</script>
<template>
  <ion-modal :is-open="isOpen" class="modal-product-half-portion-price-add" @didDismiss="hideModal">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>tambah harga lain</ion-title>
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
              <custom-input label="nama barang" v-model:input-value="product.name" disabled />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input :label="getPortionType" :input-mode="getInputMode" v-model:input-value="productForm.portion"
                :error-state="errorState.portion" @validate-input="validateInput('portion')" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input label="harga jual" input-mode="numeric" v-model:input-value="productForm.selling_price"
                :error-state="errorState.selling_price" @validate-input="validateInput('selling_price')" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="mt-6 px-3">
              <custom-button text="simpan" color="lapis-lazuli" block @click="validateForm" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-modal>
</template>
