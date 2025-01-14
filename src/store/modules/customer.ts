import axios from 'axios'
import terminal from 'virtual:terminal'
import {
   CustomerDataForSave,
   CustomerDetail,
} from '../../utils/interface/customer'

interface State {
   customerList: Array<CustomerDetail>
   customerDetail: CustomerDetail
}

export default {
   namespaced: true,
   state: {
      customerList: [],
      customerDetail: {},
   },
   getters: {
      getCustomerList: (state: State) => {
         return state.customerList
      },
      getCustomerDetail: (state: State) => {
         return state.customerDetail
      },
   },
   mutations: {
      setCustomerList: (state: State, data: Array<CustomerDetail>) => {
         state.customerList = data
      },
      setCustomerDetail: (state: State, data: CustomerDetail) => {
         state.customerDetail = data
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
      async add({}: any, customerData: CustomerDataForSave) {
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
      async edit({}, customerData: CustomerDataForSave) {
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
