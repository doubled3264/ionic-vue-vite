<script setup lang="ts">
import {
   IonPage,
   IonContent,
   IonGrid,
   IonRow,
   IonCol,
   IonLabel,
   IonButton,
   onIonViewWillEnter,
} from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import { terminal } from 'virtual:terminal'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ErrorStateObj } from '../utils/interface/error-state'
import { LoginCredentials } from '../utils/interface/auth'
import * as authSchema from '../utils/validation/schema/auth'
import * as sweetalertDialog from '../utils/sweetalert-dialog'
import Swal from 'sweetalert2'
import CustomPageReload from '../components/custom/PageReload.vue'
import CustomInput from '../components/custom/Input.vue'
import CustomButton from '../components/custom/Button.vue'

interface ErrorState {
   email: ErrorStateObj
   password: ErrorStateObj
}

const store = useStore()
const router = useRouter()
const credentials = ref<LoginCredentials>({
   email: '',
   password: '',
})
const errorState = ref<ErrorState>({
   email: {
      isError: true,
      message: '',
   },
   password: {
      isError: true,
      message: '',
   },
})
onIonViewWillEnter(async () => {})

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
   await authSchema.login
      .validateAt(field, credentials.value)
      .then(() => {
         errorState.value[field as keyof ErrorState].isError = false
      })
      .catch((err) => {
         errorState.value[field as keyof ErrorState].isError = true
         errorState.value[field as keyof ErrorState].message = err.message
      })
}
/**
 * validate form before login
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
   signInAction()
}
async function signInAction() {
   await store
      .dispatch('auth/login', { ...credentials.value })
      .then(() => {
         router.push({ path: '/home' })
      })
      .catch((err) => {
         const statusCode = err.response.status
         if (statusCode == 404) {
            Swal.fire(sweetalertDialog.error('Akun tidak ditemukan.'))
         } else if (statusCode == 401) {
            Swal.fire(
               sweetalertDialog.error('Password yang anda masukan salah.')
            )
         }
      })
}
</script>
<template>
   <ion-page class="login-page">
      <custom-page-reload />
      <ion-content>
         <div class="login-page__inner">
            <h3>login terlebih dahulu.</h3>
            <div class="login-page__form">
               <ion-grid>
                  <ion-row>
                     <ion-col>
                        <custom-input
                           label="Email"
                           input-mode="email"
                           v-model:input-value="credentials.email"
                           :error-state="errorState.email"
                           @validate-input="validateInput('email')"
                        ></custom-input>
                     </ion-col>
                  </ion-row>
                  <ion-row>
                     <ion-col>
                        <custom-input
                           label="Password"
                           type="password"
                           use-for-password
                           v-model:input-value="credentials.password"
                           :error-state="errorState.password"
                           @validate-input="validateInput('password')"
                        ></custom-input>
                     </ion-col>
                  </ion-row>
                  <ion-row>
                     <ion-col>
                        <custom-button
                           text="masuk"
                           color="lapis-lazuli"
                           block
                           @click="validateForm"
                        />
                     </ion-col>
                  </ion-row>
               </ion-grid>
            </div>
         </div>
      </ion-content>
   </ion-page>
</template>
