import { ref } from 'vue'

const pageName = ['productPriceInfo'] as const
const productPriceInfoCard = 'purchasePrice' as const

type PageName = typeof pageName[number]
type CardName = typeof productPriceInfoCard

type Card = {
   productPriceInfo: {
      purchasePrice: boolean
   }
}

export const useCard = () => {
   const card = ref<Card>({
      productPriceInfo: {
         purchasePrice: false,
      },
   })

   const toggleCardNav = (pageName: PageName, cardName: CardName) => {
      card.value[pageName][cardName] = !card.value[pageName][cardName]
   }

   return {
      toggleCardNav,
      cardProductPriceInfo: card.value.productPriceInfo,
   }
}
