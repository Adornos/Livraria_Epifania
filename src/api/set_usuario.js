import axios from "axios";

const BASE_URL = "http://192.168.1.68/api_epifania";

export const set_usuario = async (novoUsuario) => {
  try {
    const response = await axios.post(`${BASE_URL}/set_user.php`, novoUsuario, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Resposta do servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar usuário:", error);
    return { error: "Falha na requisição" };
  }
};
