import { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { supabase } from '../lib/supabase'
import { logout } from '../lib/auth'
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width
const { width } = Dimensions.get('window')

type GroupItem = {
  id: string
  name: string
  emoji: string
  role: string
}

export default function GroupsScreen() {
  const [groups, setGroups] = useState<GroupItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    const { data, error } = await supabase
      .from('memberships')
      .select(`
        role,
        groups (
          id,
          name,
          emoji
        )
      `)
      console.log('GROUPS DATA:', data)

    if (error) {
      console.log(error)
      setLoading(false)
      return
    }

  const mappedGroups: GroupItem[] =
  (data || [])
    .filter((item: any) => item.groups)
    .map((item: any) => ({
      id: item.groups.id,
      name: item.groups.name,
      emoji: item.groups.emoji,
      role: item.role,
    }))

    setGroups(mappedGroups)
    setLoading(false)
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f8f9fb',
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
  <ImageBackground
  source={require('../assets/groups.webp')}
  resizeMode="cover"
  style={{
    height: 220,
    width: "100%",
    marginTop: 0,
    
  }}
>
        <TouchableOpacity
          onPress={() => setShowMenu(!showMenu)}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: 'rgba(255,255,255,0.92)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="person-outline"
            size={26}
            color="#0d2b5c"
          />
        </TouchableOpacity>

        {showMenu && (
          <View
            style={{
              position: 'absolute',
              top: 110,
              right: 20,
              width: 220,
              backgroundColor: 'white',
              borderRadius: 18,
              overflow: 'hidden',
              elevation: 10,
              zIndex: 999,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 16,
              }}
              onPress={() => {
                setShowMenu(false)
                router.push('/create-group')
              }}
            >
              <Text>➕ Utwórz grupę</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 16,
              }}
              onPress={() => {
                setShowMenu(false)
                router.push('/join-group')
              }}
            >
              <Text>🔗 Dołącz do grupy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 16,
              }}
              onPress={async () => {
                setShowMenu(false)

                await logout()

                router.replace('/(auth)/login')
              }}
            >
              <Text
                style={{
                  color: '#dc2626',
                }}
              >
                🚪 Wyloguj
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>

      <View
        style={{
          marginTop: -40,
          paddingHorizontal: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{
              marginTop: 50,
            }}
          />
        ) : groups.length === 0 ? (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 28,
              padding: 30,
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="people-outline"
              size={90}
              color="#d1d5db"
            />

            <Text
              style={{
                marginTop: 20,
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              Nie należysz jeszcze
            </Text>

            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              do żadnej grupy
            </Text>

            <Text
              style={{
                marginTop: 14,
                textAlign: 'center',
                color: '#6b7280',
                lineHeight: 24,
              }}
            >
              Utwórz grupę lub dołącz
              {'\n'}
              do istniejącej za pomocą kodu.
            </Text>
          </View>
        ) : (
          groups.map((group) => (
            <TouchableOpacity
              key={group.id}
              onPress={() =>
                router.push(`/group/${group.id}`)
              }
              style={{
                backgroundColor: 'white',
                borderRadius: 24,
                padding: 18,
                marginBottom: 16,

                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    backgroundColor: '#eef2ff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: '700',
                      color: '#5b4df5',
                    }}
                  >
                    {group.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '700',
                      color: '#111827',
                    }}
                  >
                    {group.name}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: '#6b7280',
                    }}
                  >
                    {group.role === 'admin'
                      ? 'Administrator'
                      : 'Członek'}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="#9ca3af"
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  )
}