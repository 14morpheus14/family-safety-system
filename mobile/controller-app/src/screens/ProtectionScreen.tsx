import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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

const protections = [
  {
    id: 1,
    title: 'Scam Call Protection',
    subtitle:
      'Blocking dangerous calls',

    icon: 'call',
  },

  {
    id: 2,
    title: 'SMS Protection',
    subtitle:
      'Scanning SMS for threats',

    icon: 'chatbox',
  },

  {
    id: 3,
    title: 'Link Safety',
    subtitle:
      'Checking links in real-time',

    icon: 'link',
  },

  {
    id: 4,
    title:
      'File Download Protection',

    subtitle:
      'Scanning files for malware',

    icon: 'document',
  },

  {
    id: 5,
    title: 'Safe Browsing',
    subtitle:
      'Blocking risky websites',

    icon: 'shield',
  },
];

export default function ProtectionScreen({
  navigation,
}) {
  const renderIcon = (
    icon
  ) => {
    if (icon === 'call') {
      return (
        <MaterialIcons
          name="phone-in-talk"
          size={moderateScale(20)}
          color="#1c8c5e"
        />
      );
    }

    if (icon === 'chatbox') {
      return (
        <Ionicons
          name="chatbox"
          size={moderateScale(20)}
          color="#1c8c5e"
        />
      );
    }

    if (icon === 'link') {
      return (
        <Feather
          name="link"
          size={moderateScale(20)}
          color="#1c8c5e"
        />
      );
    }

    if (icon === 'document') {
      return (
        <Ionicons
          name="document"
          size={moderateScale(20)}
          color="#1c8c5e"
        />
      );
    }

    return (
      <Ionicons
        name="shield-checkmark"
        size={moderateScale(20)}
        color="#1c8c5e"
      />
    );
  };

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
              moderateScale(16),

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Home'
              )
            }
            style={{
              width:
                moderateScale(38),

              height:
                moderateScale(38),

              borderRadius:
                moderateScale(19),

              justifyContent:
                'center',

              alignItems:
                'center',

              marginBottom:
                verticalModerateScale(
                  2
                ),
            }}
          >
            <Ionicons
              name="arrow-back"
              size={moderateScale(20)}
              color="#111"
            />
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'SafeMode'
                )
              }
              style={{
                width:
                  moderateScale(140),

                height:
                  moderateScale(140),

                borderRadius:
                  moderateScale(70),

                backgroundColor:
                  '#dff5ea',

                justifyContent:
                  'center',

                alignItems:
                  'center',

                marginBottom:
                  verticalModerateScale(
                    10
                  ),
              }}
            >
              <View
                style={{
                  width:
                    moderateScale(112),

                  height:
                    moderateScale(112),

                  borderRadius:
                    moderateScale(56),

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
                  size={moderateScale(56)}
                  color="#b7ffd7"
                />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: font(22),

                fontWeight: '700',

                color: '#111',
              }}
            >
              You are Protected
            </Text>

            <Text
              style={{
                marginTop:
                  verticalModerateScale(
                    6
                  ),

                fontSize: font(13),

                color: '#777',
              }}
            >
              All protection features are active
            </Text>
          </View>

          <View
            style={{
              width: '100%',

              marginTop:
                verticalModerateScale(24),
            }}
          >
            {protections.map(
              (item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    if (
                      item.title ===
                      'Link Safety'
                    ) {
                      navigation.navigate(
                        'LinkSafety'
                      );
                    }
                  }}
                  style={{
                    flexDirection:
                      'row',

                    alignItems:
                      'center',

                    paddingVertical:
                      verticalModerateScale(
                        14
                      ),

                    borderBottomWidth:
                      1,

                    borderBottomColor:
                      '#f1f1f1',
                  }}
                >
                  <View
                    style={{
                      width:
                        moderateScale(
                          42
                        ),

                      height:
                        moderateScale(
                          42
                        ),

                      borderRadius:
                        moderateScale(
                          14
                        ),

                      backgroundColor:
                        '#e8f8ef',

                      justifyContent:
                        'center',

                      alignItems:
                        'center',
                    }}
                  >
                    {renderIcon(
                      item.icon
                    )}
                  </View>

                  <View
                    style={{
                      flex: 1,

                      marginLeft:
                        moderateScale(
                          12
                        ),
                    }}
                  >
                    <Text
                      style={{
                        fontSize:
                          font(14),

                        fontWeight:
                          '700',

                        color:
                          '#111',
                      }}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={{
                        marginTop:
                          verticalModerateScale(
                            2
                          ),

                        fontSize:
                          font(11),

                        color:
                          '#777',
                      }}
                    >
                      {item.subtitle}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize:
                        font(12),

                      fontWeight:
                        '700',

                      color:
                        '#1c8c5e',

                      marginRight:
                        moderateScale(
                          8
                        ),
                    }}
                  >
                    On
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={moderateScale(
                      18
                    )}
                    color="#999"
                  />
                </TouchableOpacity>
              )
            )}
          </View>

          <TouchableOpacity
            style={{
              marginTop:
                verticalModerateScale(
                  18
                ),

              borderWidth: 1,

              borderColor:
                '#e8f1eb',

              borderRadius:
                moderateScale(14),

              paddingVertical:
                verticalModerateScale(
                  12
                ),

              width: '100%',

              alignItems:
                'center',

              flexDirection:
                'row',

              justifyContent:
                'center',
            }}
          >
            <Ionicons
              name="information-circle"
              size={moderateScale(16)}
              color="#5a8f73"
            />

            <Text
              style={{
                marginLeft:
                  moderateScale(6),

                fontSize: font(12),

                color: '#5a8f73',

                fontWeight: '600',
              }}
            >
              How Protection Works
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
