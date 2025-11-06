import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SectionList,
  Pressable
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@hooks/useThemeColor';
import TextStyles from '@constants/topography';
import SearchBar from '@components/SearchBar';
import { useRouter } from 'expo-router';




const livrosCategorias: categoriaTemplate[] = [
  {
    id: '1',
    categoria: 'Recomendados',
    data: [{}],
    livros: [
      { 
        id: '1', 
        titulo: 'O Senhor dos Anéis', 
        image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg', 
        price: '68.00', 
        sinopse: 'Sinopse', 
        autor: 'Autor', 
        editora: 'Editora', 
        tipo: 'Capa dura' },
      { 
        id: '2', 
        titulo: 'Harry Potter', 
        image: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg', 
        price: '68.00', 
        sinopse: 'Sinopse', 
        autor: 'Autor', 
        editora: 'Editora', 
        tipo: 'Capa dura' 
      },
      { 
        id: '3', 
        titulo: '1984', 
        image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg', 
        price: '68.00', 
        sinopse: 'Sinopse', 
        autor: 'Autor', 
        editora: 'Editora', 
        tipo: 'Capa dura' 
      }
    ]
  },
  {
    id: '2',
    categoria: 'Ficção Científica',
    data: [{}],
    livros: [
      {
        id: '1',
        titulo: 'Duna',
        image:'https://books.google.com/books/content?id=QKQPEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '2',
        titulo: 'Neuromancer',
        image: 'https://covers.openlibrary.org/b/id/10521267-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '3',
        titulo: 'Fundação',
        image: 'https://covers.openlibrary.org/b/id/12659839-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
    ],
  },
  {
    id: '3',
    categoria: 'Fantasia',
    data: [{}],
    livros: [
      {
        id: '4',
        titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
        image: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '5',
        titulo: 'Harry Potter e a Pedra Filosofal',
        image: 'https://covers.openlibrary.org/b/id/7884861-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '6',
        titulo: 'As Crônicas de Nárnia',
        image: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '7',
        titulo: 'O Nome do Vento',
        image: 'https://covers.openlibrary.org/b/id/8312055-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
    ],
  },
  {
    id: '4',
    categoria: 'Romance Clássico',
    data: [{}],
    livros: [
      {
        id: '8',
        titulo: 'Orgulho e Preconceito',
        image: 'https://covers.openlibrary.org/b/id/8225631-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '9',
        titulo: 'Jane Eyre',
        image: 'https://covers.openlibrary.org/b/id/10521458-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '10',
        titulo: 'O Morro dos Ventos Uivantes',
        image: 'https://covers.openlibrary.org/b/id/8235040-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
      {
        id: '11',
        titulo: 'Anna Kariênina',
        image: 'https://covers.openlibrary.org/b/id/12659623-L.jpg',
        price: '68.00',
        sinopse: 'Sinopse',
        autor: 'Autor',
        editora: 'Editora',
        tipo: 'Capa dura'
      },
    ],
  },

];

type categoriaTemplate ={
  id: string,
  categoria: string,
  data: any[],
  livros: bookTemplate[]
}

type bookTemplate = {
  id: string,
  titulo: string,
  image: string,
  price: string,
  sinopse: string,
  autor: string,
  editora: string,
  tipo: string
}

export default function Home() {
  const router = useRouter();
  const colors = useThemeColor();
  const [searchActive, setSearchActive] = useState(false);

  const renderLivroCard = (book : bookTemplate) => (
    <TouchableOpacity 
      style={[styles.bookCardCategory, {backgroundColor: colors.backgroundSec}]}
      key={book.id} 
      onPress={() =>
        router.push({
          pathname: '/produto/[produto]',
          params: { 
            produto: book.id.toString(),     // corresponde ao nome do arquivo [produto].tsx
            book: JSON.stringify(book)       // envia os dados do livro
          },
        })
      }
      >
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <Text style={[ { color: colors.textPrim, fontWeight: 200 }, TextStyles.p, styles.bookTitle]} numberOfLines={2}>
            {book.titulo}
        </Text>
        <Text style={[ { color: colors.textPrim, fontWeight: 200 }, TextStyles.h3, styles.bookPrice]} numberOfLines={2}>
            {Number(book.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
    </TouchableOpacity>
  );

  const renderLivrosRecomendados = (book : bookTemplate) => (
    <TouchableOpacity 
      onPress={() =>
        router.push({
          pathname: '/produto/[produto]',
          params: { 
            produto: book.id.toString(),
            book: JSON.stringify(book)      
          },
        })
      }
      style={[styles.bookCard, { backgroundColor: colors.backgroundBook }]}
    >
      <Image 
        source={{ uri: book.image }} 
        style={styles.bookImage} 
      />
    </TouchableOpacity>
  );

  const renderSectionCategoryHeader = ( section : categoriaTemplate ) => (
          <Text style={[TextStyles.h1, { color: colors.textPrim, marginTop: 20, marginBottom: 10 }]}>
           {section.categoria}
          </Text>
  );

  const renderSection = (section : categoriaTemplate) => (
    
    <View style={{ marginBottom: 20 }}>
      {renderSectionCategoryHeader(section)}
      <FlatList
        data={section.livros}
        renderItem={({ item }) =>
          section.categoria.toLowerCase() === 'recomendados'
            ? renderLivrosRecomendados(item)
            : renderLivroCard(item)
        }
        keyExtractor={(item) => item.id}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const handleSearchPress = () => {
    setSearchActive(true);
    // Aqui futuramente chama a API:
    // fetchLivros(query)
  };

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
            <ScrollView
            style={{ flex: 1, backgroundColor: colors.backgroundPrim }}
            showsVerticalScrollIndicator={false}
            >
            {/* Barra de pesquisa */}
            <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                <SearchBar/>
            </View>

            <View style={styles.section}>

              <SectionList
                sections={livrosCategorias}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderSectionHeader={() => null}
                renderItem={({section}) => renderSection(section)}
              />
            </View>
            
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginLeft: 16
  },
  bookCard: {
    padding: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  bookCardCategory: {
    padding: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  bookImage: {
    width: 128,
    height: 184,
  },
  bookTitle:{
    marginTop: 8,
    width: 128,
  },
  bookPrice:{
    marginTop: 8,
    width: 128,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 12,
  },
});
