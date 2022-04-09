import 'dotenv/config';

export default {
  expo: {
    owner: "micahbuller",
    name: "mindflip",
    slug: "mindflip",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/mindflip-icon.png",
    assetBundlePatterns: [
      "**/*"
    ],
    android: {
      "package": "com.micahbuller.mindflip"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  },
  name: "mindflip"
}
