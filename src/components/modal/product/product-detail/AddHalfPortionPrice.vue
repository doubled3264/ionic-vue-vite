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
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ErrorStateObj } from '../../../../utils/interface/error-state'
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
}

const getPortionType = computed(() => {
  return product.value.portion_type == 'satuan' ? 'ukuran' : 'berat'
})

watch(
  () => props.isOpen,
  async () => {
    terminal.log(props.productId)
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
              <custom-input :label="getPortionType" v-model:input-value="productForm.portion"
                :error-state="errorState.portion" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input label="harga jual" input-mode="numeric" v-model:input-value="productForm.selling_price"
                :error-state="errorState.selling_price" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="mt-6 px-3">
              <custom-button text="simpan" color="lapis-lazuli" block @click="" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-modal>
</template>
