import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';

import Header from '../components/Header';

const alerts = [
  {
    id: 1,
    title: 'Scam Call Blocked',
    subtitle: '+91 98765 43210',
    person: "Mom's phone",
    risk: 'High',
    color: '#ffebee',
    iconColor: '#e53935',
    icon: 'phone-in-talk',
    screen: 'ScamCall',
  },

  {
    id: 2,
    title: 'Suspicious File Detected',
    subtitle: 'invoice.apk',
    person: "Dad's phone",
    risk: 'High',
    color: '#ffebee',
    iconColor: '#e53935',
    icon: 'file-download',
    screen: 'FileProtection',
  },

  {
    id: 3,
    title: 'Suspicious Link Detected',
    subtitle: 'bit.ly/xyz123',
    person: 'Riya (iPhone)',
    risk: 'Low',
    color: '#fff3e0',
    iconColor: '#f39c12',
    icon: 'link',
    screen: 'LinkSafety',
  },

  {
    id: 4,
    title: 'Unsafe Website Warning',
    subtitle: 'fake-amazon-login.com',
    person: 'Aarav (Realme Narzo 50)',
    risk: 'Low',
    color: '#fff3e0',
    iconColor: '#f39c12',
    icon: 'shield-checkmark',
    screen: 'Protection',
  },
];

export default function AlertsScreen({
  navigation,
}: any) {
  const [selectedFilter, setSelectedFilter] =
    useState('All');

  const filteredAlerts =
    selectedFilter === 'All'
      ? alerts
      : alerts.filter(
          (alert) =>
            alert.risk === selectedFilter
        );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header title="Alerts" />

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
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                setSelectedFilter('All')
              }
              style={{
                backgroundColor:
                  selectedFilter === 'All'
                    ? '#1c8c5e'
                    : 'white',
                paddingHorizontal: 26,
                paddingVertical: 12,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  color:
                    selectedFilter === 'All'
                      ? 'white'
                      : 'black',
                  fontWeight: '700',
                }}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setSelectedFilter('High')
              }
              style={{
                backgroundColor:
                  selectedFilter === 'High'
                    ? '#e53935'
                    : 'white',
                paddingHorizontal: 26,
                paddingVertical: 12,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  color:
                    selectedFilter === 'High'
                      ? 'white'
                      : 'black',
                  fontWeight: '700',
                }}
              >
                High Risk
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setSelectedFilter('Low')
              }
              style={{
                backgroundColor:
                  selectedFilter === 'Low'
                    ? '#f39c12'
                    : 'white',
                paddingHorizontal: 26,
                paddingVertical: 12,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  color:
                    selectedFilter === 'Low'
                      ? 'white'
                      : 'black',
                  fontWeight: '700',
                }}
              >
                Low Risk
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 16,
            }}
          >
            Today
          </Text>

          {filteredAlerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              onPress={() =>
                navigation.navigate(alert.screen)
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
                  backgroundColor: alert.color,
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {alert.icon ===
                'phone-in-talk' ? (
                  <MaterialIcons
                    name="phone-in-talk"
                    size={24}
                    color={alert.iconColor}
                  />
                ) : alert.icon ===
                  'link' ? (
                  <Feather
                    name="link"
                    size={24}
                    color={alert.iconColor}
                  />
                ) : alert.icon ===
                  'file-download' ? (
                  <MaterialIcons
                    name="file-download"
                    size={24}
                    color={alert.iconColor}
                  />
                ) : (
                  <Ionicons
                    name="shield-checkmark"
                    size={24}
                    color={alert.iconColor}
                  />
                )}
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                  }}
                >
                  {alert.title}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#666',
                  }}
                >
                  {alert.subtitle}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#999',
                  }}
                >
                  {alert.person}
                </Text>
              </View>

              <Text
                style={{
                  color:
                    alert.risk === 'High'
                      ? '#e53935'
                      : '#f39c12',
                  fontWeight: '700',
                }}
              >
                {alert.risk}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
