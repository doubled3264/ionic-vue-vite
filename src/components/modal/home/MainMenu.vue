<script setup lang="ts">
import {
   IonModal,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonButtons,
   IonButton,
   IonLabel,
   IonList,
   IonItem,
} from '@ionic/vue'
import CustomIcon from '../../custom/Icon.vue'
import {
   order,
   cross,
   user,
   bill,
   box,
   trolley,
   logout,
} from '../../../utils/svg'
import Swal from 'sweetalert2'
import * as sweetalertDialog from '../../../utils/sweetalert-dialog'
import * as pageNavigation from '../../../utils/page-navigation'

const props = defineProps({
   isOpen: Boolean,
})
const emit = defineEmits(['closeModal'])
function closeModal() {
   if (props.isOpen) {
      emit('closeModal')
   }
}

function signOut() {
   Swal.fire(
      sweetalertDialog.confirm('Akun anda akan dikeluarkan.', 'Ya, keluar')
   ).then((result) => {
      if (result.isConfirmed) {
         localStorage.removeItem('token')
         pageNavigation.goToPage('/login')
         closeModal()
      }
   })
}
function navigate(path: string) {
   closeModal()
   pageNavigation.goToPage(path)
}
</script>
<template>
   <ion-modal
      :is-open="isOpen"
      @didDismiss="closeModal"
      class="modal-main-menu"
   >
      <ion-header class="ion-no-border">
         <ion-toolbar>
            <ion-title>menu utama</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="closeModal">
                  <custom-icon :svg-icon="cross" width="16"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="modal-main-menu__inner">
            <h3>pelanggan</h3>
            <ion-list lines="none">
               <ion-item @click="navigate('/customers')">
                  <custom-icon :svg-icon="user" width="20"></custom-icon>
                  <ion-label>daftar pelanggan</ion-label>
               </ion-item>
               <ion-item @click="navigate('/orders')">
                  <custom-icon :svg-icon="order" width="20"></custom-icon>
                  <ion-label>daftar pesanan</ion-label>
               </ion-item>
               <ion-item @click="navigate('/bills')">
                  <custom-icon :svg-icon="bill" width="20"></custom-icon>
                  <ion-label>daftar tagihan</ion-label>
               </ion-item>
            </ion-list>
            <h3>sales</h3>
            <ion-list lines="none">
               <ion-item>
                  <custom-icon :svg-icon="trolley" width="20"></custom-icon>
                  <ion-label>daftar sales</ion-label>
               </ion-item>
               <ion-item>
                  <custom-icon :svg-icon="bill" width="20"></custom-icon>
                  <ion-label>daftar tagihan</ion-label>
               </ion-item>
            </ion-list>
            <h3>barang</h3>
            <ion-list lines="none">
               <ion-item @click="navigate('/products')">
                  <custom-icon :svg-icon="box" width="20"></custom-icon>
                  <ion-label>daftar barang</ion-label>
               </ion-item>
            </ion-list>
            <h3>akun</h3>
            <ion-list lines="none">
               <ion-item @click="signOut">
                  <custom-icon :svg-icon="logout" width="20"></custom-icon>
                  <ion-label>keluar</ion-label>
               </ion-item>
            </ion-list>
         </div>
      </ion-content>
   </ion-modal>
</template>
