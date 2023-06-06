import { createApp } from 'vue'
import { IonicVue, createAnimation } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import { terminal } from 'virtual:terminal'
import router from './routes'
import store from './store'
import App from './App.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'
/* sweetalert2 style */
import 'sweetalert2/dist/sweetalert2.min.css'
/* custom style */
import './assets/style/index.scss'

axios.defaults.baseURL = import.meta.env.VITE_APIURL
axios.defaults.headers.post['Content-Type'] =
   'application/x-www-form-urlencoded'

const myAnimation = (baseEl: any, opts: any) => {
   const { enteringEl, leavingEl } = opts
   const enteringPage = createAnimation('entering-page-animation')
   const leavingPage = createAnimation('leaving-page-animation')
   return createAnimation('root-transition').addAnimation([
      enteringPage,
      leavingPage,
   ])
}

const app = createApp(App)
   .use(IonicVue, {
      animated: true,
      navAnimation: myAnimation,
   })
   .use(router)
   .use(store)
   .use(VueSweetalert2)

router.isReady().then(() => {
   app.mount('#app')
})

/* Change status bar color */
StatusBar.setOverlaysWebView({ overlay: true })
StatusBar.setStyle({ style: Style.Light })
