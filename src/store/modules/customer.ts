import axios from 'axios'
import terminal from 'virtual:terminal'
import { pick } from '../../utils/object-helper'

type TCustomerData = {
   id?: string
   admin: string
   name: string
   phone_number?: string
}

type TCustomer = {
   id: string
   contact_person_id: string
   name: string
   phone_number: string
}

type TState = {
   customerList: Array<TCustomer>
   customerDetail: TCustomer
}

export default {
   namespaced: true,
   state: {
      customerList: [],
      customerDetail: {},
   },
   getters: {
      getCustomerList: (state: TState) => {
         return state.customerList
      },
      getCustomerDetail: (state: TState) => {
         return state.customerDetail
      },
   },
   mutations: {
      setCustomerList: (state: TState, data: any) => {
         state.customerList = []
         for (const item of data) {
            state.customerList.push({
               ...pick(item, 'id', 'contact_person_id'),
               ...pick(item.ContactPerson, 'name', 'phone_number'),
            })
         }
         terminal.log(state.customerList.length)
      },
      setCustomerDetail: (state: TState, data: any) => {
         state.customerDetail = {
            ...pick(data, 'id', 'contact_person_id'),
            ...pick(data.ContactPerson, 'name', 'phone_number'),
         }
         console.log(state.customerDetail)
      },
   },
   actions: {
      async getAll({ commit }: any) {
         await axios
            .get('customer')
            .then((response) => {
               commit('setCustomerList', response.data.data)
            })
            .catch((err) => {
               console.log(err)
            })
      },
      async getOne({ commit }: any, customerId: string) {
         await axios
            .get(`customer/${customerId}`)
            .then((response) => {
               commit('setCustomerDetail', response.data.data)
            })
            .catch((err) => {
               console.log(err)
            })
      },
      async add({}: any, customerData: TCustomerData) {
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
      async edit({}, customerData: TCustomerData) {
         return new Promise<void>((resolve, reject) => {
            axios
               .put(`customer/${customerData.id}`, customerData)
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
