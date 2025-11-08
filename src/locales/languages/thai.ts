// thai.ts
export function getThaiCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Thai consonants
  charmap.set('ก', 'k');
  charmap.set('ข', 'kh');
  charmap.set('ค', 'kh');
  charmap.set('ฆ', 'kh');
  charmap.set('ง', 'ng');
  charmap.set('จ', 'ch');
  charmap.set('ฉ', 'ch');
  charmap.set('ช', 'ch');
  charmap.set('ซ', 's');
  charmap.set('ฌ', 'ch');
  charmap.set('ญ', 'y');
  charmap.set('ฎ', 'd');
  charmap.set('ฏ', 't');
  charmap.set('ฐ', 'th');
  charmap.set('ฑ', 'th');
  charmap.set('ฒ', 'th');
  charmap.set('ณ', 'n');
  charmap.set('ด', 'd');
  charmap.set('ต', 't');
  charmap.set('ถ', 'th');
  charmap.set('ท', 'th');
  charmap.set('ธ', 'th');
  charmap.set('น', 'n');
  charmap.set('บ', 'b');
  charmap.set('ป', 'p');
  charmap.set('ผ', 'ph');
  charmap.set('ฝ', 'f');
  charmap.set('พ', 'ph');
  charmap.set('ฟ', 'f');
  charmap.set('ภ', 'ph');
  charmap.set('ม', 'm');
  charmap.set('ย', 'y');
  charmap.set('ร', 'r');
  charmap.set('ล', 'l');
  charmap.set('ว', 'w');
  charmap.set('ศ', 's');
  charmap.set('ษ', 's');
  charmap.set('ส', 's');
  charmap.set('ห', 'h');
  charmap.set('ฬ', 'l');
  charmap.set('อ', 'a');
  charmap.set('ฮ', 'h');
  
  // Thai vowels
  charmap.set('ะ', 'a');
  charmap.set('า', 'a');
  charmap.set('ิ', 'i');
  charmap.set('ี', 'ee');
  charmap.set('ึ', 'ue');
  charmap.set('ื', 'ue');
  charmap.set('ุ', 'u');
  charmap.set('ู', 'oo');
  charmap.set('เ', 'e');
  charmap.set('แ', 'ae');
  charmap.set('โ', 'o');
  charmap.set('ใ', 'ai');
  charmap.set('ไ', 'ai');
  
  // Thai numerals
  charmap.set('๐', '0');
  charmap.set('๑', '1');
  charmap.set('๒', '2');
  charmap.set('๓', '3');
  charmap.set('๔', '4');
  charmap.set('๕', '5');
  charmap.set('๖', '6');
  charmap.set('๗', '7');
  charmap.set('๘', '8');
  charmap.set('๙', '9');
  
  return charmap;
}