import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useThemeColor } from '@hooks/useThemeColor';
import Logo from '@components/Logo';

import Button from '@components/Button';
import { construct_livro_categoria, get_livros } from '@api/livrosActions';
import { getUserLoginState, userLoginTimeOut } from '@api/localDataActions';

export default function Index() {

  const colors = useThemeColor();
  const [visibility, setVisibility] = useState('hidden')
  
  const checkLogin = async () => {
    await userLoginTimeOut();
    const logged = await getUserLoginState();
    logged.state && router.replace('(tabs)/home');
  }
  useEffect(() => {
    checkLogin()
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', backgroundColor: colors.backgroundPrim }}>
      <Logo />
      <View>
        <Button onPress={() => router.push('/login')} label="Entrar" style={{ width: '86%', paddingHorizontal: 64, marginHorizontal: 'auto'}}></Button>
      </View>
    </View>
  );
}