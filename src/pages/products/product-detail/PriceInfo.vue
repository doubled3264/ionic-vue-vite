<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { computed } from 'vue'
import CustomInfo from '../../../components/custom/Info.vue'
import { setToIDR } from '../../../utils/formater'

interface IProps {
  purchasePrice: string
  sellingPrice: string
  resellerPrice: string
}

const props = defineProps<IProps>()

const getPurchasePrice = computed(() => {
  return props.purchasePrice == null
    ? '-'
    : `Rp. ${setToIDR(Number(props.purchasePrice))}`
})
const getResellerPrice = computed(() => {
  return props.resellerPrice == null
    ? '-'
    : `Rp. ${setToIDR(Number(props.resellerPrice))}`
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
        <custom-info label="harga jual" :item="`Rp. ${setToIDR(Number(sellingPrice))}`"></custom-info>
      </ion-item>
      <ion-item>
        <custom-info label="harga reseller" :item="getResellerPrice"
          :is-secret="getResellerPrice != '-' ? true : false" />
      </ion-item>
    </ion-list>
  </div>
</template>
