export function getKoreanCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Korean Hangul Jamo (components)
  // Initial consonants (초성)
  charmap.set('ㄱ', 'g');
  charmap.set('ㄲ', 'kk');
  charmap.set('ㄴ', 'n');
  charmap.set('ㄷ', 'd');
  charmap.set('ㄸ', 'tt');
  charmap.set('ㄹ', 'r');
  charmap.set('ㅁ', 'm');
  charmap.set('ㅂ', 'b');
  charmap.set('ㅃ', 'pp');
  charmap.set('ㅅ', 's');
  charmap.set('ㅆ', 'ss');
  charmap.set('ㅇ', '');
  charmap.set('ㅈ', 'j');
  charmap.set('ㅉ', 'jj');
  charmap.set('ㅊ', 'ch');
  charmap.set('ㅋ', 'k');
  charmap.set('ㅌ', 't');
  charmap.set('ㅍ', 'p');
  charmap.set('ㅎ', 'h');
  
  // Vowels (중성)
  charmap.set('ㅏ', 'a');
  charmap.set('ㅐ', 'ae');
  charmap.set('ㅑ', 'ya');
  charmap.set('ㅒ', 'yae');
  charmap.set('ㅓ', 'eo');
  charmap.set('ㅔ', 'e');
  charmap.set('ㅕ', 'yeo');
  charmap.set('ㅖ', 'ye');
  charmap.set('ㅗ', 'o');
  charmap.set('ㅘ', 'wa');
  charmap.set('ㅙ', 'wae');
  charmap.set('ㅚ', 'oe');
  charmap.set('ㅛ', 'yo');
  charmap.set('ㅜ', 'u');
  charmap.set('ㅝ', 'wo');
  charmap.set('ㅞ', 'we');
  charmap.set('ㅟ', 'wi');
  charmap.set('ㅠ', 'yu');
  charmap.set('ㅡ', 'eu');
  charmap.set('ㅢ', 'ui');
  charmap.set('ㅣ', 'i');
  
  // Common Korean syllables
  charmap.set('가', 'ga');
  charmap.set('나', 'na');
  charmap.set('다', 'da');
  charmap.set('라', 'ra');
  charmap.set('마', 'ma');
  charmap.set('바', 'ba');
  charmap.set('사', 'sa');
  charmap.set('아', 'a');
  charmap.set('자', 'ja');
  charmap.set('차', 'cha');
  charmap.set('카', 'ka');
  charmap.set('타', 'ta');
  charmap.set('파', 'pa');
  charmap.set('하', 'ha');
  
  return charmap;
}