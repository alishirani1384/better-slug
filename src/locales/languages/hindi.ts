// hindi.ts
export function getHindiCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Devanagari vowels
  charmap.set('अ', 'a');
  charmap.set('आ', 'aa');
  charmap.set('इ', 'i');
  charmap.set('ई', 'ee');
  charmap.set('उ', 'u');
  charmap.set('ऊ', 'oo');
  charmap.set('ऋ', 'ri');
  charmap.set('ए', 'e');
  charmap.set('ऐ', 'ai');
  charmap.set('ओ', 'o');
  charmap.set('औ', 'au');
  
  // Devanagari consonants
  charmap.set('क', 'k');
  charmap.set('ख', 'kh');
  charmap.set('ग', 'g');
  charmap.set('घ', 'gh');
  charmap.set('ङ', 'ng');
  charmap.set('च', 'ch');
  charmap.set('छ', 'chh');
  charmap.set('ज', 'j');
  charmap.set('झ', 'jh');
  charmap.set('ञ', 'ny');
  charmap.set('ट', 't');
  charmap.set('ठ', 'th');
  charmap.set('ड', 'd');
  charmap.set('ढ', 'dh');
  charmap.set('ण', 'n');
  charmap.set('त', 't');
  charmap.set('थ', 'th');
  charmap.set('द', 'd');
  charmap.set('ध', 'dh');
  charmap.set('न', 'n');
  charmap.set('प', 'p');
  charmap.set('फ', 'ph');
  charmap.set('ब', 'b');
  charmap.set('भ', 'bh');
  charmap.set('म', 'm');
  charmap.set('य', 'y');
  charmap.set('र', 'r');
  charmap.set('ल', 'l');
  charmap.set('व', 'v');
  charmap.set('श', 'sh');
  charmap.set('ष', 'sh');
  charmap.set('स', 's');
  charmap.set('ह', 'h');
  charmap.set('क्ष', 'ksh');
  charmap.set('त्र', 'tr');
  charmap.set('ज्ञ', 'gy');
  
  // Matras
  charmap.set('ा', 'a');
  charmap.set('ि', 'i');
  charmap.set('ी', 'ee');
  charmap.set('ु', 'u');
  charmap.set('ू', 'oo');
  charmap.set('ृ', 'ri');
  charmap.set('े', 'e');
  charmap.set('ै', 'ai');
  charmap.set('ो', 'o');
  charmap.set('ौ', 'au');
  charmap.set('ं', 'm');
  charmap.set('ः', 'h');
  charmap.set('ँ', 'n');
  charmap.set('़', '');
  charmap.set('्', '');
  
  // Devanagari numerals
  charmap.set('०', '0');
  charmap.set('१', '1');
  charmap.set('२', '2');
  charmap.set('३', '3');
  charmap.set('४', '4');
  charmap.set('५', '5');
  charmap.set('६', '6');
  charmap.set('७', '7');
  charmap.set('८', '8');
  charmap.set('९', '9');
  
  return charmap;
}