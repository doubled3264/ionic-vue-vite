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
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { back } from '../../../../utils/svg'
import CustomIcon from '../../../custom/Icon.vue'
import CustomInput from '../../../custom/Input.vue'
import * as productSchema from '../../../../utils/validation/product.schema'

interface IProps {
  isOpen: boolean
  productId: string
}

interface ErrorState {
  name: {
    isError: boolean
    message: string
  }
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store = useStore()
const product = ref({
  name: '',
})

const errorState = ref({
  name: {
    isError: false,
    message: '',
  },
})

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
  await productSchema.modalEdit.name
    .validateAt(field, product.value)
    .then(() => {
      errorState.value[field as keyof ErrorState].isError = false
    })
    .catch((err) => {
      errorState.value[field as keyof ErrorState].isError = true
      errorState.value[field as keyof ErrorState].message = err.message
    })
}

function validateForm() { }
watch(
  () => props.isOpen,
  () => {
    store.dispatch('product/getOne', props.productId)
    product.value = store.getters['product/getName']
  }
)
</script>
<template>
  <ion-modal :is-open="isOpen" class="modal-edit-product name">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>ubah nama produk</ion-title>
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
              <custom-input label="nama produk" v-model:input-value="product.name" :error-state="errorState.name"
                @validate-input="validateInput('name')"></custom-input>
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
