<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  onIonViewWillEnter,
  useBackButton,
  onIonViewWillLeave,
} from '@ionic/vue'
import { computed, ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { back } from '../../utils/svg'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import CustomInput from '../../components/custom/Input.vue'
import CustomRadio from '../../components/custom/Radio.vue'
import CustomIcon from '../../components/custom/Icon.vue'
import CustomRadioV from '../../components/custom/Radio-v2.vue'
import * as pageNavigation from '../../utils/page-navigation'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import * as productSchema from '../../utils/validation/product'
import * as formValidation from '../../utils/validation/index'
import terminal from 'virtual:terminal'
import { ErrorStateObj } from '../../utils/interface/error-state'
import { emptyForm } from '../../utils/object-helper'

interface ErrorState {
  name: ErrorStateObj
  category: ErrorStateObj
  portion_type: ErrorStateObj
  selling_price: ErrorStateObj
  weight: ErrorStateObj
}

const store = useStore()
const pageName = 'product add'
const admin: any = ref()
const modalRadioCategory = useToggleComponent()
const modalRadioPortionType = useToggleComponent()
const categoryListItem = ref([
  'umpan',
  'reel',
  'joran',
  'mata kail',
  'pelampung',
])
const portionTypeListItem = ref(['satuan', 'gram'])
const product = ref({
  name: '',
  category: 'umpan',
  portion_type: 'satuan',
  selling_price: '',
  weight: '',
})
const errorState = ref<ErrorState>({
  name: {
    isError: true,
    message: '',
  },
  category: {
    isError: false,
    message: '',
  },
  portion_type: {
    isError: false,
    message: '',
  },
  selling_price: {
    isError: true,
    message: '',
  },
  weight: {
    isError: false,
    message: '',
  },
})
useBackButton(9, (processNextHandler) => {
  if (pageNavigation.getActive() == pageName) {
    pageNavigation.goToPage('/products')
  } else {
    processNextHandler()
  }
})

onIonViewWillEnter(() => {
  pageNavigation.setToActive(pageName)
  getAdminInfo()
})

onIonViewWillLeave(() => {
  emptyForm(toRef(product, 'value'), ['name', 'selling_price', 'weight'])
})

function getAdminInfo() {
  admin.value = store.getters['auth/admin']
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
  await formValidation.validateInput(
    toRef(product, 'value'),
    toRef(errorState, 'value'),
    productSchema.addNew,
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
      pageNavigation.goToPage('/products')
    })
    .catch((err) => {
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
          <ion-button @click="pageNavigation.goToPage('/products')">
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
          <ion-row @click="modalRadioCategory.toggling">
            <ion-col>
              <custom-input label="kategori" v-model:input-value="product.category" disabled />
            </ion-col>
          </ion-row>

          <ion-row @click="modalRadioPortionType.toggling">
            <ion-col>
              <custom-input label="jenis porsi" v-model:input-value="product.portion_type" disabled />
            </ion-col>
          </ion-row>

          <ion-row v-show="toggleWeightInput">
            <ion-col>
              <custom-input label="berat *" input-mode="numeric" v-model:input-value="product.weight"
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
              <p>* satuan gram.</p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button expand="block" @click="validateForm">Simpan</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <custom-radio-v :is-open="modalRadioCategory.isOpen.value" :items="categoryListItem"
        v-model:input-value="product.category" @hide-modal="modalRadioCategory.toggling" />
      <custom-radio-v :is-open="modalRadioPortionType.isOpen.value" :items="portionTypeListItem"
        v-model:input-value="product.portion_type" @hide-modal="modalRadioPortionType.toggling" />
    </ion-content>
  </ion-page>
</template>
