import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

export default function SafeModeScreen({
  navigation,
}: any) {
  const [enabled, setEnabled] =
    useState(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 58,
          paddingHorizontal: 24,
          paddingBottom: 50,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="black"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}
          >
            Safe Mode
          </Text>

          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#555"
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 34,
          }}
        >
          <View
            style={{
              width: 165,
              height: 165,
              borderRadius: 82.5,
              backgroundColor: '#dff5ea',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 138,
                height: 138,
                borderRadius: 69,
                backgroundColor: '#0d6b4f',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="shield-checkmark"
                size={62}
                color="#9df3c4"
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              marginTop: 24,
              color: '#111',
            }}
          >
            Safe Mode is ON
          </Text>

          <Text
            style={{
              textAlign: 'center',
              color: '#666',
              marginTop: 12,
              fontSize: 16,
              lineHeight: 24,
              width: '78%',
            }}
          >
            Strict protection is active
            for all family members.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              setEnabled(!enabled)
            }
            style={{
              marginTop: 28,
              width: 78,
              height: 42,
              borderRadius: 30,
              backgroundColor: enabled
                ? '#1c8c5e'
                : '#d9d9d9',
              justifyContent: 'center',
              paddingHorizontal: 4,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: 'white',
                alignSelf: enabled
                  ? 'flex-end'
                  : 'flex-start',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,

                elevation: 4,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 42,
            paddingHorizontal: 4,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <MaterialIcons
              name="phone-in-talk"
              size={20}
              color="#1c8c5e"
            />

            <Text
              style={{
                marginLeft: 16,
                fontSize: 17,
                color: '#333',
                flexShrink: 1,
              }}
            >
              Blocks scam calls & spam
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Feather
              name="link"
              size={20}
              color="#1c8c5e"
            />

            <Text
              style={{
                marginLeft: 16,
                fontSize: 17,
                color: '#333',
                flexShrink: 1,
              }}
            >
              Blocks suspicious links & websites
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <MaterialIcons
              name="file-download"
              size={20}
              color="#1c8c5e"
            />

            <Text
              style={{
                marginLeft: 16,
                fontSize: 17,
                color: '#333',
                flexShrink: 1,
              }}
            >
              Warns before file downloads
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="shield-checkmark"
              size={20}
              color="#1c8c5e"
            />

            <Text
              style={{
                marginLeft: 16,
                fontSize: 17,
                color: '#333',
                flexShrink: 1,
              }}
            >
              Extra protection for payments
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 48,
            borderWidth: 1.5,
            borderColor: '#b7e4cf',
            borderRadius: 16,
            paddingVertical: 17,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Text
            style={{
              color: '#1c8c5e',
              fontSize: 17,
              fontWeight: '700',
            }}
          >
            Turn Off Safe Mode
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
