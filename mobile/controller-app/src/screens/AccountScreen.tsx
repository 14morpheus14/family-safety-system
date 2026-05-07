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
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Header from '../components/Header';

const menuItems = [
  {
    id: 1,
    title: 'Account Settings',
    icon: 'person-outline',
  },

  {
    id: 2,
    title: 'Notification Preferences',
    icon: 'notifications-outline',
  },

  {
    id: 3,
    title: 'Payment & Subscription',
    icon: 'card-outline',
    screen: 'PaymentsMenu',
  },

  {
    id: 4,
    title: 'Help & Support',
    icon: 'help-circle-outline',
  },

  {
    id: 5,
    title: 'About Family Cyber Shield',
    icon: 'information-circle-outline',
  },
];

export default function AccountScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header title="Account" />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 22,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="person"
                size={34}
                color="#666"
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
                  fontSize: 22,
                  fontWeight: '700',
                }}
              >
                Ankit Sharma
              </Text>

              <Text
                style={{
                  marginTop: 5,
                  color: '#777',
                  fontSize: 15,
                }}
              >
                ankit.sharma@email.com
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999"
            />
          </TouchableOpacity>

          <Text
            style={{
              marginTop: 30,
              marginBottom: 14,
              color: '#777',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Manage
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 22,
              overflow: 'hidden',
            }}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                  borderBottomWidth:
                    index !== menuItems.length - 1
                      ? 1
                      : 0,
                  borderBottomColor: '#f0f0f0',
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color="#666"
                />

                <Text
                  style={{
                    flex: 1,
                    marginLeft: 16,
                    fontSize: 17,
                    fontWeight: '500',
                  }}
                >
                  {item.title}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{
              marginTop: 30,
              borderWidth: 1.5,
              borderColor: '#f5b7b1',
              borderRadius: 18,
              paddingVertical: 18,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <Text
              style={{
                color: '#e53935',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
