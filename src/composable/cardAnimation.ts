import { createAnimation } from '@ionic/vue'
import { ref, ToRef } from 'vue'

export const useCardAnimation = (elementRef: ToRef<any>) => {
  const card = ref({
    isOpen: false,
  })

  const toggleCard = () => {
    card.value.isOpen = !card.value.isOpen
  }
  const cardAnimation = createAnimation()
    .direction(card.value.isOpen ? 'normal' : 'reverse')
    .addElement(elementRef.value)
    .duration(200)
    .keyframes([
      { offset: 0, transform: 'rotate(0deg)' },
      { offset: 1, transform: 'rotate(90deg)' },
    ])

  return {
    toggleCard,
    cardAnimation,
    state: card.value,
    // cardAnimation,
  }
}
