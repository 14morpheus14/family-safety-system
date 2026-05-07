import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function PaymentsMenuScreen({
  navigation,
}: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 58,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 34,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '700',
            marginRight: 24,
          }}
        >
          Payments
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Payment', {
            amount: 249,
            plan: 'Family Shield Premium',
          })
        }
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 24,
          marginBottom: 22,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            backgroundColor: '#e8f8ef',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="card-outline"
            size={28}
            color="#1c8c5e"
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 18,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            Payments
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: '#666',
              fontSize: 15,
            }}
          >
            Manage billing & payments
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#999"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Subscription'
          )
        }
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            backgroundColor: '#e8f8ef',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={28}
            color="#1c8c5e"
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 18,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            Subscription
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: '#666',
              fontSize: 15,
            }}
          >
            View & change plans
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#999"
        />
      </TouchableOpacity>
    </View>
  );
}
