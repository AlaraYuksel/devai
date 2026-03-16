import axios from 'axios';

// Backend sunucumuzun adresi
const API_URL = 'http://localhost:' + process.env.PORT;

export const registerUser = async (username: string, password: string): Promise<void> => {
  try {
    // Axios ile backend'e POST isteği atıyoruz
    const response = await axios.post(`${API_URL}/auth/register`, {
      username: username,
      password: password
    });

    console.log(`\n Başarılı: ${response.data.message}`);
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Sunucuya ulaşılamadı.';
    console.log(`\n Hata: ${errorMessage}`);
  }
};