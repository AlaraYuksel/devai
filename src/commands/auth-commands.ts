import { Command } from 'commander';
import { registerUser } from '../api.js';
import { askQuestion } from '../utils/askQuestion.js';

export const registerCommand = new Command('register')
    .description('Yeni bir kullanıcı kaydı oluşturur')
    .action(async () => {
        console.log('devai Sistemine Hoş Geldiniz');
        
        // Kullanıcıdan bilgileri interaktif olarak alıyoruz
        const username = await askQuestion('Kullanıcı adı: ');
        const password = await askQuestion('', true);
        
        console.log('\n Kayıt yapılıyor, lütfen bekleyin...');
        
        // Aldığımız verileri API'mize gönderiyoruz
        await registerUser(username, password);
    });