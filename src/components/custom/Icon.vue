<script setup lang="ts">
import { ref } from 'vue'
import { home } from '../../utils/svg'
const icon = ref(null)
defineProps({
   svgIcon: {
      type: String,
      default: home,
   },
   width: {
      type: String,
      default: '24',
   },
   color: {
      type: String,
      default: 'currentColor',
   },
   strokeWidth: {
      type: String,
      default: '0.09',
   },
   isActive: {
      type: Boolean,
      default: false,
   },
})
</script>
<template>
   <svg
      :width="width"
      :height="width"
      viewBox="0 0 24 24"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M0 0h24v24H0z" fill="none" />
      <g ref="icon">
         <path
            :d="svgIcon"
            :fill="color"
            :stroke="color"
            :stroke-width="strokeWidth"
         />
      </g>
   </svg>
</template>
