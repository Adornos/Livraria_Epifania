import axios from 'axios';

const BASE_URL = 'http://192.168.1.68/api_epifania';


export const login_usuario = async (email, senha) => {

  const dados = {email: email, senha: senha}

  try {
    const response = await axios.post(
      `${BASE_URL}/login_user.php`,
      dados,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data; // Retorna o objeto do PHP
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Falha na requisição' };
  }
};
