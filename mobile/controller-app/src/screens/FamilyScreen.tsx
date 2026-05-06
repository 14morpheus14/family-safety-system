import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const family = [
  { name: 'Dad', device: 'Redmi Note 12', risk: 'safe', image: 'https://i.pravatar.cc/100?img=12' },
  { name: 'Mom', device: 'Samsung Galaxy A14', risk: 'high', label: 'Risk (1)', image: 'https://i.pravatar.cc/100?img=32' },
  { name: 'Riya (Daughter)', device: 'iPhone 13', risk: 'moderate', label: 'Risk (2)', image: 'https://i.pravatar.cc/100?img=47' },
  { name: 'Aarav (Son)', device: 'Realme Narzo 50', risk: 'safe', image: 'https://i.pravatar.cc/100?img=22' },
  { name: 'Dadi', device: 'JioPhone Next', risk: 'safe', image: 'https://i.pravatar.cc/100?img=5' },
];

export default function FamilyScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Family</Text>
          <View style={styles.addCircle}>
            <Ionicons name="add" size={22} color="#fff" />
          </View>
        </View>

        <View style={styles.tabs}>
          <Text style={styles.tabActive}>Overview</Text>
          <Text style={styles.tab}>Devices</Text>
        </View>

        <View style={styles.listCard}>
          {family.map((item, index) => (
            <View key={item.name} style={[styles.row, index !== family.length - 1 && styles.rowBorder]}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.device}>{item.device}</Text>
              </View>
              {item.risk === 'safe' ? (
                <View style={styles.safePill}>
                  <Text style={styles.safeText}>All Safe</Text>
                </View>
              ) : (
                <View style={styles.riskWrap}>
                  <Text style={[styles.riskText, item.risk === 'moderate' ? styles.yellow : styles.red]}>{item.label}</Text>
                  <Ionicons name="alert-circle" size={16} color={item.risk === 'moderate' ? '#E7A21A' : '#DC2626'} />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.addCard}>
          <View>
            <Text style={styles.addTitle}>Add Family Member</Text>
            <Text style={styles.addSub}>Protect more loved ones</Text>
          </View>
          <View style={styles.plusCircle}>
            <Ionicons name="add" size={22} color="#fff" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#6B7280" />
          <Text style={styles.navText}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => navigation.navigate('Family')}>
          <Ionicons name="people" size={22} color="#2F855A" />
          <Text style={[styles.navText, styles.navActive]}>Family</Text>
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
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  addCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#9CA3AF', alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', justifyContent: 'center', gap: 60, marginTop: 18, marginBottom: 14 },
  tab: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  tabActive: { fontSize: 14, color: '#2F855A', fontWeight: '700', borderBottomWidth: 2, borderBottomColor: '#2F855A', paddingBottom: 6 },
  listCard: { backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12, backgroundColor: '#E5E7EB' },
  name: { fontSize: 14, fontWeight: '700', color: '#111827' },
  device: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  safePill: { backgroundColor: '#ECFDF5', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  safeText: { color: '#2F855A', fontSize: 12, fontWeight: '700' },
  riskWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  riskText: { fontSize: 12, fontWeight: '700' },
  yellow: { color: '#E7A21A' },
  red: { color: '#DC2626' },
  addCard: { marginTop: 18, backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  addSub: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  plusCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
});
