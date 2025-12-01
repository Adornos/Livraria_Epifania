import { Alert } from 'react-native';
import axios from "axios";
import { getCartItems, getUserData } from "./localDataActions";
import { get_tipos } from "./livrosActions";

const BASE_URL = "http://192.168.1.68/api_epifania";

export const operateCart = async () => {
  try {

    const dados_usuarios = await getUserData();
    const cart = await getCartItems();
    const tipos = await get_tipos();

    const mapaTipos = Object.fromEntries( tipos.map(t => [t.tipo, t.id_tipo]))

    if (dados_usuarios.cpf_leitor === null) {
      throw new Error("CPF não encontrado: \nPreencha o CPF antes de comprar");
    }

    if (cart === null || cart.length === 0) {
      throw new Error("Carrinho está vazio: \nPreencha o carrinho antes de comprar!");
    }

    const cartFiltrado = cart.map(item => ({
      id_livro: item.id_livro,
      id_tipo: mapaTipos[item.tipo],
      price: item.price,
      quantidade: item.quantidade
    }));

    const dados = {
      usuario: {
        id_usuario: dados_usuarios.id_leitor,
        cpf_leitor: dados_usuarios.cpf
      },
      compra : cartFiltrado
    }

    const response = await axios.post(`${BASE_URL}/log_compras.php`, JSON.stringify(dados), { //Continuar
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Resposta do servidor ao cartOperate:", response.data);
    return response.data;

  } catch (error) {

    Alert.alert("Erro", error.message || "Ocorreu um erro inesperado")
    console.error("Erro ao realizar compra:", error);
    return { error: "Falha na requisição" };
    
  }
}