import { Command } from 'commander';
import { model } from '../setup/geminiapisetup.js';

// Başlangıçta global sağlayıcı kullanılıyor varsayıyoruz. 
// Bu yüzden isGlobal 'true' olmalı.
export let isGlobal = true; 

export const localGlobalChangerCommand = new Command('local')
    .description('Global olarak kurulu yapay zeka sağlayıcısını yerel sağlayıcıya çevirir')
    .action(() => {
        // Eğer şu an globaldeysek (isGlobal true ise), yerele geçebiliriz
        if (isGlobal) {
            console.log('Global sağlayıcı yerel sağlayıcıya çevriliyor...');
            isGlobal = false; // Artık global değil, yerel
        } else {
            // Zaten isGlobal false ise (yani zaten yereldeysek)
            console.log('Zaten yerel sağlayıcı kullanılıyor. Değişiklik yapılmasına gerek yok.');
        }
    });

export const globalLocalChangerCommand = new Command('global')
    .description('Yerel olarak kurulu yapay zeka sağlayıcısını global sağlayıcıya çevirir')
    .action(() => {
        // Eğer şu an yereldeysek (isGlobal false ise), globale geçebiliriz
        if (!isGlobal) {
            console.log('Yerel sağlayıcı global sağlayıcıya çevriliyor...');
            try {

                if (!process.env.API_KEY) throw new Error("API Key eksik olabilir mi?");
                isGlobal = true; // Artık globaldeyiz
                console.log('Global sağlayıcıya geçiş başarılı.');
            } catch(error) {
                console.log('Global sağlayıcıya geçiş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
                console.error(error);
                return;
            }
        } else {
            console.log('Zaten global sağlayıcı kullanılıyor. Değişiklik yapılmasına gerek yok.');
        }
    });