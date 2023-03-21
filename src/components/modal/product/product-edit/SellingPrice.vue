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

interface IProps {
   isOpen: boolean
   productId: string
   purpose: string | 'edit' | 'up'
}

interface ErrorState {
   price: ErrorStateObj
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store = useStore()
const title = ref('')
const sellingPrice = ref({
   id: '',
   price: '',
   portion_id: '',
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
   if (props.purpose == 'edit') {
      title.value = 'ubah harga jual'
   } else if (props.purpose == 'up') {
      title.value = 'naikan harga jual'
   }
}

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
   await productSchema.modalEdit.selling_price
      .validateAt(field, sellingPrice.value)
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
         } else if (props.purpose == 'edit') {
            await updatePrice()
         }
      }
   })
}

async function savePrice() {
   const admin = store.getters['auth/admin']
   const priceData = {
      admin: admin.id,
      portion_id: sellingPrice.value.portion_id,
      selling_price: sellingPrice.value.price,
   }
   await store
      .dispatch('product/addSellingPrice', priceData)
      .then(() => {
         Swal.fire(sweetalertDialog.success('Harga jual berhasil ditambahkan.'))
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
      id: sellingPrice.value.id,
      selling_price: sellingPrice.value.price,
   }
   await store
      .dispatch('product/editSellingPrice', priceData)
      .then(() => {
         Swal.fire(sweetalertDialog.success('Harga jual berhasil diubah.'))
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
      sellingPrice.value =
         store.getters['product/getSinglePriceDataOfProduct']('selling_price')
      terminal.log(sellingPrice.value)
      validateInput('price')
      setTitle()
   }
)
</script>
<template>
   <ion-modal
      :is-open="isOpen"
      class="modal-edit-product name"
      @didDismiss="hideModal"
   >
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
                     <custom-input
                        label="harga jual"
                        input-mode="numeric"
                        v-model:input-value="sellingPrice.price"
                        :error-state="errorState.price"
                        @validate-input="validateInput('price')"
                     ></custom-input>
                  </ion-col>
               </ion-row>
               <ion-row>
                  <ion-col class="mt-6">
                     <ion-button expand="block" @click="validateForm"
                        >Simpan</ion-button
                     >
                  </ion-col>
               </ion-row>
            </ion-grid>
         </div>
      </ion-content>
   </ion-modal>
</template>
