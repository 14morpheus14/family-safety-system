import React, {
  useState,
} from 'react';

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

const alerts = [
  {
    id: 1,
    section: 'Today',
    title: 'Scam Call Blocked',
    subtitle: '+91 98765 43210',
    user: "Mom's phone",
    time: '10:30 AM',
    level: 'high',
    icon: 'call',
    color: '#ff4d4f',
    bg: '#ffecec',
  },

  {
    id: 2,
    section: 'Today',
    title:
      'Suspicious Link Detected',

    subtitle: 'bit.ly/xyz123',

    user: 'Riya (iPhone)',

    time: '9:45 AM',

    level: 'high',

    icon: 'link',

    color: '#f5a623',

    bg: '#fff4e5',
  },

  {
    id: 3,
    section: 'Today',
    title:
      'Suspicious File Detected',

    subtitle: 'invoice.apk',

    user: "Dad's phone",

    time: '9:20 AM',

    level: 'high',

    icon: 'file',

    color: '#ff4d4f',

    bg: '#ffecec',
  },

  {
    id: 4,
    section: 'Today',
    title: 'Safe Browsing',

    subtitle:
      'Blocked risky website',

    user: 'Aarav (Realme Narzo 50)',

    time: '8:15 AM',

    level: 'low',

    icon: 'shield',

    color: '#1c8c5e',

    bg: '#e8f8ef',
  },

  {
    id: 5,
    section: 'Yesterday',
    title:
      'SMS from Unknown Sender',

    subtitle: '+91 76543 21098',

    user: 'Dadi (JioPhone Next)',

    time: '7:30 PM',

    level: 'low',

    icon: 'chatbox',

    color: '#f5a623',

    bg: '#fff4e5',
  },
];

export default function AlertsScreen() {
  const [selectedTab, setSelectedTab] =
    useState('all');

  const filteredAlerts =
    selectedTab === 'all'
      ? alerts
      : selectedTab === 'high'
      ? alerts.filter(
          (item) =>
            item.level === 'high'
        )
      : alerts.filter(
          (item) =>
            item.level === 'low'
        );

  const sections = [
    'Today',
    'Yesterday',
  ];

  const renderIcon = (
    type,
    color
  ) => {
    if (type === 'call') {
      return (
        <MaterialIcons
          name="phone-in-talk"
          size={moderateScale(18)}
          color={color}
        />
      );
    }

    if (type === 'link') {
      return (
        <Feather
          name="link"
          size={moderateScale(18)}
          color={color}
        />
      );
    }

    if (type === 'file') {
      return (
        <Ionicons
          name="document"
          size={moderateScale(18)}
          color={color}
        />
      );
    }

    if (type === 'chatbox') {
      return (
        <Ionicons
          name="chatbox"
          size={moderateScale(18)}
          color={color}
        />
      );
    }

    return (
      <Ionicons
        name="shield-checkmark"
        size={moderateScale(18)}
        color={color}
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
            verticalModerateScale(40),

          paddingHorizontal:
            moderateScale(16),

          paddingBottom:
            verticalModerateScale(20),
        }}
      >
        <View
          style={{
            flexDirection: 'row',

            justifyContent:
              'space-between',

            alignItems: 'center',

            marginBottom:
              verticalModerateScale(20),
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={moderateScale(22)}
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
            Alerts
          </Text>

          <TouchableOpacity>
            <Ionicons
              name="swap-vertical"
              size={moderateScale(20)}
              color="#444"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',

            justifyContent:
              'space-between',

            marginBottom:
              verticalModerateScale(22),
          }}
        >
          {[
            {
              label: 'All',
              value: 'all',
            },

            {
              label: 'High Risk',
              value: 'high',
            },

            {
              label: 'Low Risk',
              value: 'low',
            },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.value}
              onPress={() =>
                setSelectedTab(tab.value)
              }
              style={{
                flex: 1,

                marginHorizontal:
                  moderateScale(4),

                backgroundColor:
                  selectedTab ===
                  tab.value
                    ? '#1c8c5e'
                    : '#f1f1f1',

                paddingVertical:
                  verticalModerateScale(
                    10
                  ),

                borderRadius:
                  moderateScale(12),

                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: font(12),

                  fontWeight: '700',

                  color:
                    selectedTab ===
                    tab.value
                      ? 'white'
                      : '#555',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {sections.map((section) => {
          const sectionAlerts =
            filteredAlerts.filter(
              (item) =>
                item.section === section
            );

          if (
            sectionAlerts.length === 0
          ) {
            return null;
          }

          return (
            <View
              key={section}
            >
              <Text
                style={{
                  fontSize: font(13),

                  fontWeight: '700',

                  color: '#777',

                  marginBottom:
                    verticalModerateScale(
                      14
                    ),
                }}
              >
                {section}
              </Text>

              {sectionAlerts.map(
                (item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      flexDirection:
                        'row',

                      alignItems:
                        'center',

                      marginBottom:
                        verticalModerateScale(
                          18
                        ),
                    }}
                  >
                    <View
                      style={{
                        width:
                          moderateScale(
                            44
                          ),

                        height:
                          moderateScale(
                            44
                          ),

                        borderRadius:
                          moderateScale(
                            14
                          ),

                        backgroundColor:
                          item.bg,

                        justifyContent:
                          'center',

                        alignItems:
                          'center',
                      }}
                    >
                      {renderIcon(
                        item.icon,
                        item.color
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

                      <Text
                        style={{
                          marginTop:
                            verticalModerateScale(
                              2
                            ),

                          fontSize:
                            font(11),

                          color:
                            '#999',
                        }}
                      >
                        {item.user}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems:
                          'flex-end',
                      }}
                    >
                      <Text
                        style={{
                          fontSize:
                            font(11),

                          color:
                            '#999',

                          fontWeight:
                            '600',
                        }}
                      >
                        {item.time}
                      </Text>

                      <Text
                        style={{
                          marginTop:
                            verticalModerateScale(
                              10
                            ),

                          fontSize:
                            font(11),

                          fontWeight:
                            '700',

                          color:
                            item.level ===
                            'high'
                              ? '#ff4d4f'
                              : '#1c8c5e',
                        }}
                      >
                        {item.level ===
                        'high'
                          ? 'High'
                          : 'Low'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
