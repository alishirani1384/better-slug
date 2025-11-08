/**
 * Arabic character mapping
 */
export function getArabicCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Arabic alphabet
  charmap.set('ا', 'a');
  charmap.set('أ', 'a');
  charmap.set('إ', 'i');
  charmap.set('آ', 'aa');
  charmap.set('ب', 'b');
  charmap.set('ت', 't');
  charmap.set('ث', 'th');
  charmap.set('ج', 'j');
  charmap.set('ح', 'h');
  charmap.set('خ', 'kh');
  charmap.set('د', 'd');
  charmap.set('ذ', 'dh');
  charmap.set('ر', 'r');
  charmap.set('ز', 'z');
  charmap.set('س', 's');
  charmap.set('ش', 'sh');
  charmap.set('ص', 's');
  charmap.set('ض', 'd');
  charmap.set('ط', 't');
  charmap.set('ظ', 'dh');
  charmap.set('ع', 'a');
  charmap.set('غ', 'gh');
  charmap.set('ف', 'f');
  charmap.set('ق', 'q');
  charmap.set('ك', 'k');
  charmap.set('ل', 'l');
  charmap.set('م', 'm');
  charmap.set('ن', 'n');
  charmap.set('ه', 'h');
  charmap.set('و', 'w');
  charmap.set('ي', 'y');
  charmap.set('ى', 'a');
  charmap.set('ة', 'h');
  charmap.set('ء', '');
  charmap.set('ؤ', 'w');
  charmap.set('ئ', 'y');
  
  // Arabic vowels
  charmap.set('َ', 'a');
  charmap.set('ُ', 'u');
  charmap.set('ِ', 'i');
  charmap.set('ً', 'an');
  charmap.set('ٌ', 'un');
  charmap.set('ٍ', 'in');
  charmap.set('ّ', '');
  charmap.set('ْ', '');
  
  // Arabic-Indic numerals
  charmap.set('٠', '0');
  charmap.set('١', '1');
  charmap.set('٢', '2');
  charmap.set('٣', '3');
  charmap.set('٤', '4');
  charmap.set('٥', '5');
  charmap.set('٦', '6');
  charmap.set('٧', '7');
  charmap.set('٨', '8');
  charmap.set('٩', '9');
  
  // Arabic punctuation
  charmap.set('،', ',');
  charmap.set('؛', ';');
  charmap.set('؟', '?');
  charmap.set('٪', '%');
  
  return charmap;
}

/**
 * Get Arabic stop words
 */
export function getArabicStopWords(): Set<string> {
  return new Set([
    'في', 'من', 'إلى', 'على', 'هذا', 'ذلك', 'التي', 'الذي', 'كان', 'قد',
    'مع', 'أن', 'لم', 'ما', 'هو', 'هي', 'نحن', 'أنت', 'أنتم', 'هم',
    'عن', 'بعد', 'قبل', 'عند', 'ليس', 'كل', 'بعض', 'أي', 'أو', 'و'
  ]);
}