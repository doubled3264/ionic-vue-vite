import terminal from 'virtual:terminal'
import { ref, toRef } from 'vue'
type StateItem = {
   type: string
   title: string
   isActive: boolean
}

type State = {
   activeSegment: string
   items: Array<StateItem>
}

export const useToggleSegment = () => {
   const state = ref<State>({
      activeSegment: '',
      items: [],
   })

   const initItem = (items: Array<StateItem>) => {
      terminal.log('initItem run.')
      state.value.items = []
      state.value.items = items
   }

   const toggling = (toActive: string) => {
      terminal.log('item toActive: ' + toActive)
      state.value?.items.forEach((item) => {
         if (item.type == toActive) {
            item.isActive = true
            state.value.activeSegment = toActive
         } else {
            item.isActive = false
         }
      })
      terminal.log(state.value.items)
      terminal.log(state.value.activeSegment)
   }

   return {
      initItem,
      toggling,
      items: toRef(state.value, 'items'),
      activeSegment: toRef(state.value, 'activeSegment'),
   }
}
