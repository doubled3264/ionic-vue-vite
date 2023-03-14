import axios from 'axios'
import { pick } from '../../utils/object-helper'
import terminal from 'virtual:terminal'

interface IProductList {
  id: string
  name: string
  selling_price: number
}

interface IProductDetail {
  id: string
  name: string
}

interface IState {
  productList: Array<IProductList>
  productDetail: IProductDetail
}

export default {
  namespaced: true,
  state: {
    productList: [],
    productDetail: {},
  },
  getters: {
    getProductList: (state: IState) => {
      return state.productList
    },
    getProductDetail: (state: IState) => {
      return state.productDetail
    },
    getName: (state: IState) => {
      terminal.log('get name')
      terminal.log(pick(state.productDetail, 'id', 'name'))
      return { ...pick(state.productDetail, 'id', 'name') }
    },
  },
  mutations: {
    setProductList: (state: IState, data: any) => {
      state.productList = []
      for (const productItem of data) {
        state.productList.push({
          ...pick(productItem, 'id', 'name'),
          ...pick(
            productItem.ProductPortion.ProductSellingPrice,
            'selling_price'
          ),
        })
      }
    },
    setProductDetail: (state: IState, data: any) => {
      state.productDetail = {
        ...pick(data, 'id', 'name', 'category', 'portion_type'),
        ...pick(data.ProductPortion, 'portion'),
        ...pick(data.ProductPortion.ProductSellingPrice, 'selling_price'),
      }
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
    async getOne({ commit }: any, productId: string) {
      await axios
        .get(`product/${productId}`)
        .then((response) => {
          commit('setProductDetail', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
