
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
          return false;
      }

      carrinho.push(livro);

      await AsyncStorage.setItem('@cartData', JSON.stringify(carrinho));

      return true
      

  } catch (e) {
      console.log("Erro ao adicionar no carrinho", e);
      return false
  }
};

export const updateCartItems = async (newCart) => {
  try {
    await AsyncStorage.setItem('@cartData', JSON.stringify(newCart));
  } catch (e) {
    console.log("Erro ao atualizar carrinho", e);
  }
};

export const getCartItems = async () => {
    try {
        const data = await AsyncStorage.getItem('@cartData');
        const list = data ? JSON.parse(data) : [];

        const listFilter = list.filter(
            (item) => item && item.id_livro !== undefined && item.id_livro !== null
        );
        
        // console.log("Dados do carrinho", listFilter);

        return listFilter

    } catch (e) {
        console.log("Erro ao resgatar dados do carrinho", e);
        return [];
    }
}

export const getCartItemsQuantity = async () => {
    try {

        const data = await getCartItems();
        const quantity = data.length;
        // console.warn("quantidade", quantity)
        return quantity;

    } catch (e) {
        console.log("Erro ao resgatar número de itens do carrinho", e);
        return 0;
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

// Persistencia de login

export const setUserLoginTrue = async () => {
    try {
        const d = new Date()
        await AsyncStorage.setItem('@userLogin', JSON.stringify({ state: true, date: d.toISOString() }))
    } catch (e) {
        console.log("Erro ao logar localmente", e);
    }
}

export const userLoginTimeOut = async (noTrigger) => {
    try {

        const timeNow = new Date()
        const timeOfLogin = new Date( await getUserLoginState(false).date)
        const timeDiff = (timeNow - timeOfLogin) / 1000 * 60 * 60 * 24

        if (timeDiff >= 0 || noTrigger) {
            await AsyncStorage.clear()
            await AsyncStorage.setItem('@userLogin', JSON.stringify({ state: false}))
        }
        // console.log("Estado do login pós TimeOut", await getUserLoginState());

    } catch (e) {
        console.log("Erro ao invalidar prazo", e);
    }
}

export const getUserLoginState = async (showState = true) => {
    try {
        const result = await AsyncStorage.getItem('@userLogin')
        // !showState && console.log("Estado do login", result);
        return result != null ? JSON.parse(result) : null;
        
    } catch (e) {
        console.log("Erro ao resgatar login local", e)
    }
}