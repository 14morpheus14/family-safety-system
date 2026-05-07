import React from 'react';

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

import {
  moderateScale,
  verticalModerateScale,
  font,
} from '../utils/responsive';

const stats = [
  {
    value: '5',
    label: 'Family\nMembers',
    color: '#111',
  },

  {
    value: '0',
    label: 'High\nRisks',
    color: '#ff4d4f',
  },

  {
    value: '2',
    label: 'Low\nRisks',
    color: '#666',
  },

  {
    value: '24',
    label: 'Actions\nTaken',
    color: '#111',
  },
];

const alerts = [
  {
    id: 1,
    title: 'Scam Call Blocked',
    subtitle: "Mom's phone",
    time: '10:30 AM',
    icon: 'call',
    bg: '#e8f8ef',
    color: '#1c8c5e',
  },

  {
    id: 2,
    title: 'Suspicious Link Detected',
    subtitle: 'Riya (iPhone)',
    time: '9:45 AM',
    icon: 'link',
    bg: '#fff4e5',
    color: '#f5a623',
  },

  {
    id: 3,
    title: 'Safe Mode Enabled',
    subtitle: "Dad's phone",
    time: 'Yesterday',
    icon: 'shield',
    bg: '#e8f8ef',
    color: '#1c8c5e',
  },
];

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: verticalModerateScale(40),
          paddingHorizontal: moderateScale(16),
          paddingBottom: verticalModerateScale(10),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: font(15),
                fontWeight: '700',
                color: '#111',
              }}
            >
              Good Morning, Ankit 👋
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontSize: font(12),
                color: '#777',
              }}
            >
              Your family is protected
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: moderateScale(38),
              height: moderateScale(38),
              borderRadius: 19,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.04,
              shadowRadius: 3,

              elevation: 1,
            }}
          >
            <Ionicons
              name="notifications"
              size={17}
              color="#111"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: verticalModerateScale(14),
            backgroundColor: '#1c8c5e',
            borderRadius: moderateScale(22),
            padding: moderateScale(16),

            shadowColor: '#1c8c5e',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,

            elevation: 4,
          }}
        >
          <Text
            style={{
              color: 'white',
              opacity: 0.9,
              fontSize: font(12),
            }}
          >
            Overall Family Status
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent:
                'space-between',
              alignItems: 'center',
              marginTop: verticalModerateScale(12),
            }}
          >
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: font(15),
                  fontWeight: '700',
                }}
              >
                All Safe
              </Text>

              <Text
                style={{
                  color: 'white',
                  opacity: 0.9,
                  marginTop: 4,
                  fontSize: font(12),
                }}
              >
                Great! No immediate risks
              </Text>

              <Text
                style={{
                  color: 'white',
                  opacity: 0.7,
                  marginTop: 3,
                  fontSize: font(10),
                }}
              >
                Last scanned: Just now
              </Text>
            </View>

            <View
              style={{
                width: moderateScale(66),
                height: moderateScale(66),
                borderRadius: 33,
                backgroundColor:
                  'rgba(255,255,255,0.16)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: moderateScale(50),
                  height: moderateScale(50),
                  borderRadius: 25,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={28}
                  color="#1c8c5e"
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            marginTop: verticalModerateScale(12),
          }}
        >
          {stats.map((item) => (
            <View
              key={item.label}
              style={{
                width: '23%',
                backgroundColor: 'white',
                borderRadius: moderateScale(14),
                paddingVertical: verticalModerateScale(11),
                alignItems: 'center',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.03,
                shadowRadius: 3,

                elevation: 1,
              }}
            >
              <Text
                style={{
                  fontSize: font(16),
                  fontWeight: '700',
                  color: item.color,
                }}
              >
                {item.value}
              </Text>

              <Text
                style={{
                  marginTop: 3,
                  textAlign: 'center',
                  fontSize: font(10),
                  color: '#777',
                  lineHeight: 12,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            alignItems: 'center',
            marginTop: verticalModerateScale(18),
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: font(15),
              fontWeight: '700',
              color: '#111',
            }}
          >
            Recent Alerts
          </Text>

          <TouchableOpacity>
            <Text
              style={{
                color: '#777',
                fontWeight: '600',
                fontSize: font(12),
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {alerts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              backgroundColor: 'white',
              borderRadius: moderateScale(16),
              padding: moderateScale(12),
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.03,
              shadowRadius: 3,

              elevation: 1,
            }}
          >
            <View
              style={{
                width: moderateScale(42),
                height: moderateScale(42),
                borderRadius: 13,
                backgroundColor: item.bg,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.icon === 'call' ? (
                <MaterialIcons
                  name="phone-in-talk"
                  size={18}
                  color={item.color}
                />
              ) : item.icon ===
                'link' ? (
                <Feather
                  name="link"
                  size={18}
                  color={item.color}
                />
              ) : (
                <Ionicons
                  name="shield-checkmark"
                  size={18}
                  color={item.color}
                />
              )}
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: font(12),
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  marginTop: 2,
                  color: '#777',
                  fontSize: font(11),
                }}
              >
                {item.subtitle}
              </Text>
            </View>

            <Text
              style={{
                color: '#999',
                fontSize: font(10),
                fontWeight: '600',
              }}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
