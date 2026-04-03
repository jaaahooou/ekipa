import Constants from 'expo-constants'

const extra = Constants.expoConfig?.extra


export const env = {
  supabaseUrl: extra?.supabaseUrl as string,
  supabaseAnonKey: extra?.supabaseAnonKey as string,
}
