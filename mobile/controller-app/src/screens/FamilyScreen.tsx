import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  moderateScale,
  verticalModerateScale,
  font,
} from '../utils/responsive';

const familyMembers = [
  {
    id: 1,
    name: 'Dad',
    device: 'Redmi Note 12',
    status: 'All Safe',
    risk: false,
  },

  {
    id: 2,
    name: 'Mom',
    device: 'Samsung Galaxy A14',
    status: 'Risk (1)',
    risk: true,
  },

  {
    id: 3,
    name: 'Riya (Daughter)',
    device: 'iPhone 13',
    status: 'Risk (2)',
    risk: true,
  },

  {
    id: 4,
    name: 'Aarav (Son)',
    device: 'Realme Narzo 50',
    status: 'All Safe',
    risk: false,
  },

  {
    id: 5,
    name: 'Dadi',
    device: 'JioPhone Next',
    status: 'All Safe',
    risk: false,
  },

  {
    id: 6,
    name: 'Rahul',
    device: 'OnePlus Nord',
    status: 'Risk (1)',
    risk: true,
  },

  {
    id: 7,
    name: 'Priya',
    device: 'Moto G54',
    status: 'All Safe',
    risk: false,
  },

  {
    id: 8,
    name: 'Karan',
    device: 'Samsung M14',
    status: 'Risk (3)',
    risk: true,
  },

  {
    id: 9,
    name: 'Anaya',
    device: 'iPhone 14',
    status: 'All Safe',
    risk: false,
  },

  {
    id: 10,
    name: 'Grandpa',
    device: 'Nokia G42',
    status: 'All Safe',
    risk: false,
  },
];

export default function FamilyScreen() {
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
              verticalModerateScale(18),
          }}
        >
          <Text
            style={{
              fontSize: font(22),
              fontWeight: '700',
              color: '#111',
            }}
          >
            Family
          </Text>

          <TouchableOpacity
            style={{
              width: moderateScale(34),
              height: moderateScale(34),

              borderRadius:
                moderateScale(17),

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
              name="add"
              size={moderateScale(18)}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: 'white',

            borderRadius:
              moderateScale(24),

            padding: moderateScale(18),

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
                'space-around',

              marginBottom:
                verticalModerateScale(18),
            }}
          >
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#1c8c5e',
                  fontWeight: '700',
                  fontSize: font(13),
                }}
              >
                Overview
              </Text>

              <View
                style={{
                  marginTop:
                    verticalModerateScale(8),

                  width: moderateScale(70),

                  height: 3,

                  borderRadius: 2,

                  backgroundColor:
                    '#1c8c5e',
                }}
              />
            </View>

            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#999',
                  fontWeight: '600',
                  fontSize: font(13),
                }}
              >
                Devices
              </Text>
            </View>
          </View>

          {familyMembers.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                marginBottom:
                  verticalModerateScale(18),
              }}
            >
              <View
                style={{
                  width: moderateScale(46),
                  height: moderateScale(46),

                  borderRadius:
                    moderateScale(23),

                  backgroundColor:
                    '#e6e6e6',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="person"
                  size={moderateScale(22)}
                  color="#777"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft:
                    moderateScale(12),
                }}
              >
                <Text
                  style={{
                    fontSize: font(14),
                    fontWeight: '700',
                    color: '#111',
                  }}
                >
                  {member.name}
                </Text>

                <Text
                  style={{
                    marginTop:
                      verticalModerateScale(2),

                    fontSize: font(11),
                    color: '#888',
                  }}
                >
                  {member.device}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: font(12),

                    fontWeight: '700',

                    color: member.risk
                      ? '#f5a623'
                      : '#1c8c5e',
                  }}
                >
                  {member.status}
                </Text>

                {member.risk && (
                  <View
                    style={{
                      marginLeft:
                        moderateScale(6),

                      width:
                        moderateScale(16),

                      height:
                        moderateScale(16),

                      borderRadius:
                        moderateScale(8),

                      backgroundColor:
                        '#f5a623',

                      justifyContent:
                        'center',

                      alignItems:
                        'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: font(10),
                        fontWeight: '700',
                      }}
                    >
                      !
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              marginTop:
                verticalModerateScale(8),

              borderWidth: 1,
              borderColor: '#ececec',

              borderRadius:
                moderateScale(18),

              padding:
                moderateScale(16),

              flexDirection: 'row',

              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: moderateScale(36),
                height: moderateScale(36),

                borderRadius:
                  moderateScale(18),

                backgroundColor:
                  '#f4f4f4',

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="person-add"
                size={moderateScale(18)}
                color="#666"
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft:
                  moderateScale(12),
              }}
            >
              <Text
                style={{
                  fontSize: font(14),
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Add Family Member
              </Text>

              <Text
                style={{
                  marginTop:
                    verticalModerateScale(2),

                  fontSize: font(11),
                  color: '#888',
                }}
              >
                Protect more loved ones
              </Text>
            </View>

            <View
              style={{
                width: moderateScale(34),
                height: moderateScale(34),

                borderRadius:
                  moderateScale(17),

                backgroundColor:
                  '#1c8c5e',

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="add"
                size={moderateScale(18)}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
