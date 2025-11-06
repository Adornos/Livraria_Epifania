import { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import Logo from '@components/Logo';
import { useThemeColor } from '@hooks/useThemeColor';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import T from '@constants/topography';
import { login_usuario } from '@api/login_usuario';

type Login = {
  email: string;
  senha: string;
}

export default function Login() {
  const colors = useThemeColor();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const validarFormulario = async () => {

    if ( !email || !senha) {
      alert("Preencha os campos obrigatórios!");
      return null;
    } 
    const result = await login_usuario(email, senha);
      if (result.success) {
        // alert('Deu certo jesus!');
        router.replace({pathname: '/home', params: {id : result.id_leitor}}); // redireciona para login, se quiser
      } else {
        alert(`"Erro", ${result.message || result.error || "Desconhecido"}`);
      }
  
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
        <View style={{ width: '86%', flex:1, justifyContent: 'space-between', flexDirection: 'column', alignSelf: 'center'}}>
          <Logo style={{marginVertical: 64}}/>
          <View style={{gap: 16, marginBottom: 64}}>
            <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <Input value={senha} onChangeText={setSenha} placeholder="Senha" secureTextEntry />
            <Button label="Entrar" onPress={() => (validarFormulario())} />
            <Link href='/sign-in' style={[{color: colors.textPrim}, T.p, T.center]}>Criar Conta</Link>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
