import { colors } from '../theme/colors';

export type RiskLevel = 'safe' | 'moderate' | 'high' | 'off';

export function riskColor(level: RiskLevel) {
  if (level === 'safe') return colors.safe;
  if (level === 'moderate') return colors.moderate;
  return colors.high;
}

export function riskSoftColor(level: RiskLevel) {
  if (level === 'safe') return colors.greenSoft;
  if (level === 'moderate') return colors.yellowSoft;
  return colors.redSoft;
}
