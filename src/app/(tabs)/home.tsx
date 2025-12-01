import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SectionList,
  Pressable,
  BackHandler
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@hooks/useThemeColor";
import TextStyles from "@constants/topography";
import SearchBar from "@components/SearchBar";
import { useRouter } from "expo-router";
import { construct_livro_categoria } from "@api/livrosActions";

type tiposTemplate = {
  tipo: string;
  price: string;
  estoque: string;
};

type bookTemplate = {
  id_livro: string;
  titulo: string;
  image: string;
  sinopse: string;
  autor: string;
  editora: string;
  tipos: tiposTemplate[];
};

type categoriaTemplate = {
  id: string;
  categoria: string;
  data: any[];
  livros: bookTemplate[];
};

export default function Home() {
  const router = useRouter();
  const colors = useThemeColor();

  const [livroCategorias, setLivroCategorias] = useState<categoriaTemplate[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const resposta = await construct_livro_categoria();
      setLivroCategorias(resposta);
    })();
  }, []);

  const todosLivros = livroCategorias.flatMap((cat) => cat.livros);

  const livrosFiltrados = todosLivros.filter((livro) =>
    livro.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const livrosUnicos = livrosFiltrados.filter(
  (livro, index, self) =>
    index === self.findIndex(l => l.id_livro === livro.id_livro)
  );

  const renderLivroCard = (book: bookTemplate) => (
    <TouchableOpacity
      style={[
        styles.bookCardCategory,
        { backgroundColor: colors.backgroundSec },
      ]}
      key={book.id_livro}
      onPress={() =>
        router.push({
          pathname: "/produto/[produto]",
          params: {
            produto: book.id_livro.toString(),
            book: JSON.stringify(book),
          },
        })
      }
    >
      <View>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <Text
          style={[
            { color: colors.textPrim, fontWeight: 200 },
            TextStyles.p,
            styles.bookTitle,
          ]}
          numberOfLines={2}
        >
          {book.titulo}
        </Text>
        <Text
          style={[
            { color: colors.textPrim, fontWeight: 200 },
            TextStyles.h3,
            styles.bookPrice,
          ]}
        >
          {Number(book.tipos[1].price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderLivrosRecomendados = (book: bookTemplate) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/produto/[produto]",
          params: {
            produto: book.id_livro.toString(),
            book: JSON.stringify(book),
          },
        })
      }
      style={[{ backgroundColor: colors.backgroundBook }, styles.bookCard]}
    >
      <Image source={{ uri: book.image }} style={styles.bookImage} />
    </TouchableOpacity>
  );

  const renderSectionCategoryHeader = (section: categoriaTemplate) => (
    <Text
      style={[
        TextStyles.h1,
        { color: colors.textPrim, marginTop: 20, marginBottom: 10 },
      ]}
    >
      {section.categoria}
    </Text>
  );

  const renderSection = (section: categoriaTemplate) => (
    <View style={{ marginBottom: 20 }}>
      {renderSectionCategoryHeader(section)}
      <FlatList
        data={section.livros}
        renderItem={({ item }) =>
          section.categoria.toLowerCase() === "recomendados"
            ? renderLivrosRecomendados(item)
            : renderLivroCard(item)
        }
        keyExtractor={(item) => `${section.id}_${item.id_livro}`}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrim }}>
        

        <Modal
          isVisible={showSearchModal}
          onBackdropPress={() => {
            setShowSearchModal(false);
            setSearch("");
          }}
          onBackButtonPress={() => {
            setShowSearchModal(false);
            setSearch("");
          }}
          swipeDirection="down"
          onSwipeComplete={() => {
            setShowSearchModal(false);
            setSearch("");
          }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.4}
          style={{ margin: 0 }}  // ocupa a tela toda
        >
          <SafeAreaView
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgroundPrim },
            ]}
          >
            {/* barra de busca */}
            <View style={{ paddingHorizontal: 16 }}>
              <SearchBar
                autoFocus
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar livros..."
              />
            </View>

            {/* resultados */}
            <FlatList
              style={{ marginTop: 20, paddingHorizontal: 16, marginHorizontal: 'auto' }}
              data={livrosUnicos}
              keyExtractor={(item, index) => `${item.id_livro}-${index}`}
              renderItem={({ item }) => renderLivroCard(item)}
              numColumns={2}
              columnWrapperStyle={{ gap: 12 }}
              contentContainerStyle={{ gap: 16 }}
            />

            {/* Botão fechar */}
            <TouchableOpacity
              onPress={() => {
                setShowSearchModal(false);
                setSearch("");
              }}
              style={styles.closeButton}
            >
              <Text style={{ color: colors.textPrim, fontSize: 18 }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <SectionList
          style={styles.section}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
              {/* Abre o modal ao tocar */}
              <Pressable onPress={() => setShowSearchModal(true)}>
                <SearchBar editable={false} pointerEvents="none" />
              </Pressable>
            </View>
          }
          sections={livroCategorias}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderSectionHeader={() => null}
          renderItem={({ section }) => renderSection(section)}
          nestedScrollEnabled
          removeClippedSubviews={true}
          windowSize={5}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={50}
          initialNumToRender={3}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  section: {
    marginLeft: 16,
  },
  bookCard: {
    padding: 8,
    marginRight: 12,
  },
  bookCardCategory: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    marginRight: 12,
  },
  bookImage: {
    width: 128,
    height: 184,
  },
  bookTitle: {
    marginTop: 8,
    width: 128,
  },
  bookPrice: {
    marginTop: 4,
    width: 128,
  },

  /* ——— MODAL ——— */
  modalContainer: {
    flex: 1,
    paddingTop: 10,
  },
  closeButton: {
    paddingVertical: 16,
    alignSelf: "center",
  },
});
