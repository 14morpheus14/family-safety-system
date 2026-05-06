import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const features = [
  'Blocks scam calls & spam',
  'Blocks suspicious links & websites',
  'Warns before file downloads',
  'Extra protection for payments',
];

export default function SafeModeScreen() {
  const [enabled] = React.useState(true);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
          <Text style={styles.title}>Safe Mode</Text>
          <Ionicons name="information-circle-outline" size={22} color="#111827" />
        </View>

        <View style={styles.hero}>
          <View style={styles.shieldCircle}>
            <Ionicons name="shield-checkmark" size={36} color="#fff" />
          </View>
          <Text style={styles.bigTitle}>Safe Mode is ON</Text>
          <Text style={styles.subtitle}>Strict protection is active for all family members.</Text>

          <Switch
            value={enabled}
            onValueChange={() => {}}
            trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
            thumbColor={enabled ? '#fff' : '#fff'}
            ios_backgroundColor="#D1D5DB"
            style={{ marginTop: 18 }}
          />
        </View>

        <View style={styles.card}>
          {features.map((item) => (
            <View key={item} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Turn Off Safe Mode</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          ['home-outline', 'Home', false],
          ['people-outline', 'Family', false],
          ['alert-circle-outline', 'Alerts', false],
          ['shield-checkmark', 'Protection', true],
          ['person-outline', 'Account', false],
        ].map(([icon, label, active]) => (
          <Pressable key={String(label)} style={styles.navItem}>
            <Ionicons name={icon as any} size={22} color={active ? '#2F855A' : '#6B7280'} />
            <Text style={[styles.navText, active && styles.navActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F7F8' },
  content: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  hero: { alignItems: 'center', marginTop: 22 },
  shieldCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#2F855A', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  bigTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginTop: 6, paddingHorizontal: 10 },
  card: { marginTop: 24, backgroundColor: '#fff', borderRadius: 22, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  featureText: { fontSize: 14, color: '#111827' },
  button: { marginTop: 24, borderWidth: 1, borderColor: '#2F855A', borderRadius: 14, paddingVertical: 14, alignItems: 'center', backgroundColor: '#fff' },
  buttonText: { color: '#2F855A', fontSize: 14, fontWeight: '800' },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 4, fontSize: 11, color: '#6B7280' },
  navActive: { color: '#2F855A', fontWeight: '700' },
});
