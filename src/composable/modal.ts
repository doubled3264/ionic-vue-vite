import { ref } from 'vue'

const PageName = ['home', 'customerAdd', 'productEdit'] as const
const HomeModal = 'mainMenu' as const
const CustomerAddModal = 'searchContact' as const
const ProductEdit = [
   'editName',
   'editCategory',
   'editPurchasePrice',
   'editSellingPrice',
   'editResellerPrice',
   'purchasePriceEditOptions',
   'sellingPriceEditOptions',
   'resellerPriceEditOptions',
] as const

type TPageName = typeof PageName[number]
type TModalName =
   | typeof HomeModal
   | typeof CustomerAddModal
   | typeof ProductEdit[number]

type IModal = {
   home: {
      mainMenu: boolean
      [key: string]: boolean
   }
   customerAdd: {
      searchContact: boolean
      [key: string]: boolean
   }
   productEdit: {
      editName: boolean
      editCategory: boolean
      editPurchasePrice: boolean
      editSellingPrice: boolean
      editResellerPrice: boolean
      purchasePriceEditOptions: boolean
      sellingPriceEditOptions: boolean
      resellerPriceEditOptions: boolean
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
      productEdit: {
         editName: false,
         editCategory: false,
         editPurchasePrice: false,
         editSellingPrice: false,
         editResellerPrice: false,
         purchasePriceEditOptions: false,
         sellingPriceEditOptions: false,
         resellerPriceEditOptions: false,
      },
   })

   const toggleModal = (pageName: TPageName, modalName: TModalName) => {
      modal.value[pageName as keyof IModal][modalName] =
         !modal.value[pageName as keyof IModal][modalName]
   }

   return {
      toggleModal,
      modalHome: modal.value.home,
      modalCustomerAdd: modal.value.customerAdd,
      modalProductEdit: modal.value.productEdit,
   }
}
