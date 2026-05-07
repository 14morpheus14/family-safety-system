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
} from '@expo/vector-icons';

export default function HomeScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: 60,
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color: '#111',
                }}
              >
                Good Morning, Ankit 👋
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: '#666',
                  fontSize: 15,
                }}
              >
                Your family is protected
              </Text>
            </View>

            <Ionicons
              name="notifications"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: '#1c8c5e',
              borderRadius: 20,
              padding: 22,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}
            >
              Overall Family Status
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 34,
                fontWeight: '700',
                marginTop: 10,
              }}
            >
              All Safe
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 10,
                opacity: 0.9,
              }}
            >
              Great! No immediate risks
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '23%',
                borderRadius: 16,
                padding: 14,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                }}
              >
                5
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 6,
                  color: '#666',
                }}
              >
                Family Members
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                width: '23%',
                borderRadius: 16,
                padding: 14,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: 'red',
                }}
              >
                0
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 6,
                  color: '#666',
                }}
              >
                High Risks
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                width: '23%',
                borderRadius: 16,
                padding: 14,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#f39c12',
                }}
              >
                2
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 6,
                  color: '#666',
                }}
              >
                Low Risks
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                width: '23%',
                borderRadius: 16,
                padding: 14,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                }}
              >
                24
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 6,
                  color: '#666',
                }}
              >
                Actions
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                }}
              >
                Recent Alerts
              </Text>

              <Text
                style={{
                  color: '#1c8c5e',
                  fontWeight: '600',
                }}
              >
                View all
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ScamCall')
              }
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                padding: 18,
                marginTop: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#e8f8ef',
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <MaterialIcons
                  name="phone-in-talk"
                  size={24}
                  color="#1c8c5e"
                />
              </View>

              <View
                style={{
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  Scam Call Blocked
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#777',
                  }}
                >
                  Mom's phone
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LinkSafety')
              }
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                padding: 18,
                marginTop: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff5e5',
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <Ionicons
                  name="link"
                  size={24}
                  color="#f39c12"
                />
              </View>

              <View
                style={{
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  Suspicious Link Detected
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: '#777',
                  }}
                >
                  Riya (iPhone)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
