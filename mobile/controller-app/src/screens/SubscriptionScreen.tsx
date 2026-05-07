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
} from '@expo/vector-icons';

export default function SubscriptionScreen({
  navigation,
}: any) {
  const [selectedPlan, setSelectedPlan] =
    useState('premium');

  const [billingType, setBillingType] =
    useState('monthly');

  const premiumPrice =
    billingType === 'monthly'
      ? 249
      : 2399;

  const basicPrice =
    billingType === 'monthly'
      ? 149
      : 1499;

  const premiumLabel =
    billingType === 'monthly'
      ? '/month'
      : '/year';

  const basicLabel =
    billingType === 'monthly'
      ? '/month'
      : '/year';

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
            marginBottom: 26,
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
            Choose Your Plan
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#ececec',
            borderRadius: 16,
            padding: 4,
            marginBottom: 28,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setBillingType('monthly')
            }
            style={{
              flex: 1,
              backgroundColor:
                billingType === 'monthly'
                  ? 'white'
                  : 'transparent',
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: '700',
                color:
                  billingType === 'monthly'
                    ? '#111'
                    : '#666',
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setBillingType('yearly')
            }
            style={{
              flex: 1,
              backgroundColor:
                billingType === 'yearly'
                  ? 'white'
                  : 'transparent',
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color:
                    billingType === 'yearly'
                      ? '#111'
                      : '#666',
                }}
              >
                Yearly
              </Text>

              <View
                style={{
                  marginLeft: 8,
                  backgroundColor:
                    '#1c8c5e',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 11,
                    fontWeight: '700',
                  }}
                >
                  SAVE 20%
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            setSelectedPlan('premium')
          }
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 24,
            borderWidth:
              selectedPlan === 'premium'
                ? 2
                : 1,
            borderColor:
              selectedPlan === 'premium'
                ? '#1c8c5e'
                : '#e6e6e6',
            marginBottom: 22,
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
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
              }}
            >
              Family Shield Premium
            </Text>

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
              {selectedPlan ===
                'premium' && (
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
          </View>

          <Text
            style={{
              fontSize: 38,
              fontWeight: '700',
              marginTop: 18,
            }}
          >
            ₹{premiumPrice}

            <Text
              style={{
                fontSize: 18,
                color: '#666',
              }}
            >
              {premiumLabel}
            </Text>
          </Text>

          {billingType ===
            'yearly' && (
            <Text
              style={{
                marginTop: 8,
                color: '#1c8c5e',
                fontWeight: '700',
              }}
            >
              Save ₹589 yearly
            </Text>
          )}

          <View
            style={{
              marginTop: 24,
            }}
          >
            {[
              'Protect up to 10 family members',
              'Scam Call Protection',
              'Link Safety',
              'File Download Protection',
              'Safe Browsing',
              'Priority Support',
            ].map((feature) => (
              <View
                key={feature}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={20}
                  color="#1c8c5e"
                />

                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 16,
                    color: '#333',
                  }}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setSelectedPlan('basic')
          }
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 24,
            borderWidth:
              selectedPlan === 'basic'
                ? 2
                : 1,
            borderColor:
              selectedPlan === 'basic'
                ? '#1c8c5e'
                : '#e6e6e6',
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
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
              }}
            >
              Family Shield Basic
            </Text>

            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#bbb',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedPlan ===
                'basic' && (
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
          </View>

          <Text
            style={{
              fontSize: 38,
              fontWeight: '700',
              marginTop: 18,
            }}
          >
            ₹{basicPrice}

            <Text
              style={{
                fontSize: 18,
                color: '#666',
              }}
            >
              {basicLabel}
            </Text>
          </Text>

          {billingType ===
            'yearly' && (
            <Text
              style={{
                marginTop: 8,
                color: '#1c8c5e',
                fontWeight: '700',
              }}
            >
              Save ₹289 yearly
            </Text>
          )}

          <View
            style={{
              marginTop: 24,
            }}
          >
            {[
              'Protect up to 5 family members',
              'Scam Call Protection',
              'Link Safety',
            ].map((feature) => (
              <View
                key={feature}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={20}
                  color="#1c8c5e"
                />

                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 16,
                    color: '#333',
                  }}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Payment', {
              amount:
                selectedPlan === 'premium'
                  ? premiumPrice
                  : basicPrice,

              plan:
                selectedPlan === 'premium'
                  ? 'Family Shield Premium'
                  : 'Family Shield Basic',

              billingType,
            })
          }
          style={{
            marginTop: 34,
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
            Continue to Payment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
