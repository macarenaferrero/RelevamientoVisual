import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RelevamientoVisual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen:{
    launchShowDuration: 2000
    }
  }
};

export default config;
