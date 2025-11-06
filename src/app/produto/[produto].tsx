import { ScrollView, Image, Text, View } from 'react-native';
import { useThemeColor } from '@hooks/useThemeColor';
import { useLocalSearchParams } from 'expo-router';
import TextStyles from '@constants/topography';
import Button from '@components/Button';


export default function Produto() {

  const { book } = useLocalSearchParams<{ book: string }>();
  const bookData = JSON.parse(book);
  const colors = useThemeColor();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
      <Image
        source={{ uri: bookData.image }}
        style={{ width: 200, height: 300, alignSelf: 'center', marginVertical: 20, borderRadius: 10 }}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={[TextStyles.h1, { color: colors.textPrim }]}>{bookData.titulo}</Text>
        <Text style={[TextStyles.p, { color: colors.textSec }]}>Autor: {bookData.autor}</Text>
        <Text style={[TextStyles.p, { color: colors.textSec }]}>Editora: {bookData.editora}</Text>
        <Text style={[TextStyles.p, { color: colors.textSec }]}>Tipo: {bookData.tipo}</Text>
        <Text style={[TextStyles.h2, { color: colors.textPrim, marginTop: 10 }]}>R$ 59,90</Text>

        <Text style={[TextStyles.p, { color: colors.textPrim, marginTop: 20 }]}>
          Sinopse: {bookData.sinopse}
        </Text>

        <Button label="Adicionar ao Carrinho" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}