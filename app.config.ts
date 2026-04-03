import * as dotenv from 'dotenv'

dotenv.config()

export default {
  expo: {
    name: 'booking-mobile',
    slug: 'booking-mobile',
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
}