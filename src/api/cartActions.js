import AsyncStorage from "@react-native-async-storage/async-storage";

export const update_livros = async (dados) => {
    try {
    const response = await axios.post(`${BASE_URL}/update_livros.php`, dados, { //Continuar
      headers: { "Content-Type": "application/json" },
    });
    console.log("Resposta do servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar alteração:", error);
    return { error: "Falha na requisição" };
  }
}