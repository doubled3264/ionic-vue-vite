import axios from 'axios'
import terminal from 'virtual:terminal'

export default {
  namespaced: true,
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
  },
}
