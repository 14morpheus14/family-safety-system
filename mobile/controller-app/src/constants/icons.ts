import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';

export const APP_ICONS = {
  home: {
    library: Ionicons,
    name: 'home',
  },

  family: {
    library: Ionicons,
    name: 'people',
  },

  alerts: {
    library: Ionicons,
    name: 'notifications',
  },

  protection: {
    library: MaterialIcons,
    name: 'security',
  },

  scamCall: {
    library: MaterialIcons,
    name: 'phone-in-talk',
  },

  suspiciousLink: {
    library: Feather,
    name: 'link',
  },

  safeBrowsing: {
    library: Ionicons,
    name: 'shield-checkmark',
  },

  fileProtection: {
    library: FontAwesome5,
    name: 'file-download',
  },
};
