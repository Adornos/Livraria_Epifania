import { useState, useEffect } from 'react';
import { ScrollView, Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import InputProfile from '@components/InputProfile';
import Button from '@components/Button';
import { useThemeColor } from '@hooks/useThemeColor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getUserData, debugAsyncStorage, userLoginTimeOut, saveUserData } from '@api/localDataActions';
import { update_usuario } from '@api/userActions';
import { router } from 'expo-router';
import Index from '..';

type userDataTemplate = {
  id_leitor?: number;
  nome?: string | null;
  email?: string | null;
  senha?: string | null;
  data?: string | null;
  telefone?: string | null;
  cpf?: string | null;
  estado?: string | null;
  cidade?: string | null;
  bairro?: string | null;
  rua?: string | null;
  numero_casa?: string | null;
  complemento?: string | null;
};



export default function Profile() {

  const colors = useThemeColor();
  const [userData, setUserData] = useState<userDataTemplate>({
  id_leitor: undefined,
  nome: null,
  email: null,
  senha: null,
  data: null,
  telefone: null,
  cpf: null,
  estado: null,
  cidade: null,
  bairro: null,
  rua: null,
  numero_casa: null,
  complemento: null
  });

  const fillUserData = async () => {
    const data = await getUserData();
    setUserData(prev => ({
    ...prev,
    ...data
    }));
  }

  useEffect(() => {
    fillUserData()
    debugAsyncStorage()
  }, [])
  

  const handleChange = (key: keyof userDataTemplate, value: string) => {
  setUserData(prev => ({
    ...prev,
    [key]: value
  }));
  };

  const validarFormulario = async () => {

    const data = emptyToNull(userData)

    if (!data.nome || !data.email || !data.senha) {
      alert("Preencha os campos obrigatórios!");
      return null;
    } 

    console.log('dadosUsuraio:', data);
    const result = await update_usuario(data);
      if (result.success) {
        alert('Alterações realizadas com sucesso!');
        saveUserData(data)
      } else {
        alert('Erro durante a alteração: ' + (result.error || 'Desconhecido'));
      }
 
  };
 
  const executarTimeOut = async () => {
    userLoginTimeOut(true);
    router.navigate('/')
  }

  function emptyToNull(obj : object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, v === "" ? null : v])
    );
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.backgroundPrim}}
        behavior={"padding"}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.backgroundPrim}}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, alignItems: 'center', marginVertical: 48 }}>
            
              <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                  style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center', margin: 20 }}
              />
          
          <View style={{width: '80%', gap: 0, marginHorizontal: 'auto', marginBottom: 16}}>
              <InputProfile placeholder="Nome"        onChangeText={(text) => handleChange('nome', text)} value={userData?.nome ?? ''}/>
              <InputProfile placeholder="Telefone"    onChangeText={(text) => handleChange('telefone', text)} value={userData?.telefone ?? ''} keyboardType="phone-pad" />
              <InputProfile placeholder="Email"       onChangeText={(text) => handleChange('email', text)} value={userData?.email ?? ''} keyboardType="email-address" />
              <InputProfile placeholder="Senha"       onChangeText={(text) => handleChange('senha', text)} value={userData?.senha ?? ''} secureTextEntry />
              <InputProfile placeholder="CPF"         onChangeText={(text) => handleChange('cpf', text)} value={userData?.cpf ?? ''} />
              <InputProfile placeholder="Estado"      onChangeText={(text) => handleChange('estado', text)} value={userData?.estado ?? ''} />
              <InputProfile placeholder="Cidade"      onChangeText={(text) => handleChange('cidade', text)} value={userData?.cidade ?? ''} />
              <InputProfile placeholder="Bairro"      onChangeText={(text) => handleChange('bairro', text)} value={userData?.bairro ?? ''} />
              <InputProfile placeholder="Rua"         onChangeText={(text) => handleChange('rua', text)} value={userData?.rua ?? ''} />
              <InputProfile placeholder="Número"      onChangeText={(text) => handleChange('numero_casa', text)} value={userData?.numero_casa ?? ''} />
              <InputProfile placeholder="Complemento" onChangeText={(text) => handleChange('complemento', text)} value={userData?.complemento ?? ''} />
          </View>
          <Button label="Salvar Alterações" style={{ width: '50%', borderRadius: 50 }} onPress={() => (validarFormulario())} />
          <Button label="Sair da Conta" style={{backgroundColor: '#0000', width: 'auto' }} onPress={() => (executarTimeOut())}/>    
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
