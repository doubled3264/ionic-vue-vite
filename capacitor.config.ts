import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
   appId: 'com.doubled.ujungfishingapp',
   appName: 'Ujung Fishing App',
   webDir: 'dist',
   bundledWebRuntime: false,
   server: {
      cleartext: true,
      // url: 'http://192.168.153.131:5173/',
      url: 'http://192.168.1.10:5173/',
   },
}

export default config
