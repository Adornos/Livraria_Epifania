import axios from 'axios';

const BASE_URL = 'http://192.168.1.68/api_epifania';

export const set_usuario = async (novoUsuario) => {
  try {
    const response = await axios.post(`${BASE_URL}/get_livros.php`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Resposta do servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar usuário:', error.message);
    return { success: false, error: error.message };
  }
};


