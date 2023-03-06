type TState = {
  pageActive: string
}

export default {
  namespaced: true,
  state: {
    pageActive: '',
  },
  getters: {
    pageActive: (state: TState) => {
      return state.pageActive
    }
  },
  mutations: {
    pageActive: (state: TState, page: string) => {
      state.pageActive = page
    }
  }
}
