import { ref, toRefs } from 'vue'

type IModal = {
  mainMenu: boolean
  [key: string]: boolean
}

export const useHomeModal = () => {
  const modal = ref<IModal>({
    mainMenu: false,
  })

  const toggleModal = (modalName: string) => {
    console.log('toggleModalc')
    modal.value[modalName] = !modal.value[modalName]
    console.log(modal.value.mainMenu)
  }

  return {
    toggleModal,
    modal: { ...toRefs(modal.value) },
  }
}
