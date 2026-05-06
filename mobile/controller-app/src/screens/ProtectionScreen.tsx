import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const protections = [
  { name: 'Scam Call Protection', desc: 'Blocking dangerous calls', route: 'ScamCall' },
  { name: 'SMS Protection', desc: 'Scanning SMS for threats', route: null },
  { name: 'Link Safety', desc: 'Checking links in real-time', route: 'LinkSafety' },
  { name: 'File Download Protection', desc: 'Scanning files for malware', route: 'FileProtection' },
  { name: 'Safe Browsing', desc: 'Blocking risky websites', route: null },
];

export default function ProtectionScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Ionicons name="shield-checkmark" size={24} color="#111827" />
        </View>

        <View style={styles.hero}>
          <View style={styles.shieldCircle}>
            <Ionicons name="shield-checkmark" size={34} color="#fff" />
          </View>
          <Text style={styles.title}>You are Protected</Text>
          <Text style={styles.subtitle}>All protection features are active</Text>
        </View>

        <View style={styles.card}>
          {protections.map((item, index) => {
            const Wrapper: any = item.route ? Pressable : View;
            return (
              <Wrapper
                key={item.name}
                onPress={item.route ? () => navigation.navigate(item.route) : undefined}
                style={({ pressed }: any) => [
                  styles.row,
                  index !== protections.length - 1 && styles.rowBorder,
                  pressed && item.route ? { opacity: 0.7 } : null,
                ]}
              >
                <View style={styles.left}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="checkmark-circle" size={20} color="#2F855A" />
                  </View>
                  <View>
                    <Text style={styles.rowTitle}>{item.name}</Text>
                    <Text style={styles.rowDesc}>{item.desc}</Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <Text style={styles.onText}>On</Text>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </View>
              </Wrapper>
            );
          })}

          <Pressable style={styles.helpBtn}>
            <Ionicons name="information-circle-outline" size={16} color="#2F855A" />
            <Text style={styles.helpText}>How Protection Works</Text>
          </Pressable>
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
          <Ionicons name="shield-checkmark" size={22} color="#2F855A" />
          <Text style={[styles.navText, styles.navActive]}>Protection</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Account')}>
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
  hero: { alignItems: 'center', marginTop: 18, marginBottom: 16 },
  shieldCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 6 },
  card: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, paddingVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  rowDesc: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onText: { fontSize: 12, color: '#2F855A', fontWeight: '700' },
  helpBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: '#F8FAFC' },
  helpText: { fontSize: 12, color: '#2F855A', fontWeight: '700' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
});
