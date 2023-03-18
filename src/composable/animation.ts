import { createAnimation } from '@ionic/vue'
import { nextTick, ToRef } from 'vue'

export const useProductPriceInfoAnimation = () => {
   const purchasePriceList = async (
      elementRef: ToRef<any>,
      isOpen: boolean
   ) => {
      const direction = isOpen ? 'normal' : 'reverse'
      return createAnimation()
         .direction(direction)
         .addElement(elementRef.value)
         .duration(200)
         .keyframes([
            { offset: 0, transform: 'rotate(0deg)' },
            { offset: 1, transform: 'rotate(90deg)' },
         ])
   }

   return {
      purchasePriceList,
   }
}
// const rotateNavIcon = createAnimation().addElement()
