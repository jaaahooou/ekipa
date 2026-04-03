import { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      router.replace('/create-group')
    }
  }

  const register = async () => {
    await supabase.auth.signUp({
      email,
      password,
    })
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20 }}
      />

      <Button title="Zaloguj" onPress={login} />
      <View style={{ height: 12 }} />
      <Button title="Załóż konto" onPress={register} />
    </View>
  )
}