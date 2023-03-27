<script setup lang="ts">
import CustomCard from '../../../components/custom/Card.vue'
import CustomIcon from '../../../components/custom/Icon.vue'
import { arrowRight } from '../../../utils/svg'
</script>
<template>
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
      <template #cardBody>
         <p>harga 1</p>
         <p>harga 2</p>
         <p>harga 3</p>
      </template>
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
      <template #cardBody>
         <p>harga 1</p>
         <p>harga 2</p>
         <p>harga 3</p>
      </template>
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
      <template #cardBody>
         <p>harga 1</p>
         <p>harga 2</p>
         <p>harga 3</p>
      </template>
   </custom-card>
</template>
