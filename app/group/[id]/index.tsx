import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { router } from 'expo-router'
import { logout } from '../../../lib/auth'


import { supabase } from '../../../lib/supabase'

export default function GroupScreen() {
  const { id } = useLocalSearchParams()
  const [showMenu, setShowMenu] = useState(false)

  const [group, setGroup] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadGroup()
    }
  }, [id])

  const loadGroup = async () => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.log(error)
    } else {
      setGroup(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!group) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Nie znaleziono grupy</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f5f7fb',
      }}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      <ImageBackground
        source={require('../../../assets/groups.webp')}
        resizeMode="cover"
        style={{
          height: 280,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}
        />

    <TouchableOpacity
  onPress={() => setShowMenu(!showMenu)}
  style={{
    position: 'absolute',
    top: 60,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.95)',
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
      top: 120,
      right: 20,
      width: 220,
      backgroundColor: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      elevation: 12,
      zIndex: 9999,
    }}
  >
    <TouchableOpacity
      style={{
        padding: 16,
      }}
      onPress={() => {
        setShowMenu(false)
        router.push('/groups')
      }}
    >
      <Text>👥 Moje grupy</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        padding: 16,
      }}
      onPress={() => {
        setShowMenu(false)

        // później ekran ustawień grupy
      }}
    >
      <Text>⚙️ Ustawienia</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        padding: 16,
          zIndex: 1,
      
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
          marginTop: -70,
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 30,
          padding: 24,

          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 16,

          elevation: 6,
        }}
      >
        <Text
          style={{
            fontSize: 56,
          }}
        >
          {group.emoji}
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 30,
            fontWeight: '700',
            color: '#111827',
          }}
        >
          {group.name}
        </Text>

        <Text
          style={{
            marginTop: 6,
            color: '#6b7280',
            fontSize: 15,
          }}
        >
          Planuj wspólne wyjazdy ze znajomymi
        </Text>

        <View
          style={{
            marginTop: 22,
            backgroundColor: '#f5f7ff',
            borderRadius: 18,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                color: '#6b7280',
                fontSize: 12,
              }}
            >
              Kod zaproszenia
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontSize: 22,
                fontWeight: '700',
                color: '#5b4df5',
              }}
            >
              {group.invite_code}
            </Text>
          </View>

          <Ionicons
            name="copy-outline"
            size={26}
            color="#5b4df5"
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 18,
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 24,
          paddingVertical: 24,
          flexDirection: 'row',
        }}
      >
        {[
          ['12', 'Osób'],
          ['3', 'Eventy'],
          ['8', 'Pomysły'],
          ['42', 'Chat'],
        ].map(([value, label]) => (
          <View
            key={label}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: '700',
                color: '#111827',
              }}
            >
              {value}
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#6b7280',
                fontSize: 13,
              }}
            >
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#111827',
          }}
        >
          Najbliższe wydarzenie
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 14,
          backgroundColor: '#fff',
          borderRadius: 24,
          padding: 20,
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
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: '#eef2ff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#5b4df5',
              }}
            >
              24
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#5b4df5',
              }}
            >
              MAJ
            </Text>
          </View>

          <View
            style={{
              marginLeft: 16,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              Weekend w Tatrach
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: '#6b7280',
              }}
            >
              Zakopane • 10 uczestników
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#111827',
          }}
        >
          Ostatnia aktywność
        </Text>
      </View>

      {[
        'Ania dodała nowy pomysł',
        'Kamil utworzył wydarzenie',
        'Magda napisała wiadomość',
      ].map((item, index) => (
        <View
          key={index}
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 18,
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              color: '#111827',
            }}
          >
            {item}
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: '#9ca3af',
              fontSize: 13,
            }}
          >
            2 godziny temu
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginTop: 26,
          backgroundColor: '#5b4df5',
          borderRadius: 20,
          paddingVertical: 18,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 17,
          }}
        >
          + Dodaj wydarzenie
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}