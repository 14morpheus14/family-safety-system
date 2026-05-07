import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  MaterialIcons,
  Ionicons,
  Feather,
} from '@expo/vector-icons';

import Header from '../components/Header';

const protections = [
  {
    id: 1,
    title: 'Scam Call Protection',
    subtitle:
      'Blocks spam & scam callers automatically',
    icon: 'phone',
    color: '#e8f8ef',
    iconColor: '#1c8c5e',
    screen: 'ScamCall',
  },

  {
    id: 2,
    title: 'Suspicious Link Detection',
    subtitle:
      'Detects phishing and harmful links',
    icon: 'link',
    color: '#fff3e0',
    iconColor: '#f39c12',
    screen: 'LinkSafety',
  },

  {
    id: 3,
    title: 'File Protection',
    subtitle:
      'Scans downloaded files for malware',
    icon: 'file',
    color: '#e3f2fd',
    iconColor: '#1976d2',
    screen: 'FileProtection',
  },
];

export default function ProtectionScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header title="Protection" />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SafeMode')
            }
            style={{
              backgroundColor: '#1c8c5e',
              borderRadius: 24,
              padding: 24,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}
            >
              Protection Status
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 36,
                fontWeight: '700',
                marginTop: 10,
              }}
            >
              Active
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 12,
                opacity: 0.9,
              }}
            >
              All security systems are running
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 18,
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Tap to open Safe Mode →
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              marginTop: 30,
              marginBottom: 18,
            }}
          >
            Security Features
          </Text>

          {protections.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate(item.screen)
              }
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 18,
                marginBottom: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: item.color,
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.icon === 'phone' ? (
                  <MaterialIcons
                    name="phone-in-talk"
                    size={24}
                    color={item.iconColor}
                  />
                ) : item.icon === 'link' ? (
                  <Feather
                    name="link"
                    size={24}
                    color={item.iconColor}
                  />
                ) : (
                  <MaterialIcons
                    name="file-download"
                    size={24}
                    color={item.iconColor}
                  />
                )}
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    marginTop: 6,
                    color: '#666',
                    lineHeight: 20,
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
