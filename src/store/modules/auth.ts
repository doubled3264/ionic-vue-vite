import axios from 'axios'

type State = {
  admin: object
  token: string
}

function storeToken(token: string) {
  localStorage.setItem('token', token)
}

function setAxiosHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = token
}

export default {
  namespaced: true,
  state: {
    admin: null,
    token: null,
    isAuthorize: false,
  },
  getters: {
    admin: (state: State) => {
      return state.admin
    },
  },
  mutations: {
    setAdmin: (state: State, data: any) => {
      state.admin = data
    },
    token: (state: State, data: any) => {
      state.token = data
    },
  },
  actions: {
    // async login({commit}, credentials) {

    // },
    async getAccess({ commit }: any, token: string) {
      return new Promise<void>((resolve, reject) => {
        setAxiosHeader(token)
        axios
          .get('auth/admin-info')
          .then((response) => {
            commit('setAdmin', response.data.data.adminData)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject()
          })
      })
    },
  },
}
