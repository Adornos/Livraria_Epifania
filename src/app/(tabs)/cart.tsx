import { View, Text } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TextStyles from '@constants/topography';
import Button from '@components/Button';

export default function Cart() {
  const colors = useThemeColor();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrim, padding: 16 }}>
          <Text style={[TextStyles.h1, { color: colors.textPrim }]}>Carrinho</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.textSec }}>Nenhum item no carrinho</Text>
          </View>
          <Button label="Comprar" onPress={() => {}} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}