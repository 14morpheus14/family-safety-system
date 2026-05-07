import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';

import {
  Ionicons,
  Feather,
} from '@expo/vector-icons';

import {
  moderateScale,
  verticalModerateScale,
  font,
} from '../utils/responsive';

const features = [
  {
    id: 1,
    text: 'Blocks scam calls & spam',
    icon: 'phone-call',
  },

  {
    id: 2,
    text:
      'Blocks suspicious links & websites',

    icon: 'link',
  },

  {
    id: 3,
    text:
      'Warns before file downloads',

    icon: 'download',
  },

  {
    id: 4,
    text:
      'Extra protection for payments',

    icon: 'credit-card',
  },
];

export default function SafeModeScreen({
  navigation,
}) {
  const [enabled, setEnabled] =
    useState(true);

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
          paddingTop:
            verticalModerateScale(24),

          paddingHorizontal:
            moderateScale(16),

          paddingBottom:
            verticalModerateScale(20),
        }}
      >
        <View
          style={{
            backgroundColor: 'white',

            borderRadius:
              moderateScale(28),

            padding:
              moderateScale(18),

            shadowColor: '#000',

            shadowOffset: {
              width: 0,
              height: 2,
            },

            shadowOpacity: 0.04,
            shadowRadius: 4,

            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',

              justifyContent:
                'space-between',

              alignItems: 'center',

              marginBottom:
                verticalModerateScale(
                  8
                ),
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }
            >
              <Ionicons
                name="arrow-back"
                size={moderateScale(20)}
                color="#111"
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: font(20),

                fontWeight: '700',

                color: '#111',
              }}
            >
              Safe Mode
            </Text>

            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={moderateScale(22)}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width:
                  moderateScale(160),

                height:
                  moderateScale(160),

                borderRadius:
                  moderateScale(80),

                backgroundColor:
                  '#dff5ea',

                justifyContent:
                  'center',

                alignItems:
                  'center',

                marginTop:
                  verticalModerateScale(
                    8
                  ),

                marginBottom:
                  verticalModerateScale(
                    16
                  ),
              }}
            >
              <View
                style={{
                  width:
                    moderateScale(128),

                  height:
                    moderateScale(128),

                  borderRadius:
                    moderateScale(64),

                  backgroundColor:
                    '#0f7d57',

                  justifyContent:
                    'center',

                  alignItems:
                    'center',
                }}
              >
                <Ionicons
                  name="shield-checkmark"

                  size={moderateScale(64)}

                  color="#b7ffd7"
                />
              </View>
            </View>

            <Text
              style={{
                fontSize: font(22),

                fontWeight: '700',

                color: '#111',
              }}
            >
              Safe Mode is ON
            </Text>

            <Text
              style={{
                marginTop:
                  verticalModerateScale(
                    6
                  ),

                fontSize: font(13),

                color: '#666',

                textAlign: 'center',

                lineHeight:
                  moderateScale(20),

                width: '85%',
              }}
            >
              Strict protection is active for all family members.
            </Text>

            <TouchableOpacity
              onPress={() =>
                setEnabled(
                  !enabled
                )
              }
              activeOpacity={0.9}
              style={{
                marginTop:
                  verticalModerateScale(
                    18
                  ),

                marginBottom:
                  verticalModerateScale(
                    24
                  ),

                width:
                  moderateScale(54),

                height:
                  moderateScale(32),

                borderRadius:
                  moderateScale(16),

                backgroundColor:
                  enabled
                    ? '#0f7d57'
                    : '#d9d9d9',

                justifyContent:
                  'center',

                paddingHorizontal:
                  moderateScale(3),
              }}
            >
              <View
                style={{
                  width:
                    moderateScale(26),

                  height:
                    moderateScale(26),

                  borderRadius:
                    moderateScale(13),

                  backgroundColor:
                    'white',

                  transform: [
                    {
                      translateX:
                        enabled
                          ? moderateScale(
                              22
                            )
                          : 0,
                    },
                  ],

                  shadowColor:
                    '#000',

                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },

                  shadowOpacity:
                    0.15,

                  shadowRadius: 2,

                  elevation: 2,
                }}
              />
            </TouchableOpacity>
          </View>

          {features.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                marginBottom:
                  verticalModerateScale(
                    20
                  ),
              }}
            >
              <View
                style={{
                  width:
                    moderateScale(34),

                  alignItems:
                    'center',
                }}
              >
                <Feather
                  name={item.icon}
                  size={moderateScale(18)}
                  color="#1c8c5e"
                />
              </View>

              <Text
                style={{
                  flex: 1,

                  fontSize: font(13),

                  color: '#333',

                  fontWeight: '500',
                }}
              >
                {item.text}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={{
              marginTop:
                verticalModerateScale(
                  8
                ),

              borderWidth: 1.5,

              borderColor:
                '#8fd0ac',

              borderRadius:
                moderateScale(14),

              paddingVertical:
                verticalModerateScale(
                  14
                ),

              alignItems:
                'center',
            }}
          >
            <Text
              style={{
                fontSize: font(14),

                fontWeight: '700',

                color: '#1c8c5e',
              }}
            >
              Turn Off Safe Mode
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
