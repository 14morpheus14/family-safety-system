import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
          <Text style={styles.title}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.planCard}>
          <View style={styles.planRow}>
            <View style={styles.planIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.planTitle}>Family Shield Premium</Text>
              <Text style={styles.planSub}>₹249/month</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.methodCard}>
          <View style={styles.methodRow}>
            <Text style={styles.methodLabel}>UPI</Text>
            <View style={styles.selectedDot} />
          </View>
          <Text style={styles.methodSub}>Pay using any UPI app</Text>
        </View>

        <View style={styles.methodCard}>
          <Text style={styles.methodLabel}>Card</Text>
          <Text style={styles.methodSub}>Debit / Credit Card</Text>
        </View>

        <View style={styles.methodCard}>
          <Text style={styles.methodLabel}>Net Banking</Text>
          <Text style={styles.methodSub}>All major banks</Text>
        </View>

        <View style={styles.methodCard}>
          <Text style={styles.methodLabel}>Wallet</Text>
          <Text style={styles.methodSub}>Paytm, PhonePe & more</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Amount Payable</Text>
        <Text style={styles.amount}>₹249 <Text style={styles.amountSub}>/month</Text></Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Pay Securely</Text>
        </Pressable>

        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#2F855A" />
          <Text style={styles.secureText}>100% Secure Payments</Text>
        </View>
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
  planCard: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', padding: 16, marginTop: 18 },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center' },
  planTitle: { fontSize: 14, fontWeight: '800', color: '#111827' },
  planSub: { fontSize: 12, color: '#6B7280', marginTop: 3 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#111827', marginTop: 14, marginBottom: 10 },
  methodCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', padding: 14, marginBottom: 10 },
  methodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  methodLabel: { fontSize: 14, fontWeight: '700', color: '#111827' },
  methodSub: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  selectedDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#2F855A' },
  amount: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 14 },
  amountSub: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  button: { backgroundColor: '#2F855A', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 },
  secureText: { fontSize: 12, color: '#2F855A', fontWeight: '700' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
});
