/**
 * Russian Cyrillic to Latin mapping
 */
export function getRussianCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Russian Cyrillic alphabet
  charmap.set('А', 'A');
  charmap.set('а', 'a');
  charmap.set('Б', 'B');
  charmap.set('б', 'b');
  charmap.set('В', 'V');
  charmap.set('в', 'v');
  charmap.set('Г', 'G');
  charmap.set('г', 'g');
  charmap.set('Д', 'D');
  charmap.set('д', 'd');
  charmap.set('Е', 'E');
  charmap.set('е', 'e');
  charmap.set('Ё', 'Yo');
  charmap.set('ё', 'yo');
  charmap.set('Ж', 'Zh');
  charmap.set('ж', 'zh');
  charmap.set('З', 'Z');
  charmap.set('з', 'z');
  charmap.set('И', 'I');
  charmap.set('и', 'i');
  charmap.set('Й', 'Y');
  charmap.set('й', 'y');
  charmap.set('К', 'K');
  charmap.set('к', 'k');
  charmap.set('Л', 'L');
  charmap.set('л', 'l');
  charmap.set('М', 'M');
  charmap.set('м', 'm');
  charmap.set('Н', 'N');
  charmap.set('н', 'n');
  charmap.set('О', 'O');
  charmap.set('о', 'o');
  charmap.set('П', 'P');
  charmap.set('п', 'p');
  charmap.set('Р', 'R');
  charmap.set('р', 'r');
  charmap.set('С', 'S');
  charmap.set('с', 's');
  charmap.set('Т', 'T');
  charmap.set('т', 't');
  charmap.set('У', 'U');
  charmap.set('у', 'u');
  charmap.set('Ф', 'F');
  charmap.set('ф', 'f');
  charmap.set('Х', 'Kh');
  charmap.set('х', 'kh');
  charmap.set('Ц', 'Ts');
  charmap.set('ц', 'ts');
  charmap.set('Ч', 'Ch');
  charmap.set('ч', 'ch');
  charmap.set('Ш', 'Sh');
  charmap.set('ш', 'sh');
  charmap.set('Щ', 'Shch');
  charmap.set('щ', 'shch');
  charmap.set('Ъ', '');
  charmap.set('ъ', '');
  charmap.set('Ы', 'Y');
  charmap.set('ы', 'y');
  charmap.set('Ь', '');
  charmap.set('ь', '');
  charmap.set('Э', 'E');
  charmap.set('э', 'e');
  charmap.set('Ю', 'Yu');
  charmap.set('ю', 'yu');
  charmap.set('Я', 'Ya');
  charmap.set('я', 'ya');
  
  // Ukrainian specific
  charmap.set('Ґ', 'G');
  charmap.set('ґ', 'g');
  charmap.set('Є', 'Ye');
  charmap.set('є', 'ye');
  charmap.set('І', 'I');
  charmap.set('і', 'i');
  charmap.set('Ї', 'Yi');
  charmap.set('ї', 'yi');
  
  // Belarusian specific
  charmap.set('Ў', 'U');
  charmap.set('ў', 'u');
  
  return charmap;
}