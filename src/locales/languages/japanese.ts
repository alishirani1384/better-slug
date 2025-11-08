/**
 * Japanese Hiragana, Katakana and Kanji to Romaji mapping
 */
export function getJapaneseCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Hiragana
  charmap.set('あ', 'a');
  charmap.set('い', 'i');
  charmap.set('う', 'u');
  charmap.set('え', 'e');
  charmap.set('お', 'o');
  charmap.set('か', 'ka');
  charmap.set('き', 'ki');
  charmap.set('く', 'ku');
  charmap.set('け', 'ke');
  charmap.set('こ', 'ko');
  charmap.set('が', 'ga');
  charmap.set('ぎ', 'gi');
  charmap.set('ぐ', 'gu');
  charmap.set('げ', 'ge');
  charmap.set('ご', 'go');
  charmap.set('さ', 'sa');
  charmap.set('し', 'shi');
  charmap.set('す', 'su');
  charmap.set('せ', 'se');
  charmap.set('そ', 'so');
  charmap.set('ざ', 'za');
  charmap.set('じ', 'ji');
  charmap.set('ず', 'zu');
  charmap.set('ぜ', 'ze');
  charmap.set('ぞ', 'zo');
  charmap.set('た', 'ta');
  charmap.set('ち', 'chi');
  charmap.set('つ', 'tsu');
  charmap.set('て', 'te');
  charmap.set('と', 'to');
  charmap.set('だ', 'da');
  charmap.set('ぢ', 'ji');
  charmap.set('づ', 'zu');
  charmap.set('で', 'de');
  charmap.set('ど', 'do');
  charmap.set('な', 'na');
  charmap.set('に', 'ni');
  charmap.set('ぬ', 'nu');
  charmap.set('ね', 'ne');
  charmap.set('の', 'no');
  charmap.set('は', 'ha');
  charmap.set('ひ', 'hi');
  charmap.set('ふ', 'fu');
  charmap.set('へ', 'he');
  charmap.set('ほ', 'ho');
  charmap.set('ば', 'ba');
  charmap.set('び', 'bi');
  charmap.set('ぶ', 'bu');
  charmap.set('べ', 'be');
  charmap.set('ぼ', 'bo');
  charmap.set('ぱ', 'pa');
  charmap.set('ぴ', 'pi');
  charmap.set('ぷ', 'pu');
  charmap.set('ぺ', 'pe');
  charmap.set('ぽ', 'po');
  charmap.set('ま', 'ma');
  charmap.set('み', 'mi');
  charmap.set('む', 'mu');
  charmap.set('め', 'me');
  charmap.set('も', 'mo');
  charmap.set('や', 'ya');
  charmap.set('ゆ', 'yu');
  charmap.set('よ', 'yo');
  charmap.set('ら', 'ra');
  charmap.set('り', 'ri');
  charmap.set('る', 'ru');
  charmap.set('れ', 're');
  charmap.set('ろ', 'ro');
  charmap.set('わ', 'wa');
  charmap.set('ゐ', 'wi');
  charmap.set('ゑ', 'we');
  charmap.set('を', 'wo');
  charmap.set('ん', 'n');
  charmap.set('ゃ', 'ya');
  charmap.set('ゅ', 'yu');
  charmap.set('ょ', 'yo');
  charmap.set('っ', '');
  charmap.set('ー', '-');
  
  // Katakana
  charmap.set('ア', 'a');
  charmap.set('イ', 'i');
  charmap.set('ウ', 'u');
  charmap.set('エ', 'e');
  charmap.set('オ', 'o');
  charmap.set('カ', 'ka');
  charmap.set('キ', 'ki');
  charmap.set('ク', 'ku');
  charmap.set('ケ', 'ke');
  charmap.set('コ', 'ko');
  charmap.set('ガ', 'ga');
  charmap.set('ギ', 'gi');
  charmap.set('グ', 'gu');
  charmap.set('ゲ', 'ge');
  charmap.set('ゴ', 'go');
  charmap.set('サ', 'sa');
  charmap.set('シ', 'shi');
  charmap.set('ス', 'su');
  charmap.set('セ', 'se');
  charmap.set('ソ', 'so');
  charmap.set('ザ', 'za');
  charmap.set('ジ', 'ji');
  charmap.set('ズ', 'zu');
  charmap.set('ゼ', 'ze');
  charmap.set('ゾ', 'zo');
  charmap.set('タ', 'ta');
  charmap.set('チ', 'chi');
  charmap.set('ツ', 'tsu');
  charmap.set('テ', 'te');
  charmap.set('ト', 'to');
  charmap.set('ダ', 'da');
  charmap.set('ヂ', 'ji');
  charmap.set('ヅ', 'zu');
  charmap.set('デ', 'de');
  charmap.set('ド', 'do');
  charmap.set('ナ', 'na');
  charmap.set('ニ', 'ni');
  charmap.set('ヌ', 'nu');
  charmap.set('ネ', 'ne');
  charmap.set('ノ', 'no');
  charmap.set('ハ', 'ha');
  charmap.set('ヒ', 'hi');
  charmap.set('フ', 'fu');
  charmap.set('ヘ', 'he');
  charmap.set('ホ', 'ho');
  charmap.set('バ', 'ba');
  charmap.set('ビ', 'bi');
  charmap.set('ブ', 'bu');
  charmap.set('ベ', 'be');
  charmap.set('ボ', 'bo');
  charmap.set('パ', 'pa');
  charmap.set('ピ', 'pi');
  charmap.set('プ', 'pu');
  charmap.set('ペ', 'pe');
  charmap.set('ポ', 'po');
  charmap.set('マ', 'ma');
  charmap.set('ミ', 'mi');
  charmap.set('ム', 'mu');
  charmap.set('メ', 'me');
  charmap.set('モ', 'mo');
  charmap.set('ヤ', 'ya');
  charmap.set('ユ', 'yu');
  charmap.set('ヨ', 'yo');
  charmap.set('ラ', 'ra');
  charmap.set('リ', 'ri');
  charmap.set('ル', 'ru');
  charmap.set('レ', 're');
  charmap.set('ロ', 'ro');
  charmap.set('ワ', 'wa');
  charmap.set('ヰ', 'wi');
  charmap.set('ヱ', 'we');
  charmap.set('ヲ', 'wo');
  charmap.set('ン', 'n');
  charmap.set('ャ', 'ya');
  charmap.set('ュ', 'yu');
  charmap.set('ョ', 'yo');
  charmap.set('ッ', '');
  charmap.set('ー', '-');
  charmap.set('ヴ', 'vu');
  
  // Common Kanji
  charmap.set('日', 'nichi');
  charmap.set('本', 'hon');
  charmap.set('人', 'jin');
  charmap.set('大', 'dai');
  charmap.set('中', 'chuu');
  charmap.set('小', 'shou');
  charmap.set('上', 'ue');
  charmap.set('下', 'shita');
  charmap.set('左', 'hidari');
  charmap.set('右', 'migi');
  charmap.set('月', 'tsuki');
  charmap.set('火', 'hi');
  charmap.set('水', 'mizu');
  charmap.set('木', 'ki');
  charmap.set('金', 'kin');
  charmap.set('土', 'tsuchi');
  charmap.set('山', 'yama');
  charmap.set('川', 'kawa');
  charmap.set('田', 'ta');
  charmap.set('空', 'sora');
  charmap.set('海', 'umi');
  charmap.set('花', 'hana');
  charmap.set('雨', 'ame');
  charmap.set('雪', 'yuki');
  charmap.set('風', 'kaze');
  charmap.set('時', 'toki');
  charmap.set('間', 'kan');
  charmap.set('年', 'nen');
  charmap.set('今', 'ima');
  charmap.set('新', 'shin');
  charmap.set('古', 'furu');
  charmap.set('東', 'higashi');
  charmap.set('西', 'nishi');
  charmap.set('南', 'minami');
  charmap.set('北', 'kita');
  
  // Japanese punctuation
  charmap.set('。', '.');
  charmap.set('、', ',');
  charmap.set('・', '.');
  charmap.set('！', '!');
  charmap.set('？', '?');
  charmap.set('「', '"');
  charmap.set('」', '"');
  charmap.set('『', '"');
  charmap.set('』', '"');
  charmap.set('（', '(');
  charmap.set('）', ')');
  charmap.set('｛', '{');
  charmap.set('｝', '}');
  charmap.set('［', '[');
  charmap.set('］', ']');
  charmap.set('〜', '~');
  
  return charmap;
}

/**
 * Get Japanese particles (stop words)
 */
export function getJapaneseStopWords(): Set<string> {
  return new Set([
    'の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し',
    'れ', 'さ', 'ある', 'いる', 'も', 'する', 'から', 'な', 'こと', 'として',
    'い', 'や', 'など', 'なっ', 'ない', 'この', 'ため', 'その', 'あっ', 'よう',
    'また', 'もの', 'という', 'あり', 'まで', 'られ', 'なる', 'へ', 'か', 'だ',
    'これ', 'によって', 'により', 'おり', 'より', 'による', 'ず', 'なり', 'られる', 'において',
    'ば', 'なかっ', 'なく', 'しかし', 'について', 'せ', 'だっ', 'その後', 'できる', 'それ',
    'う', 'ので', 'なお', 'のみ', 'でき', 'き', 'つ', 'における', 'および', 'いう'
  ]);
}