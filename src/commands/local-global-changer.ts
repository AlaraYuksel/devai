import { Command } from 'commander';
import {model} from '../setup/geminiapisetup.js';

export let isGlobal = false; // Başlangıçta global sağlayıcı kullanılıyor varsayıyoruz

export const localGlobalChangerCommand = new Command('local')
    .description('Global olarak kurulu yapay zeka sağlayıcısını yerel sağlayıcıya çevirir')
    .action(() => {
        if (!isGlobal) {
        console.log('Global sağlayıcı yerel sağlayıcıya çevriliyor...');
        isGlobal = true;
    }
        else {
        console.log('Zaten yerel sağlayıcı kullanılıyor. Değişiklik yapılmasına gerek yok.');
    }
});

export const globalLocalChangerCommand = new Command('global')
    .description('Yerel olarak kurulu yapay zeka sağlayıcısını global sağlayıcıya çevirir')
    .action(() => {
        if (isGlobal) {
        console.log('Yerel sağlayıcı global sağlayıcıya çevriliyor...');
        try{
            //Buraya global sağlayıcıya geçiş için gerekli kodu ekleyeceğim. API key kontrolü burada yapılacak belki??.
            isGlobal = false;
        }
        catch(error){
            console.log('Global sağlayıcıya geçiş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            return;
        }
    }
        else {
        console.log('Zaten global sağlayıcı kullanılıyor. Değişiklik yapılmasına gerek yok.');
    }});