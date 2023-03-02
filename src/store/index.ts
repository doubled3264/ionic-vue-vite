import { createStore } from 'vuex'
import bottomNavigation from './modules/bottom-navigation'
import auth from './modules/auth'

export default createStore({
  modules: {
    bottomNavigation,
    auth,
  },
})
