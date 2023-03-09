import { createStore } from 'vuex'
import pageNavigation from './modules/pageNavigation'
import bottomNavigation from './modules/bottom-navigation'
import auth from './modules/auth'
import customer from './modules/customer'
import product from './modules/product'

export default createStore({
   modules: {
      pageNavigation,
      bottomNavigation,
      auth,
      customer,
      product,
   },
})
