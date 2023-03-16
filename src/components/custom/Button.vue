<script setup lang="ts">
import type, { PropType } from 'vue'
import terminal from 'virtual:terminal'
import { computed } from 'vue'
import CustomIcon from './Icon.vue'

type TSize = 'xs' | 'sm' | 'md' | 'lg'
type TVariant = 'solid' | 'outline' | 'link'
type TColor =
   | 'primary'
   | 'secondary'
   | 'success'
   | 'info'
   | 'danger'
   | 'warning'
   | 'lapis-lazuli'

/* interface IProps { */
/*   text: string */
/*   size?: TSize */
/*   variant?: TVariant */
/*   block?: boolean */
/*   color?: string */
/*   startIcon?: string */
/*   endIcon?: string */
/*   iconWidth?: string */
/* } */

const props = defineProps({
   text: {
      type: String,
   },
   size: {
      type: String as PropType<TSize>,
      default: 'md',
      validator(value: TSize) {
         return ['xs', 'sm', 'md', 'lg'].includes(value)
      },
   },
   variant: {
      type: String as PropType<TVariant>,
      default: 'solid',
      validator(value: TVariant) {
         return ['solid', 'outline', 'link'].includes(value)
      },
   },
   block: {
      type: Boolean,
      default: false,
   },
   color: {
      type: String as PropType<TColor>,
      default: 'secondary',
   },
   startIcon: {
      type: String,
   },
   endIcon: {
      type: String,
   },
   iconWidth: {
      type: String,
   },
})

const emit = defineEmits(['click'])

const getSize = computed(() => {
   return `btn btn--${props.size}`
})
const getVariantAndColor = computed(() => {
   if (props.variant === 'solid') {
      return `btn--${props.color}`
      /* return `btn--secondary` */
   } else if (props.variant === 'outline') {
      return `btn__outline--${props.color}`
   } else if (props.variant === 'link') {
      return `btn__link--${props.color}`
   }
})
function buttonClick() {
   emit('click')
}
</script>
<template>
   <button
      type="button"
      @click="buttonClick"
      :class="[getSize, getVariantAndColor, { btn__block: block }]"
   >
      <span v-if="startIcon" class="btn__start-icon">
         <CustomIcon :svgIcon="startIcon" :width="iconWidth" />
      </span>
      {{ text }}
      <span v-if="endIcon" class="btn__end-icon">
         <CustomIcon :svgIcon="endIcon" :width="iconWidth" />
      </span>
   </button>
</template>
