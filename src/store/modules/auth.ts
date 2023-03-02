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
  },
  getters: {
    admin: (state: State) => {
      return state.admin && state.token
    },
  },
  mutations: {
    admin: (state: State, data: any) => {
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
      setAxiosHeader(token)
      return new Promise((resolve, reject) => {
        axios
          .get('auth/admin-info')
          .then((response) => {
            commit('user', response.data.data.adminData)
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
  },
}
