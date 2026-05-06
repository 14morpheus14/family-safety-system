import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const links = [
  { url: 'bit.ly/xyz123', status: 'Blocked', source: "Mom's phone", time: '10:30 AM', level: 'high' as const },
  { url: 'safe.com/help', status: 'Safe', source: "Dad's phone", time: '9:15 AM', level: 'safe' as const },
  { url: 'phish.site/login', status: 'Blocked', source: 'Riya (iPhone)', time: 'Yesterday', level: 'high' as const },
];

export default function LinkSafetyScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Protection')}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Ionicons name="settings-outline" size={22} color="#111827" />
        </View>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <Ionicons name="link" size={38} color="#fff" />
          </View>
          <Text style={styles.title}>Safe link checking is on</Text>
          <Text style={styles.subtitle}>Suspicious links are flagged before anyone opens them.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Recent Link Activity</Text>
            <Text style={styles.sectionAction}>View all</Text>
          </View>

          {links.map((item, index) => (
            <View key={item.url} style={[styles.row, index !== links.length - 1 && styles.rowBorder]}>
              <View style={[styles.dot, item.level === 'high' ? styles.redSoft : styles.greenSoft]}>
                <Ionicons name="link" size={18} color={item.level === 'high' ? '#DC2626' : '#2F855A'} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowTitle}>{item.url}</Text>
                  <Text style={[styles.statusText, item.level === 'high' ? styles.red : styles.green]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.rowWho}>{item.source}</Text>
                <Text style={styles.rowTime}>{item.time}</Text>
              </View>
            </View>
          ))}
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
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#2F855A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 6, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  sectionAction: { fontSize: 12, color: '#6B7280' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  greenSoft: { backgroundColor: '#ECFDF5' },
  redSoft: { backgroundColor: '#FEF2F2' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#111827', flex: 1, paddingRight: 8 },
  statusText: { fontSize: 12, fontWeight: '700' },
  green: { color: '#2F855A' },
  red: { color: '#DC2626' },
  rowWho: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  rowTime: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
});
