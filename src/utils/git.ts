import { execSync } from 'child_process';

export function getGitDiff(): string {
  try {
    // Önce "git add" ile eklenmiş (staged) değişiklikleri okumayı dener
    let diff = execSync('git diff --cached', { encoding: 'utf-8' });
    
    // Eğer eklenmiş bir şey yoksa, kaydedilmemiş (unstaged) değişikliklere bakar
    if (!diff) {
      diff = execSync('git diff', { encoding: 'utf-8' });
    }
    
    return diff;
  } catch (error) {
    console.error('Git değişiklikleri okunurken bir hata oluştu. Bir Git reposunda mısınız?');
    return '';
  }
}