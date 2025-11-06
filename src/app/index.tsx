import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '@hooks/useThemeColor';
import Logo from '@components/Logo';

export default function Index() {
  const colors = useThemeColor();

  useEffect(() => {
    const logged = false; // substituir por checagem real
    setTimeout(() => {
      router.replace(logged ? '(auth)/home' : '(auth)/login');
    }, 0);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.backgroundPrim }}>
      <Logo />
      <ActivityIndicator color={colors.primaryButton} size="small" />
    </View>
  );
}