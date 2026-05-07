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

const files = [
  {
    id: 1,
    name: 'invoice.apk',
    type: 'Malware Detected',
    risk: 'High Risk',
    time: '10 mins ago',
  },

  {
    id: 2,
    name: 'bank-update.zip',
    type: 'Suspicious File',
    risk: 'High Risk',
    time: '25 mins ago',
  },

  {
    id: 3,
    name: 'promo-coupon.pdf',
    type: 'Unknown Source',
    risk: 'Low Risk',
    time: '1 hour ago',
  },
];

export default function FileProtectionScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header
        title="File Protection"
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
              File Protection Status
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
              Downloads are scanned automatically
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
            Recent File Threats
          </Text>

          {files.map((file) => (
            <TouchableOpacity
              key={file.id}
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
                    file.risk === 'High Risk'
                      ? '#ffebee'
                      : '#fff3e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons
                  name="file-download"
                  size={26}
                  color={
                    file.risk === 'High Risk'
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
                    fontSize: 16,
                    fontWeight: '700',
                  }}
                >
                  {file.name}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#666',
                  }}
                >
                  {file.type}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#999',
                  }}
                >
                  {file.time}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor:
                    file.risk === 'High Risk'
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
                      file.risk === 'High Risk'
                        ? '#e53935'
                        : '#f39c12',
                    fontWeight: '700',
                  }}
                >
                  {file.risk}
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
                Malware Detection Enabled
              </Text>
            </View>

            <Text
              style={{
                marginTop: 10,
                color: '#666',
                lineHeight: 22,
              }}
            >
              All downloaded files are scanned
              using smart threat detection
              before users can open them.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
