import axios from 'axios'
import { pick } from '../../utils/object-helper'
import terminal from 'virtual:terminal'
import {
   ProductDetailAPI,
   SimpleProduct,
   SingleProductPriceList,
} from '../../utils/interface/product'

interface State {
   productList: Array<SimpleProduct>
   productDetail: ProductDetailAPI
   singleProductPriceList: SingleProductPriceList
}

export default {
   namespaced: true,
   state: {
      productList: [],
      productDetail: {},
      singleProductPriceList: {},
   },
   getters: {
      getProductList: (state: State) => {
         return state.productList
      },
      getProductDetail: (state: State) => {
         return state.productDetail
      },
      getSingleDataOfProduct: (state: State) => (fieldName: string) => {
         return { ...pick(state.productDetail, 'id', fieldName) }
      },
      getSinglePriceDataOfProduct: (state: State) => (fieldName: string) => {
         return state.productDetail[fieldName as keyof ProductDetailAPI]
      },
   },
   mutations: {
      setProductList: (state: State, data: Array<SimpleProduct>) => {
         state.productList = data
      },
      setProductDetail: (state: State, data: ProductDetailAPI) => {
         state.productDetail = data
      },
      setSingleProductPriceList: (
         state: State,
         data: SingleProductPriceList
      ) => {
         state.singleProductPriceList = data
      },
   },
   actions: {
      async addNew({}, productData: any) {
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
      async getPriceList({ commit }: any, productId: string) {
         await axios
            .get(`product/price-list/${productId}`)
            .then((response) => {
               commit('setSingleProductPriceList', response.data.data)
            })
            .catch((err) => {
               console.log(err)
            })
      },
      async editBasicInfo({}: any, productData: any) {
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
      async addPurchasePrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            axios
               .post('purchase-price', priceData)
               .then(() => {
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject(err)
               })
         })
      },
      async editPurchasePrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            axios
               .put('purchase-price', priceData)
               .then(() => {
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject(err)
               })
         })
      },
      async addSellingPrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            axios
               .post('selling-price', priceData)
               .then(() => {
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject(err)
               })
         })
      },
      async editSellingPrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            terminal.log(priceData)
            axios
               .put('selling-price', priceData)
               .then(() => {
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject(err)
               })
         })
      },
      async addResellerPrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            axios
               .post('reseller-price', priceData)
               .then(() => {
                  resolve()
               })
               .catch((err) => {
                  console.log(err)
                  reject(err)
               })
         })
      },
      async editResellerPrice({}: any, priceData: any) {
         return new Promise<void>((resolve, reject) => {
            terminal.log(priceData)
            axios
               .put('reseller-price', priceData)
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
