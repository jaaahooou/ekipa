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
import { register } from '../../lib/auth'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRegister = async () => {
    setErrorMessage('')
    setSuccessMessage('')

    if (!email.trim()) {
      setErrorMessage('Podaj adres e-mail')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Hasło musi mieć minimum 6 znaków')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Hasła nie są identyczne')
      return
    }

    const { error } = await register(email, password)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setSuccessMessage(
      'Wysłaliśmy wiadomość aktywacyjną na Twój adres e-mail. Potwierdź konto i zaloguj się.'
    )
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
            backgroundColor: '#fff',
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#0d2b5c',
            }}
          >
            Załóż konto ✈️
          </Text>

          <Text
            style={{
              marginTop: 8,
              color: '#6b7280',
              fontSize: 16,
            }}
          >
            Dołącz do ekipy i planuj wspólne wyjazdy.
          </Text>

          <TextInput
            placeholder="Adres e-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              setErrorMessage('')
            }}
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
            onChangeText={(text) => {
              setPassword(text)
              setErrorMessage('')
            }}
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

          <TextInput
            placeholder="Powtórz hasło"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text)
              setErrorMessage('')
            }}
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

          {successMessage ? (
            <Text
              style={{
                color: '#15803d',
                marginTop: 12,
                lineHeight: 22,
              }}
            >
              {successMessage}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
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
                color: '#fff',
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Załóż konto
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
              Masz już konto?
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/login')}
            >
              <Text
                style={{
                  color: '#0d2b5c',
                  fontWeight: '700',
                  marginLeft: 6,
                }}
              >
                Zaloguj się
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}