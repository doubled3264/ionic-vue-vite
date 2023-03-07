import axios from 'axios'
import terminal from 'virtual:terminal'
import { pick } from '../../utils/object-helper'

type TCustomerData = {
  admin: string
  name: string
  phone_number?: string
}

type TCustomerList = {
  id: string
  contact_person_id: string
  name: string
  phone_number: string
}

type State = {
  customerList: Array<TCustomerList>
}

export default {
  namespaced: true,
  state: {
    customerList: [],
  },
  getters: {
    getCustomerList: (state: State) => {
      return state.customerList
    },
  },
  mutations: {
    setCustomerList: (state: State, data: any) => {
      state.customerList = []
      for (const item of data) {
        state.customerList.push({
          ...pick(item, 'id', 'contact_person_id'),
          ...pick(item.ContactPerson, 'name', 'phone_number'),
        })
      }
      terminal.log(state.customerList.length)
    },
  },
  actions: {
    async getAll({ commit }: any) {
      await axios
        .get('customer')
        .then((response) => {
          commit('setCustomerList', response.data.data.collection)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async add({ }: any, customerData: TCustomerData) {
      return new Promise<void>((resolve, reject) => {
        axios
          .post('customer', customerData)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
  },
}
