<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { computed } from 'vue'
import CustomInfo from '../../../components/custom/Info.vue'
import { setToIDR } from '../../../utils/formater'

interface Props {
  purchasePrice: number | null
  sellingPrice: number
  resellerPrice: number | null
}

const props = defineProps<Props>()

const getPurchasePrice = computed(() => {
  return props.purchasePrice == null
    ? '-'
    : `Rp. ${setToIDR(props.purchasePrice)}`
})
const getResellerPrice = computed(() => {
  return props.resellerPrice == null
    ? '-'
    : `Rp. ${setToIDR(props.resellerPrice)}`
})
</script>
<template>
  <div class="price-info">
    <ion-list lines="none">
      <ion-item>
        <custom-info label="harga modal" :item="getPurchasePrice"
          :is-secret="getPurchasePrice != '-' ? true : false"></custom-info>
      </ion-item>
      <ion-item>
        <custom-info label="harga jual" :item="`Rp. ${setToIDR(sellingPrice!)}`"></custom-info>
      </ion-item>
      <ion-item>
        <custom-info label="harga reseller" :item="getResellerPrice"
          :is-secret="getResellerPrice != '-' ? true : false" />
      </ion-item>
    </ion-list>
  </div>
</template>
