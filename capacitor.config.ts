import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.unnamed',
  appName: 'unnamed',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    "cleartext": true,
    "url": "http://192.168.153.131:5173/"
  }
}

export default config
