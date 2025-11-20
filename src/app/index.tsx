import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '@hooks/useThemeColor';
import Logo from '@components/Logo';

import Button from '@components/Button';
import { construct_livro_categoria, get_livros } from '@api/livrosActions';

export default function Index() {

  const colors = useThemeColor();

  useEffect(() => {
    const logged = false; // substituir por checagem real
    setTimeout(() => {
      logged && router.replace('(tabs)/home') ;
    }, 0);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', backgroundColor: colors.backgroundPrim }}>
      <Logo />
      <View>
        <Button onPress={() => router.push('/login')} label="Entrar" style={{width: '86%', paddingHorizontal: 64, marginHorizontal: 'auto'}}></Button>
      </View>
    </View>
  );
}