import store from "../store";

export const setToActive = (page: string) => {
  store.commit('pageNavigation/pageActive', page)
}
export const getActive = () => {
  return store.getters['pageNavigation/pageActive']
}
