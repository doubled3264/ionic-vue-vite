import terminal from 'virtual:terminal'
import { ref, toRefs } from 'vue'

type IModal = {
   home: {
      mainMenu: boolean
      [key: string]: boolean
   }
   customerAdd: {
      [key: string]: boolean
   }
}

export const useModal = () => {
   const modal = ref<IModal>({
      home: {
         mainMenu: false,
      },
      customerAdd: {
         searchContact: false,
      },
   })

   const toggleModal = (pageName: string, modalName: string) => {
      modal.value[pageName as keyof IModal][modalName] =
         !modal.value[pageName as keyof IModal][modalName]
      console.log('toggleModal run.')
   }

   return {
      toggleModal,
      // modal: { ...modal.value },
      modalHome: modal.value.home,
      modalCustomerAdd: modal.value.customerAdd,
   }
}
