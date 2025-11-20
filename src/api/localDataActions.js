
import AsyncStorage from "@react-native-async-storage/async-storage";

export const debugAsyncStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    console.log("AsyncStorage:", values);
};

// Dados do Usuário

export const saveUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('@userData', JSON.stringify(userData))
    } catch (e) {
        console.log("Erro ao salvar usuario local", e);
    }
}

export const getUserData = async () => {
    try {
        const data = await AsyncStorage.getItem('@userData')
        return data != null ? JSON.parse(data) : null;
    } catch (e) {
        console.log("Erro ao resgatar usuario local", e);
    }
}

// Dados do Carrinho
export const addItemToCart = async (livro) => {
  try {
      const carrinho = await getCartItems() || [];

      const existe = carrinho.find(item =>
          item.id_livro === livro.id_livro && item.tipo === livro.tipo
      );

      if (existe) {
          console.log("Item já está no carrinho");
          return;
      }

      carrinho.push(livro);

      await AsyncStorage.setItem('@cartData', JSON.stringify(carrinho));
      

  } catch (e) {
      console.log("Erro ao adicionar no carrinho", e);
  }
};

export const getCartItems = async () => {
    try {
        const data = await AsyncStorage.getItem('@cartData');
        const list = data ? JSON.parse(data) : [];
        
        // console.log("Dados do carrinho",data);
        
        return list.filter(
            (item) => item && item.id_livro !== undefined && item.id_livro !== null
        );


    } catch (e) {
        console.log("Erro ao resgatar dados do carrinho", e);
        return [];
    }
}

export const flushCartItems = async () => {
    try {
        await AsyncStorage.removeItem('@cartData')
        return 'Carrinho Apagado com sucesso';
    } catch (e) {
        console.log("Erro ao resgatar dados do carrinho", e);
    }
}

export const removeCartItem = async (index) => {
    try {
        const cart = await getCartItems();

        cart.splice(index, 1);

        await AsyncStorage.setItem('@cartData', JSON.stringify(cart));
    } catch (e) {
        console.log("Erro ao excluir item do carrinho", e);
    }
};