import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const alerts = [
  { icon: 'call', title: 'Scam Call Blocked', detail: '+91 98765 43210', who: "Mom's phone", time: '10:30 AM', level: 'high' as const },
  { icon: 'link', title: 'Suspicious Link Detected', detail: 'bit.ly/xyz123', who: 'Riya (iPhone)', time: '9:45 AM', level: 'high' as const },
  { icon: 'document', title: 'Suspicious File Detected', detail: 'invoice.apk', who: "Dad's phone", time: '9:20 AM', level: 'high' as const },
  { icon: 'shield-checkmark', title: 'Safe Browsing', detail: 'Blocked risky website', who: 'Aarav (Realme Narzo 50)', time: '8:15 AM', level: 'low' as const },
  { icon: 'chatbubble', title: 'SMS from Unknown Sender', detail: '+91 76543 21098', who: 'Dadi (JioPhone Next)', time: '7:30 PM', level: 'low' as const },
];

export default function AlertsScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.title}>Alerts</Text>
          <Ionicons name="filter" size={22} color="#111827" />
        </View>

        <View style={styles.tabs}>
          <View style={styles.tabActive}><Text style={styles.tabActiveText}>All</Text></View>
          <View style={styles.tab}><Text style={styles.tabText}>High Risk</Text></View>
          <View style={styles.tab}><Text style={styles.tabText}>Low Risk</Text></View>
        </View>

        <Text style={styles.sectionLabel}>Today</Text>

        <View style={styles.card}>
          {alerts.slice(0, 4).map((item, index) => (
            <View key={item.title} style={[styles.row, index !== 3 && styles.rowBorder]}>
              <View style={[styles.iconWrap, item.level === 'high' ? styles.redSoft : styles.greenSoft]}>
                <Ionicons name={item.icon as any} size={20} color={item.level === 'high' ? '#DC2626' : '#2F855A'} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={[styles.riskText, item.level === 'high' ? styles.red : styles.green]}>{item.level === 'high' ? 'High' : 'Low'}</Text>
                </View>
                <Text style={styles.rowDetail}>{item.detail}</Text>
                <Text style={styles.rowWho}>{item.who}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Yesterday</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconWrap, styles.yellowSoft]}>
              <Ionicons name="mail" size={20} color="#E7A21A" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowTop}>
                <Text style={styles.rowTitle}>SMS from Unknown Sender</Text>
                <Text style={[styles.riskText, styles.green]}>Low</Text>
              </View>
              <Text style={styles.rowDetail}>+91 76543 21098</Text>
              <Text style={styles.rowWho}>Dadi (JioPhone Next)</Text>
            </View>
            <Text style={styles.time}>7:30 PM</Text>
          </View>
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
          <Ionicons name="alert-circle" size={22} color="#2F855A" />
          <Text style={[styles.navText, styles.navActive]}>Alerts</Text>
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
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  tabs: { flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 14 },
  tab: { flex: 1, backgroundColor: '#fff', borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  tabActive: { flex: 1, backgroundColor: '#2F855A', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  tabText: { fontSize: 13, color: '#111827', fontWeight: '600' },
  tabActiveText: { fontSize: 13, color: '#fff', fontWeight: '700' },
  sectionLabel: { fontSize: 13, color: '#6B7280', marginBottom: 10, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  redSoft: { backgroundColor: '#FEF2F2' },
  greenSoft: { backgroundColor: '#ECFDF5' },
  yellowSoft: { backgroundColor: '#FFFBEB' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#111827', flex: 1, paddingRight: 8 },
  riskText: { fontSize: 12, fontWeight: '700' },
  red: { color: '#DC2626' },
  green: { color: '#2F855A' },
  rowDetail: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  rowWho: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  time: { fontSize: 12, color: '#6B7280', marginLeft: 10 },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
});
