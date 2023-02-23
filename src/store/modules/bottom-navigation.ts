import { home, order, bill, user } from '../../utils/svg'

type Item = {
  title: string
  path: string
  icon: string
  isActive: boolean
}

interface State {
  // item: string[]
  item: Array<Item>
  name: string
}

export default {
  namespaced: true,
  state: {
    item: [
      {
        title: 'home',
        path: '/home',
        icon: home,
        isActive: true,
      },
      {
        title: 'pesanan',
        path: '/orders',
        icon: order,
        isActive: false,
      },
      {
        title: 'tagihan',
        path: '/bills',
        icon: bill,
        isActive: false,
      },
      {
        title: 'pelanggan',
        path: '/customers',
        icon: user,
        isActive: false,
      },
    ],
    name: 'maman racing mantap',
  },
  getters: {
    getItem: (state: State) => {
      return state.item
    },
    getName: (state: State) => {
      return state.name
    },
  },
  mutations: {
    turnOffAll: (state: State) => {
      state.item.forEach((item: Item) => {
        item.isActive = false
      })
    },
    turnOn: (state: State, itemToActive: String) => {
      state.item.forEach((item: Item) => {
        if (item.title == itemToActive) {
          item.isActive = true
        }
      })
    },
  },
}
