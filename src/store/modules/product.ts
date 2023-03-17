import axios from 'axios'
import { pick } from '../../utils/object-helper'
import terminal from 'virtual:terminal'
import { isEmpty, reject } from 'lodash'

interface IProductList {
  id: string
  name: string
  selling_price: number
}

interface IProductDetail {
  id: string
  name: string
  category: string
  portion_type: string
  portion: number
  purchase_price: any
  selling_price: any
  reseller_price: any
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
    getSingleDataOfProduct: (state: IState) => (fieldName: string) => {
      return { ...pick(state.productDetail, 'id', fieldName) }
    },
    getSinglePriceDataOfProduct: (state: IState) => (fieldName: string) => {
      return state.productDetail[fieldName as keyof IProductDetail] != null
        ? state.productDetail[fieldName as keyof IProductDetail]
        : null
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
      state.productDetail = data
    },
  },
  actions: {
    async addNew({ }, productData: any) {
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
    async editBasicInfo({ }: any, productData: any) {
      return new Promise<void>((resolve, reject) => {
        axios
          .put(`product/${productData.id}`, productData.item)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    async addPurchasePrice({ }: any, productData: any) {
      return new Promise<void>((resolve, reject) => {
        axios
          .post('purchase-price', productData)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    async editPurchasePrice({ }: any, productData: any) {
      return new Promise<void>((resolve, reject) => {
        axios
          .put('purchase-price', productData)
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
