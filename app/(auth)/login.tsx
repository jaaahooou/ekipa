import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { router } from 'expo-router'
import { login } from '../../lib/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')

    const { error } = await login(email, password)

    if (error) {
      setErrorMessage('Nieprawidłowy adres e-mail lub hasło')
      return
    }

    router.replace('/')
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f8f9fb',
        }}
      >
        <Image
          source={require('../../assets/login-registr-picture.webp')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 280,
          }}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#0d2b5c',
            }}
          >
            Witaj ponownie 👋
          </Text>

          <Text
            style={{
              marginTop: 8,
              color: '#6b7280',
              fontSize: 16,
            }}
          >
            Zaloguj się, aby planować kolejne wyjazdy.
          </Text>

          <TextInput
            placeholder="Adres e-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              marginTop: 28,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 16,
            }}
          />

          <TextInput
            placeholder="Hasło"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              marginTop: 14,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 16,
            }}
          />

          {errorMessage ? (
            <Text
              style={{
                color: '#dc2626',
                marginTop: 12,
              }}
            >
              {errorMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              marginTop: 24,
              backgroundColor: '#0d2b5c',
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Zaloguj się
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 24,
            }}
          >
            <Text
              style={{
                color: '#6b7280',
              }}
            >
              Nie masz jeszcze konta?
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/register')}
            >
              <Text
                style={{
                  color: '#0d2b5c',
                  fontWeight: '700',
                  marginLeft: 6,
                }}
              >
                Zarejestruj się
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}