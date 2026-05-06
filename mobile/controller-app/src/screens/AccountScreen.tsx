import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const items = [
  'Account Settings',
  'Notification Preferences',
  'Payment & Subscription',
  'Help & Support',
  'About Family Cyber Shield',
];

export default function AccountScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
          <Ionicons name="person-circle-outline" size={28} color="#111827" />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={26} color="#fff" />
          </View>
          <View>
            <Text style={styles.name}>Ankit Sharma</Text>
            <Text style={styles.email}>ankit.sharma@email.com</Text>
          </View>
        </View>

        <View style={styles.card}>
          {items.map((item, index) => (
            <View key={item} style={[styles.row, index !== items.length - 1 && styles.rowBorder]}>
              <Text style={styles.rowText}>{item}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          ))}
        </View>

        <Pressable style={styles.logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Family')}>
          <Ionicons name="people-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Family</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Alerts')}>
          <Ionicons name="alert-circle-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Alerts</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Protection')}>
          <Ionicons name="shield-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Protection</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person" size={22} color="#2F855A" />
          <Text style={[styles.navText, styles.navActive]}>Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F7F8' },
  content: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  profileCard: { marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '800', color: '#111827' },
  email: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  card: { marginTop: 16, backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rowText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  logout: { marginTop: 18, borderWidth: 1, borderColor: '#DC2626', borderRadius: 14, paddingVertical: 14, alignItems: 'center', backgroundColor: '#fff' },
  logoutText: { color: '#DC2626', fontWeight: '800' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
});
