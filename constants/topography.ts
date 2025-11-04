import { StyleSheet } from 'react-native';
import Colors from './colors'

const Topography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrim,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textPrim,
  },
  h3: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrim,
  },

  // Paragraph
  p: {
    fontSize: 16,
    color: Colors.textSec,
    lineHeight: 24,
  },

  // Utilities
  bold: {
    fontWeight: '700',
  },
  muted: {
    color: Colors.textSec,
  },
  caption: {
    fontSize: 12,
    color: Colors.textSec,
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