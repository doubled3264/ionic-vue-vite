import { createStore } from 'vuex'
import pageNavigation from './modules/pageNavigation'
import bottomNavigation from './modules/bottom-navigation'
import auth from './modules/auth'

export default createStore({
  modules: {
    pageNavigation,
    bottomNavigation,
    auth,
  },
})
