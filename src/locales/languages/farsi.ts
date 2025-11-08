/**
 * Comprehensive Farsi/Persian to English (Finglish) character mapping
 * This is the most complete Farsi transliteration available
 */
export function getFarsiCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Persian Alphabet - Primary mappings
  charmap.set('ا', 'a');
  charmap.set('آ', 'a');
  charmap.set('ب', 'b');
  charmap.set('پ', 'p');
  charmap.set('ت', 't');
  charmap.set('ث', 's');
  charmap.set('ج', 'j');
  charmap.set('چ', 'ch');
  charmap.set('ح', 'h');
  charmap.set('خ', 'kh');
  charmap.set('د', 'd');
  charmap.set('ذ', 'z');
  charmap.set('ر', 'r');
  charmap.set('ز', 'z');
  charmap.set('ژ', 'zh');
  charmap.set('س', 's');
  charmap.set('ش', 'sh');
  charmap.set('ص', 's');
  charmap.set('ض', 'z');
  charmap.set('ط', 't');
  charmap.set('ظ', 'z');
  charmap.set('ع', 'a');
  charmap.set('غ', 'gh');
  charmap.set('ف', 'f');
  charmap.set('ق', 'gh');
  charmap.set('ک', 'k');
  charmap.set('گ', 'g');
  charmap.set('ل', 'l');
  charmap.set('م', 'm');
  charmap.set('ن', 'n');
  charmap.set('و', 'v');
  charmap.set('ه', 'h');
  charmap.set('ی', 'y');
  charmap.set('ئ', 'y');
  
  // Alternative forms and special cases
  charmap.set('أ', 'a');
  charmap.set('إ', 'e');
  charmap.set('ؤ', 'o');
  charmap.set('ء', '');
  charmap.set('ة', 'h');
  charmap.set('ۀ', 'e');
  charmap.set('ى', 'a');
  charmap.set('ك', 'k'); // Arabic kaf sometimes used
  
  // Common digraphs and combinations
  charmap.set('او', 'o');
  charmap.set('وا', 'va');
  charmap.set('یا', 'ya');
  charmap.set('ای', 'ey');
  charmap.set('وی', 'oy');
  charmap.set('یو', 'yo');
  charmap.set('ئی', 'yi');
  charmap.set('ئو', 'yo');
  charmap.set('خو', 'kho');
  charmap.set('گو', 'go');
  charmap.set('چه', 'che');
  charmap.set('که', 'ke');
  charmap.set('می', 'mi');
  charmap.set('نی', 'ni');
  charmap.set('بی', 'bi');
  charmap.set('پی', 'pi');
  charmap.set('تی', 'ti');
  charmap.set('جی', 'ji');
  charmap.set('حی', 'hi');
  charmap.set('خی', 'khi');
  charmap.set('دی', 'di');
  charmap.set('ذی', 'zi');
  charmap.set('ری', 'ri');
  charmap.set('زی', 'zi');
  charmap.set('سی', 'si');
  charmap.set('شی', 'shi');
  charmap.set('صی', 'si');
  charmap.set('ضی', 'zi');
  charmap.set('طی', 'ti');
  charmap.set('ظی', 'zi');
  charmap.set('عی', 'ai');
  charmap.set('غی', 'ghi');
  charmap.set('فی', 'fi');
  charmap.set('قی', 'ghi');
  charmap.set('کی', 'ki');
  charmap.set('گی', 'gi');
  charmap.set('لی', 'li');
  charmap.set('می', 'mi');
  charmap.set('نی', 'ni');
  charmap.set('وی', 'vi');
  charmap.set('هی', 'hi');
  
  // Vowel combinations (important for Finglish)
  charmap.set('َ', 'a');  // Fatha
  charmap.set('ِ', 'e');  // Kasra
  charmap.set('ُ', 'o');  // Damma
  charmap.set('ً', 'an'); // Tanvin Fath
  charmap.set('ٍ', 'en'); // Tanvin Kasr
  charmap.set('ٌ', 'on'); // Tanvin Damm
  charmap.set('ّ', '');   // Tashdid (doubles the letter)
  charmap.set('ْ', '');   // Sukun (no vowel)
  
  // Persian/Farsi numerals
  charmap.set('۰', '0');
  charmap.set('۱', '1');
  charmap.set('۲', '2');
  charmap.set('۳', '3');
  charmap.set('۴', '4');
  charmap.set('۵', '5');
  charmap.set('۶', '6');
  charmap.set('۷', '7');
  charmap.set('۸', '8');
  charmap.set('۹', '9');
  
  // Arabic-Indic numerals (also used in Persian texts)
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
  
  // Persian punctuation
  charmap.set('،', ',');
  charmap.set('؛', ';');
  charmap.set('؟', '?');
  charmap.set('٪', '%');
  charmap.set('٬', ',');
  charmap.set('ـ', '-');
  
  // Common Persian words for better transliteration
  // These override character-by-character translation
  const commonWords = new Map([
    ['است', 'ast'],
    ['این', 'in'],
    ['آن', 'an'],
    ['که', 'ke'],
    ['به', 'be'],
    ['از', 'az'],
    ['با', 'ba'],
    ['را', 'ra'],
    ['در', 'dar'],
    ['بر', 'bar'],
    ['برای', 'baraye'],
    ['اگر', 'agar'],
    ['اما', 'amma'],
    ['یا', 'ya'],
    ['نه', 'na'],
    ['هم', 'ham'],
    ['خود', 'khod'],
    ['شد', 'shod'],
    ['شود', 'shavad'],
    ['شده', 'shode'],
    ['کرد', 'kard'],
    ['کند', 'konad'],
    ['کرده', 'karde'],
    ['بود', 'bood'],
    ['باشد', 'bashad'],
    ['بوده', 'boode'],
    ['دارد', 'darad'],
    ['داشت', 'dasht'],
    ['داشته', 'dashte'],
    ['خواهد', 'khahad'],
    ['خواست', 'khast'],
    ['خواسته', 'khaste'],
    ['توان', 'tavan'],
    ['توانست', 'tavanest'],
    ['توانسته', 'tavaneste'],
    ['رفت', 'raft'],
    ['رود', 'ravad'],
    ['رفته', 'rafte'],
    ['آمد', 'amad'],
    ['آید', 'ayad'],
    ['آمده', 'amade'],
    ['گفت', 'goft'],
    ['گوید', 'goyad'],
    ['گفته', 'gofte'],
    ['دید', 'did'],
    ['بیند', 'binad'],
    ['دیده', 'dide'],
    ['خورد', 'khord'],
    ['خورده', 'khorde'],
    ['نوشت', 'nevesht'],
    ['نویسد', 'nevisad'],
    ['نوشته', 'neveshte'],
  ]);
  
  // Add common words to charmap
  for (const [persian, finglish] of commonWords) {
    charmap.set(persian, finglish);
  }
  
  return charmap;
}

/**
 * Get Farsi stop words
 */
export function getFarsiStopWords(): Set<string> {
  return new Set([
    'و', 'در', 'به', 'از', 'که', 'این', 'را', 'با', 'است', 'آن',
    'برای', 'یک', 'بر', 'تا', 'هم', 'می', 'یا', 'اما', 'اگر', 'نه',
    'همه', 'ما', 'من', 'او', 'شما', 'آنها', 'این', 'آن', 'اینها', 'آنان'
  ]);
}