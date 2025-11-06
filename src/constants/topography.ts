import { StyleSheet } from 'react-native';
import Colors from './colors';

const Topography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
// color: Colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
// color: Colors.textPrimary,
  },
  h3: {
    fontSize: 18,
    fontWeight: '500',
// color: Colors.textPrimary,
  },

  // Paragraph
  p: {
    fontSize: 16,
// color: Colors.textSecondary,
    lineHeight: 24,
  },

  // Utilities
  bold: {
    fontWeight: '700',
  },
  muted: {
// color: Colors.mutedText,
  },
  caption: {
    fontSize: 12,
// color: Colors.mutedText,
    fontStyle: 'italic',
  },
  button: {
    textTransform: 'uppercase',
  },

  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default Topography;