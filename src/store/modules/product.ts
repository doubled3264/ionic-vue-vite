import axios from 'axios'
import terminal from 'virtual:terminal'

export default {
   namespaced: true,
   actions: {
      async addNew({}, productData: any) {
         terminal.log(productData)
      },
   },
}
