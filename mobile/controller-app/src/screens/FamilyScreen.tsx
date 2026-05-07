import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import Header from '../components/Header';

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
];

export default function FamilyScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header title="Family" />

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
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#1c8c5e',
                }}
              >
                Overview
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: '#777',
                }}
              >
                Devices
              </Text>
            </View>

            {familyMembers.map((member) => (
              <TouchableOpacity
                key={member.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 30,
                    backgroundColor: '#ddd',
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    marginLeft: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '600',
                    }}
                  >
                    {member.name}
                  </Text>

                  <Text
                    style={{
                      marginTop: 4,
                      color: '#777',
                    }}
                  >
                    {member.device}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: member.risk
                      ? '#fff3e0'
                      : '#e8f8ef',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      color: member.risk
                        ? '#f39c12'
                        : '#1c8c5e',
                      fontWeight: '700',
                    }}
                  >
                    {member.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: '#f5f5f5',
                borderRadius: 18,
                padding: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  Add Family Member
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#777',
                  }}
                >
                  Protect more loved ones
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#1c8c5e',
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="add"
                  size={26}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
