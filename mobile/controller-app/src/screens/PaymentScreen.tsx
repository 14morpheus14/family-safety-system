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
} from '@expo/vector-icons';

export default function PaymentScreen({
  navigation,
  route,
}: any) {
  const amount =
    route?.params?.amount || 249;

  const plan =
    route?.params?.plan ||
    'Family Shield Premium';

  const billingType =
    route?.params?.billingType ||
    'monthly';

  const [method, setMethod] =
    useState('UPI');

  const methods = [
    {
      name: 'UPI',
      subtitle: 'Pay using any UPI app',
      icon: 'account-balance-wallet',
    },

    {
      name: 'Card',
      subtitle: 'Debit / Credit Card',
      icon: 'credit-card',
    },

    {
      name: 'Net Banking',
      subtitle: 'All major banks',
      icon: 'account-balance',
    },

    {
      name: 'Wallet',
      subtitle: 'Paytm, PhonePe & more',
      icon: 'wallet',
    },
  ];

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
          paddingTop: 58,
          paddingHorizontal: 22,
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 28,
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
            Payment
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 22,
            padding: 22,
            marginBottom: 28,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            {plan}
          </Text>

          <Text
            style={{
              fontSize: 38,
              fontWeight: '700',
              marginTop: 14,
            }}
          >
            ₹{amount}

            <Text
              style={{
                fontSize: 18,
                color: '#666',
              }}
            >
              {billingType === 'monthly'
                ? '/month'
                : '/year'}
            </Text>
          </Text>

          <View
            style={{
              marginTop: 16,
              backgroundColor: '#e8f8ef',
              alignSelf: 'flex-start',
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: '#1c8c5e',
                fontWeight: '700',
              }}
            >
              {billingType === 'monthly'
                ? 'Monthly Billing'
                : 'Yearly Billing'}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 16,
          }}
        >
          Payment Method
        </Text>

        {methods.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() =>
              setMethod(item.name)
            }
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 18,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth:
                method === item.name
                  ? 2
                  : 1,
              borderColor:
                method === item.name
                  ? '#1c8c5e'
                  : '#ececec',
            }}
          >
            <View
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                backgroundColor: '#e8f8ef',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons
                name={item.icon as any}
                size={26}
                color="#1c8c5e"
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
                  fontSize: 18,
                  fontWeight: '700',
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                  color: '#666',
                }}
              >
                {item.subtitle}
              </Text>
            </View>

            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#1c8c5e',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {method === item.name && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor:
                      '#1c8c5e',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            marginTop: 26,
            backgroundColor: '#1c8c5e',
            borderRadius: 18,
            paddingVertical: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            Pay Securely
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
