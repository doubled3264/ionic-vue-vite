import { useRouter } from 'vue-router'
import store from '../store'

const router = useRouter()
export const setToActive = (page: string) => {
   store.commit('pageNavigation/pageActive', page)
}
export const getActive = () => {
   return store.getters['pageNavigation/pageActive']
}

export const goToPage = (path: string) => {
   router.push({ path: path })
}
