import { Command } from 'commander';
import { getGitDiff } from '../utils/git.js';
import { LocalLLMProvider } from '../llm/local-provider.js';
import { CloudLLMProvider } from '../llm/cloud-provider.js';
import { isGlobal } from './local-global-changer.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { execSync } from 'node:child_process';


export const commitCommand = new Command('commit')
  .description('Git değişiklikleri için yapay zeka ile commit mesajı oluşturur')
  .action(async () => {
    console.log(' Git değişiklikleri inceleniyor...');
    
    const diff = getGitDiff();
    
    if (!diff) {
      console.log(' Commit edilecek yeni bir değişiklik bulunamadı (git add yapmayı unuttun mu?).');
      return;
    }

    console.log(' Yapay Zeka düşünülüyor...');
    
    try {
      let message;

      //Eğer global sağlayıcı aktifse cloud sağlayıcıyı, değilse local sağlayıcıyı kullanarak mesaj oluşturuyoruz.
      if (isGlobal) {
        const provider = new CloudLLMProvider();
        message = await provider.generateCommitMessage(diff);
      } 
      else {
        const provider = new LocalLLMProvider();
        message = await provider.generateCommitMessage(diff);
      }

      console.log('\n Önerilen Commit Mesajı:');
      console.log(message);
      
      // Kullanıcıya onay soruyoruz
      const rl = readline.createInterface({ input, output });
      const answer = await rl.question('\n Bu mesajla commit işlemi yapılsın mı? (Y/n): ');
      rl.close();

      // Eğer kullanıcı 'y' yazarsa, 'Y' yazarsa veya hiçbir şey yazmadan direkt Enter'a basarsa kabul et
      if (answer.toLowerCase() === 'y' || answer.trim() === '') {
        console.log('\nCommit işlemi yapılıyor...');
        
        // Mesajın içindeki olası tırnak işaretlerinin komutu bozmaması için önlem alıyoruz
        const safeMessage = message.replace(/"/g, '\\"');
        
        // Gerçek git commit komutunu çalıştırıyoruz
        execSync(`git commit -m "${safeMessage}"`, { stdio: 'inherit' });
        
        console.log(' Başarıyla commit edildi!');
      } else {
        console.log('\n Commit işlemi iptal edildi.');
      }
      
    } catch (error) {
      console.log('\n İşlem sırasında bir hata oluştu.');
    }
  });