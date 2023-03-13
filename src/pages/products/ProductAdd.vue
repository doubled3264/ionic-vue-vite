<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRadio,
  IonRadioGroup,
  onIonViewWillEnter,
  useBackButton,
} from '@ionic/vue'
import CustomInput from '../../components/custom/Input.vue'
import CustomRadio from '../../components/custom/Radio.vue'
import CustomIcon from '../../components/custom/Icon.vue'
import { back, phoneBook, plus } from '../../utils/svg'
import * as pageNavigation from '../../utils/page-navigation'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import * as productSchema from '../../utils/validation/product'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'

/* interface IProduct { */
/*   name: string */
/*   purchase_price: number */
/*   selling_price: number */
/*   reseller_price: number */
/* } */

interface IErrorState {
  name: {
    isError: boolean
    message: string
  }
  /* purchase_price: { */
  /*    isError: boolean */
  /*    message: string */
  /* } */
  portion_type: {
    isError: boolean
    message: string
  }
  selling_price: {
    isError: boolean
    message: string
  }
  /* reseller_price: { */
  /*    isError: boolean */
  /*    message: string */
  /* } */
  weight: {
    isError: boolean
    message: string
  }
}

const store = useStore()
const router = useRouter()
const pageName = 'product add'
const admin: any = ref()
const product = ref({
  name: '',
  /* purchase_price: '', */
  portion_type: 'satuan',
  selling_price: '',
  /* reseller_price: '', */
  weight: '',
})
const errorState = ref<IErrorState>({
  name: {
    isError: true,
    message: '',
  },
  /* purchase_price: { */
  /*    isError: false, */
  /*    message: '', */
  /* }, */
  portion_type: {
    isError: false,
    message: '',
  },
  selling_price: {
    isError: true,
    message: '',
  },
  /* reseller_price: { */
  /*    isError: false, */
  /*    message: '', */
  /* }, */
  weight: {
    isError: false,
    message: '',
  },
})
useBackButton(9, (processNextHandler) => {
  if (pageNavigation.getActive() == pageName) {
    navigate('/products')
  } else {
    processNextHandler()
  }
})

onIonViewWillEnter(() => {
  pageNavigation.setToActive(pageName)
  getAdminInfo()
})

function getAdminInfo() {
  admin.value = store.getters['auth/admin']
}

function navigate(path: string) {
  router.push({ path: path })
}
const toggleWeightInput = computed(() => {
  validateInput('weight')
  if (product.value.portion_type == 'satuan') {
    product.value.weight = ''
    return false
  } else {
    return true
  }
})

/**
 * validate input when event triggered
 * @param {String} field
 */
async function validateInput(field: string) {
  await productSchema.addNew
    .validateAt(field, product.value)
    .then(() => {
      errorState.value[field as keyof IErrorState].isError = false
    })
    .catch((err) => {
      errorState.value[field as keyof IErrorState].isError = true
      errorState.value[field as keyof IErrorState].message = err.message
    })
  console.log(errorState.value)
}

/**
 * validate form before saving
 */
async function validateForm() {
  /* validate input component */
  for (const item in errorState.value) {
    /* validate input component */
    if (errorState.value[item as keyof IErrorState].isError) {
      Swal.fire(
        sweetalertDialog.error(
          'terdapat form yang belum terisi'
        ) as SweetAlertOptions
      )
      return ''
    }
  }
  Swal.fire(
    sweetalertDialog.confirm('Produk akan disimpan.', 'Ya simpan.')
  ).then(async (result) => {
    if (result.isConfirmed) {
      await saveNewProduct()
    }
  })
}

async function saveNewProduct() {
  const productData = {
    admin: admin.value.id,
    ...product.value,
  }

  store
    .dispatch('product/addNew', productData)
    .then(() => {
      Swal.fire(sweetalertDialog.success('Produk berhasil disimpan.'))
      navigate('/products')
    })
    .catch((err) => {
      terminal.log(err.response)
      Swal.fire(sweetalertDialog.error(err.response.data.errorMessage))
    })
}
</script>
<template>
  <ion-page class="product-add-page">
    <ion-header>
      <ion-toolbar mode="ios">
        <ion-title>tambah daftar barang</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="navigate('/products')">
            <custom-icon :svg-icon="back" width="26"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="product-add-page__inner">
        <ion-grid>
          <ion-row>
            <ion-col>
              <custom-input label="nama barang" v-model:input-value="product.name" :error-state="errorState.name"
                @validate-input="validateInput('name')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-radio label="jenis porsi" :items="['satuan', 'gram']"
                v-model:input-value="product.portion_type"></custom-radio>
            </ion-col>
          </ion-row>
          <ion-row v-show="toggleWeightInput">
            <ion-col>
              <custom-input label="berat" input-mode="numeric" v-model:input-value="product.weight"
                :error-state="errorState.weight" @validate-input="validateInput('weight')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <custom-input label="harga jual" input-mode="numeric" v-model:input-value="product.selling_price"
                :error-state="errorState.selling_price" @validate-input="validateInput('selling_price')"></custom-input>
            </ion-col>
          </ion-row>
          <ion-row class="form-helper">
            <ion-col>
              <p>* boleh dikosongkan.</p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button expand="block" @click="validateForm">Simpan</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>
