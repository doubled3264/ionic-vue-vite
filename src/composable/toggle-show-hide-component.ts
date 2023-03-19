import { ref, toRef } from 'vue'
type State = {
   isOpen: boolean
   event: Event | undefined
}

export const useToggleComponent = () => {
   const state = ref<State>({
      isOpen: false,
      event: undefined,
   })

   const toggling = (ev: Event) => {
      state.value.isOpen = !state.value.isOpen
      state.value.event = ev
   }

   return {
      toggling,
      isOpen: toRef(state.value, 'isOpen'),
      event: toRef(state.value, 'event'),
   }
}
