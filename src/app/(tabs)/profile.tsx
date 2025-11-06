import { ScrollView, Image, View } from 'react-native';
import Input from '@components/InputProfile';
import Button from '@components/Button';
import { useThemeColor } from '@hooks/useThemeColor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const colors = useThemeColor();

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center', margin: 20 }}
            />
            <View style={{width: '80%', gap: 16, marginHorizontal: 'auto'}}>
                <Input placeholder="Nome" />
                <Input placeholder="Sobrenome" />
                <Input placeholder="Telefone" keyboardType="phone-pad" />
                <Input placeholder="Email" keyboardType="email-address" />
                <Input placeholder="Senha" secureTextEntry />
                <Input placeholder="CPF" />
                <Input placeholder="Estado" />
                <Input placeholder="Cidade" />
                <Input placeholder="Bairro" />
                <Input placeholder="Rua" />
                <Input placeholder="Número" />
                <Input placeholder="Complemento" />
            </View>
            <Button label="Salvar Alterações" onPress={() => {}} />
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
