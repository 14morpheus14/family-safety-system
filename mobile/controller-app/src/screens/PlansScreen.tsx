import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlansScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
          <Text style={styles.title}>Choose Your Plan</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchActive}>Monthly</Text>
          <Text style={styles.switch}>Yearly</Text>
          <Text style={styles.saveTag}>Save 20%</Text>
        </View>

        <View style={styles.cardActive}>
          <View style={styles.cardHeader}>
            <Text style={styles.planTitle}>Family Shield Premium</Text>
            <View style={styles.popularTag}>
              <Text style={styles.popularText}>Most Popular</Text>
            </View>
          </View>
          <Text style={styles.price}>₹249 <Text style={styles.perMonth}>/month</Text></Text>
          <View style={styles.featureList}>
            {['Protect up to 10 family members', 'Scam Call, SMS & Link Protection', 'File Download Protection', 'Safe Browsing', 'Family Risk Dashboard', 'Priority Support'].map((f) => (
              <View key={f} style={styles.featureRow}>
                <Ionicons name="checkmark" size={16} color="#2F855A" />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.planTitle}>Family Shield Basic</Text>
            <View style={styles.radio} />
          </View>
          <Text style={styles.price}>₹149 <Text style={styles.perMonth}>/month</Text></Text>
          <View style={styles.featureList}>
            <View style={styles.featureRow}>
              <Ionicons name="checkmark" size={16} color="#2F855A" />
              <Text style={styles.featureText}>Protect up to 5 family members</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue to Payment</Text>
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

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('SafeMode')}>
          <Ionicons name="person-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F7F8' },
  content: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18, marginBottom: 14 },
  switchActive: { fontSize: 14, color: '#111827', fontWeight: '700' },
  switch: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  saveTag: { backgroundColor: '#ECFDF5', color: '#2F855A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: 'hidden', fontSize: 11, fontWeight: '700' },
  cardActive: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#2F855A', padding: 16, marginBottom: 14 },
  card: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  popularTag: { backgroundColor: '#2F855A', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  popularText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#D1D5DB' },
  price: { fontSize: 24, fontWeight: '800', color: '#111827', marginTop: 10 },
  perMonth: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  featureList: { marginTop: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  featureText: { fontSize: 13, color: '#111827' },
  button: { marginTop: 18, backgroundColor: '#2F855A', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
});
