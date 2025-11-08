import axios from "axios";
import * as FileSystem from 'expo-file-system';

const BASE_URL = "http://192.168.1.68/api_epifania";

export const get_livros = async (novoUsuario) => {
  try {
    const response = await axios.post(`${BASE_URL}/get_livros.php`, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Resposta do servidor:", response.data); // Usar apenas para debug
    return response.data; 
  } catch (error) {
    console.error("Erro ao enviar usuário:", error.message);
    return { success: false, error: error.message };
  }
};

export const get_categoria = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/get_categoria.php`, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Resposta do servidor:", response.data); // Usar apenas para debug
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar usuário:", error.message);
    return { success: false, error: error.message };
  }
}

export const construct_livro_categoria = async () => {

  try {
    const [categoriasRaw, livros] = await Promise.all([
      get_categoria(),
      get_livros(),
    ]);

    if (!Array.isArray(categoriasRaw) || !Array.isArray(livros)) {
      throw new Error("Dados não arrays");
    }

    const categorias = categoriasRaw.map(cat => ({ ...cat, data: [{}] }))

    const livroCategoria = categorias.map(cat => ({
      ...cat,
      livros: livros.filter(livro => livro.categorias.includes(cat.categoria))
    }))

    console.log('Resposta do construtor: ', livroCategoria)
    return livroCategoria;

  } catch (error) {
    console.error("Erro ao construir estrutura:", error);
    return [];
  }
  }