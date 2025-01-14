import axios from 'axios'
import terminal from 'virtual:terminal'
import { Admin, LoginCredentials } from '../../utils/interface/auth'

type State = {
   admin: Admin
}

function storeToken(token: string) {
   localStorage.setItem('token', token)
   setAxiosHeader(token)
}

function setAxiosHeader(token: string) {
   axios.defaults.headers.common['Authorization'] = token
}

export default {
   namespaced: true,
   state: {
      admin: null,
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
   },
   actions: {
      async login({}, credentials: LoginCredentials) {
         return new Promise<void>((resolve, reject) => {
            axios
               .post('auth/login', credentials)
               .then((response) => {
                  storeToken(response.data.data.token)
                  resolve()
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
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
