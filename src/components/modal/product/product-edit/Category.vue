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
import { ref, watch } from 'vue';
import {useStore}from'vuex'
import { back } from '../../../../utils/svg'
import CustomIcon from '../../../custom/Icon.vue'


interface IProps {
   isOpen: boolean
   productId: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal'])
const store=useStore()
const product = ref({
   id: '',
   category:''
})

function hideModal() {
   if (props.isOpen) {
      emit('hideModal')
   }
}

watch(
   () => props.isOpen,
   () => {
      store.dispatch('product/getOne', props.productId)
      product.value = store.getters['product/getName']
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

      </ion-content>
   </ion-modal>
</template>
