import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  showBack?: boolean;
}

export default function Header({
  title,
  showBack = false,
}: Props) {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
      }}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text
        style={{
          fontSize: 22,
          fontWeight: '700',
          marginLeft: 16,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
