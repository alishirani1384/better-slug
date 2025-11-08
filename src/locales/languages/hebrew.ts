// hebrew.ts
export function getHebrewCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Hebrew alphabet
  charmap.set('א', 'a');
  charmap.set('ב', 'b');
  charmap.set('ג', 'g');
  charmap.set('ד', 'd');
  charmap.set('ה', 'h');
  charmap.set('ו', 'v');
  charmap.set('ז', 'z');
  charmap.set('ח', 'ch');
  charmap.set('ט', 't');
  charmap.set('י', 'y');
  charmap.set('כ', 'k');
  charmap.set('ך', 'k');
  charmap.set('ל', 'l');
  charmap.set('מ', 'm');
  charmap.set('ם', 'm');
  charmap.set('נ', 'n');
  charmap.set('ן', 'n');
  charmap.set('ס', 's');
  charmap.set('ע', 'a');
  charmap.set('פ', 'p');
  charmap.set('ף', 'p');
  charmap.set('צ', 'ts');
  charmap.set('ץ', 'ts');
  charmap.set('ק', 'k');
  charmap.set('ר', 'r');
  charmap.set('ש', 'sh');
  charmap.set('ת', 't');
  
  return charmap;
}




