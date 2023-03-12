import axios from 'axios'
import { pick } from '../../utils/object-helper'
import terminal from 'virtual:terminal'

interface IProductList {
  id: string
  name: string
  selling_price: number
}

interface IState {
  productList: Array<IProductList>
}

export default {
  namespaced: true,
  state: {
    productList: [],
  },
  getters: {},
  mutations: {
    setProductList: (state: IState, data: any) => {
      state.productList = []
      terminal.log(data)
      for (const productItem of data) {
        state.productList.push({
          ...pick(productItem, 'id', 'name'),
          ...pick(
            productItem.ProductPortion.ProductSellingPrice,
            'selling_price'
          ),
        })
      }
      terminal.log(state.productList)
    },
  },
  actions: {
    async addNew({ }, productData: any) {
      terminal.log(productData)
      return new Promise<void>((resolve, reject) => {
        axios
          .post('product', productData)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    async getAll({ commit }: any) {
      await axios
        .get('product')
        .then((response) => {
          commit('setProductList', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
