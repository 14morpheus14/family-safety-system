import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const stats = [
  { label: 'Family Members', value: '5', level: 'safe' as const },
  { label: 'High Risks', value: '0', level: 'high' as const },
  { label: 'Low Risks', value: '2', level: 'moderate' as const },
  { label: 'Actions Taken', value: '24', level: 'safe' as const },
];

const alerts = [
  { title: 'Scam Call Blocked', subtitle: "Mom's phone", time: '10:30 AM', level: 'safe' as const },
  { title: 'Suspicious Link Detected', subtitle: 'Riya (iPhone)', time: '9:45 AM', level: 'moderate' as const },
  { title: 'Safe Mode Enabled', subtitle: "Dad's phone", time: 'Yesterday', level: 'safe' as const },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>FAMILY</Text>
            <Text style={styles.brand}>CYBER SHIELD</Text>
            <Text style={styles.tagline}>Protect What Matters Most</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>Good Morning, Ankit 👋</Text>
          <Text style={styles.subtext}>Your family is protected</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusTextBlock}>
            <Text style={styles.statusLabel}>Overall Family Status</Text>
            <Text style={styles.statusValue}>All Safe</Text>
            <Text style={styles.statusNote}>Great! No immediate risks</Text>
            <Text style={styles.lastConnect}>Last connect: Just now</Text>
          </View>
          <View style={styles.statusCircle}>
            <Ionicons name="checkmark" size={30} color="#fff" />
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text
                style={[
                  styles.statValue,
                  item.level === 'high' && styles.redText,
                  item.level === 'moderate' && styles.yellowText,
                  item.level === 'safe' && styles.greenText,
                ]}
              >
                {item.value}
              </Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.alertCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <Text style={styles.sectionAction}>View all</Text>
          </View>

          {alerts.map((a, index) => (
            <View key={`${a.title}-${index}`} style={styles.alertRow}>
              <View style={styles.alertIconWrap}>
                <Ionicons
                  name={a.level === 'moderate' ? 'alert' : 'call'}
                  size={18}
                  color={a.level === 'moderate' ? '#E7A21A' : '#2F855A'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.alertTopLine}>
                  <Text style={styles.alertTitle}>{a.title}</Text>
                  <Text style={styles.alertTime}>{a.time}</Text>
                </View>
                <Text style={styles.alertSubtitle}>{a.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={22} color="#2F855A" />
          <Text style={[styles.navText, styles.navActive]}>Home</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brand: { fontSize: 24, lineHeight: 22, fontWeight: '800', color: '#111827' },
  tagline: { marginTop: 8, fontSize: 12, color: '#6B7280' },
  greetingBlock: { marginTop: 28 },
  greeting: { fontSize: 21, fontWeight: '800', color: '#111827' },
  subtext: { marginTop: 6, fontSize: 13, color: '#6B7280' },
  statusCard: { marginTop: 18, backgroundColor: '#2F855A', borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center' },
  statusTextBlock: { flex: 1 },
  statusLabel: { color: '#D1FAE5', fontSize: 12 },
  statusValue: { color: '#fff', fontSize: 30, fontWeight: '800', marginTop: 6 },
  statusNote: { color: '#E7F7EE', marginTop: 4, fontSize: 12 },
  lastConnect: { color: '#D1FAE5', marginTop: 6, fontSize: 11 },
  statusCircle: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, justifyContent: 'space-between' },
  statCard: { width: '48%', marginBottom: 12, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 16, paddingHorizontal: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  statValue: { fontSize: 26, fontWeight: '800', color: '#111827' },
  statLabel: { marginTop: 8, fontSize: 12, color: '#6B7280' },
  alertCard: { marginTop: 4, backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  sectionAction: { fontSize: 12, color: '#6B7280' },
  alertRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  alertIconWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  alertTopLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  alertTitle: { fontSize: 14, fontWeight: '700', color: '#111827', flex: 1, paddingRight: 8 },
  alertSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  alertTime: { fontSize: 12, color: '#6B7280' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
  greenText: { color: '#2F855A' },
  redText: { color: '#DC2626' },
  yellowText: { color: '#E7A21A' },
});
