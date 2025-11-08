import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '@hooks/useThemeColor';
import Logo from '@components/Logo';

import { construct_livro_categoria, get_livros } from '@api/get_livros';

export default function Index() {

  const colors = useThemeColor();

  useEffect(() => {
    const logged = true; // substituir por checagem real
    setTimeout(() => {
      router.replace(logged ? '(tabs)/home' : '(auth)/login');
    }, 0);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.backgroundPrim }}>
      <Logo />
      <ActivityIndicator color={colors.primaryButton} size="small" />
    </View>
  );
}