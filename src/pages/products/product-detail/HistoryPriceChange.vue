<script setup lang="ts">
import CustomCard from '../../../components/custom/Card.vue'
import CustomIcon from '../../../components/custom/Icon.vue'
import CustomButton from '../../../components/custom/Button.vue'
import { arrowRight } from '../../../utils/svg'
import { onMounted, watch } from 'vue'
import terminal from 'virtual:terminal'
import { onIonViewDidEnter } from '@ionic/vue'

const props = defineProps({
   isShow: Boolean,
})

watch(
   () => props.isShow,
   (newValue) => {
      terminal.log(`isShow: ${props.isShow}`)
   }
)
</script>
<template>
   <div class="history-price-change" v-show="isShow">
      <custom-card>
         <template #cardTitle>
            <h3>harga modal</h3>
         </template>
         <template #cardNav>
            <div
               ref="purchasePriceListCardElement"
               class="custom-card__nav-icon"
               @click=""
            >
               <custom-icon :svg-icon="arrowRight" width="18" />
            </div>
         </template>
         <template #cardBody></template>
      </custom-card>

      <custom-card>
         <template #cardTitle>
            <h3>harga jual</h3>
         </template>
         <template #cardNav>
            <div
               ref="purchasePriceListCardElement"
               class="custom-card__nav-icon"
               @click=""
            >
               <custom-icon :svg-icon="arrowRight" width="18" />
            </div>
         </template>
         <template #cardBody></template>
      </custom-card>

      <custom-card>
         <template #cardTitle>
            <h3>harga reseller</h3>
         </template>
         <template #cardNav>
            <div
               ref="purchasePriceListCardElement"
               class="custom-card__nav-icon"
               @click=""
            >
               <custom-icon :svg-icon="arrowRight" width="18" />
            </div>
         </template>
         <template #cardBody></template>
      </custom-card>
   </div>
</template>
