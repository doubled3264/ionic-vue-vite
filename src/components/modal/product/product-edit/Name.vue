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
   id: '',
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
         await editProduct()
      }
   })
}

async function editProduct() {
   const admin = store.getters['auth/admin']
   const productData = {
      id: props.productId,
      item: { admin: admin.id, name: product.value.name },
   }
   await store
      .dispatch('product/editBasicInfo', productData)
      .then(() => {
         Swal.fire(sweetalertDialog.success('Produk berhasil diubah.'))
         pageNavigation.goToPage(`/products/${props.productId}`)
         emit('hideModal')
      })
      .catch((err) => {
         Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
      })
}
watch(
   () => props.isOpen,
   () => {
      store.dispatch('product/getOne', props.productId)
      product.value = store.getters['product/getSingleDataOfProduct']('name')
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
                     <custom-input
                        label="nama produk"
                        v-model:input-value="product.name"
                        :error-state="errorState.name"
                        @validate-input="validateInput('name')"
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
