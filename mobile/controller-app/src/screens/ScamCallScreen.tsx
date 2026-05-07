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
} from '@expo/vector-icons';

import Header from '../components/Header';

const blockedCalls = [
  {
    id: 1,
    number: '+91 98765 43210',
    type: 'Bank Scam',
    time: '2 mins ago',
    risk: 'High Risk',
  },

  {
    id: 2,
    number: '+91 90123 45678',
    type: 'Lottery Scam',
    time: '15 mins ago',
    risk: 'High Risk',
  },

  {
    id: 3,
    number: '+91 88991 22334',
    type: 'Spam Promotion',
    time: '1 hour ago',
    risk: 'Low Risk',
  },
];

export default function ScamCallScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header
        title="Scam Call Protection"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              backgroundColor: '#1c8c5e',
              borderRadius: 24,
              padding: 24,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}
            >
              Protection Status
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 34,
                fontWeight: '700',
                marginTop: 10,
              }}
            >
              Active
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 10,
                opacity: 0.9,
              }}
            >
              Scam calls are being blocked
            </Text>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              marginTop: 30,
              marginBottom: 18,
            }}
          >
            Recent Blocked Calls
          </Text>

          {blockedCalls.map((call) => (
            <TouchableOpacity
              key={call.id}
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
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor:
                    call.risk === 'High Risk'
                      ? '#ffebee'
                      : '#fff3e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons
                  name="phone-in-talk"
                  size={26}
                  color={
                    call.risk === 'High Risk'
                      ? '#e53935'
                      : '#f39c12'
                  }
                />
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
                  {call.number}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#666',
                  }}
                >
                  {call.type}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#999',
                  }}
                >
                  {call.time}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor:
                    call.risk === 'High Risk'
                      ? '#ffebee'
                      : '#fff3e0',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color:
                      call.risk === 'High Risk'
                        ? '#e53935'
                        : '#f39c12',
                    fontWeight: '700',
                  }}
                >
                  {call.risk}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="shield-checkmark"
                size={24}
                color="#1c8c5e"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: '700',
                }}
              >
                Smart Detection Enabled
              </Text>
            </View>

            <Text
              style={{
                marginTop: 10,
                color: '#666',
                lineHeight: 22,
              }}
            >
              AI automatically detects fraud,
              spam and scam callers before
              they reach family members.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
