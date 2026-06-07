import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'

import { supabase } from '../lib/supabase'

function generateInviteCode() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

export default function CreateGroupScreen() {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎓')

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCreateGroup = async () => {
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Podaj nazwę grupy')
      return
    }

    try {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setErrorMessage('Nie jesteś zalogowany')
        return
      }

      const inviteCode = generateInviteCode()

      const { data: group, error: groupError } =
        await supabase
          .from('groups')
          .insert({
            name: name.trim(),
            emoji,
            invite_code: inviteCode,
            created_by: user.id,
          })
          .select('id')
          .single()

      if (groupError) {
        console.log(groupError)

        setErrorMessage(
          'Nie udało się utworzyć grupy.'
        )
        return
      }

      const { error: membershipError } =
        await supabase
          .from('memberships')
          .insert({
            group_id: group.id,
            user_id: user.id,
            role: 'admin',
          })

      if (membershipError) {
        console.log(membershipError)

        setErrorMessage(
          'Grupa została utworzona, ale nie udało się dodać administratora.'
        )
        return
      }

      router.replace('/')
    } catch (err) {
      console.log(err)

      setErrorMessage(
        'Wystąpił nieoczekiwany błąd.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f8f9fb',
      }}
      contentContainerStyle={{
        padding: 24,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 34,
          fontWeight: '700',
          color: '#0d2b5c',
        }}
      >
        Utwórz grupę
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: '#6b7280',
          fontSize: 16,
        }}
      >
        Stwórz grupę znajomych i zacznij planować wspólne wyjazdy.
      </Text>

      <Text
        style={{
          marginTop: 32,
          marginBottom: 8,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        Nazwa grupy
      </Text>

      <TextInput
        editable={!loading}
        value={name}
        onChangeText={setName}
        placeholder="Znajomi z ogólniaka"
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          fontSize: 16,
        }}
      />

      <Text
        style={{
          marginTop: 24,
          marginBottom: 8,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        Emoji grupy
      </Text>

      <TextInput
        editable={!loading}
        value={emoji}
        onChangeText={setEmoji}
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          fontSize: 24,
        }}
      />

      {errorMessage ? (
        <View
          style={{
            marginTop: 16,
            backgroundColor: '#fee2e2',
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Text
            style={{
              color: '#b91c1c',
            }}
          >
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleCreateGroup}
        disabled={loading}
        style={{
          marginTop: 32,
          backgroundColor: '#5b4df5',
          borderRadius: 18,
          paddingVertical: 18,
          alignItems: 'center',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              fontWeight: '700',
            }}
          >
            Utwórz grupę
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}