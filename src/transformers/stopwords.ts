import type { Language } from '../core/types';
import { getFarsiStopWords } from '../locales/languages/farsi';
import { getArabicStopWords } from '../locales/languages/arabic';

/**
 * Stop words for various languages
 */
const STOP_WORDS: Map<Language, Set<string>> = new Map();

// English stop words
STOP_WORDS.set('en', new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'by', 'for',
  'from', 'has', 'had', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
  'that', 'the', 'to', 'was', 'will', 'with', 'the', 'this', 'these',
  'they', 'them', 'then', 'there', 'their', 'what', 'when', 'where',
  'who', 'which', 'why', 'how', 'all', 'would', 'she', 'her', 'hers'
]));

// German stop words  
STOP_WORDS.set('de', new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer',
  'einem', 'eines', 'und', 'oder', 'aber', 'als', 'am', 'an', 'auf',
  'aus', 'bei', 'bin', 'bis', 'bist', 'da', 'du', 'er', 'es', 'für',
  'haben', 'hat', 'ich', 'ihr', 'ihre', 'im', 'in', 'ist', 'kann',
  'mein', 'mit', 'muss', 'nicht', 'noch', 'nur', 'schon', 'sein',
  'sich', 'sie', 'sind', 'so', 'über', 'um', 'und', 'uns', 'von',
  'war', 'was', 'wenn', 'wer', 'wie', 'wir', 'wird', 'zu', 'zur'
]));

// French stop words
STOP_WORDS.set('fr', new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'à', 'au',
  'aux', 'ce', 'ces', 'cette', 'dans', 'il', 'elle', 'ils', 'elles',
  'je', 'tu', 'nous', 'vous', 'leur', 'leurs', 'lui', 'on', 'ou', 'où',
  'qui', 'que', 'quoi', 'dont', 'pour', 'sur', 'avec', 'sans', 'sous',
  'par', 'pas', 'plus', 'moins', 'très', 'trop', 'aussi', 'tout', 'tous',
  'toute', 'toutes', 'être', 'avoir', 'faire', 'pouvoir', 'aller',
  'voir', 'savoir', 'vouloir', 'venir', 'dire', 'prendre', 'mettre'
]));

// Spanish stop words
STOP_WORDS.set('es', new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'de',
  'del', 'a', 'al', 'en', 'con', 'sin', 'por', 'para', 'sobre', 'entre',
  'tras', 'ese', 'esa', 'esos', 'esas', 'este', 'esta', 'estos', 'estas',
  'que', 'quien', 'cual', 'como', 'donde', 'cuando', 'porque', 'es',
  'son', 'fue', 'era', 'eran', 'ser', 'está', 'están', 'estaba', 'yo',
  'tu', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas', 'mi',
  'mis', 'tu', 'tus', 'su', 'sus', 'nuestro', 'nuestra', 'vuestro'
]));

// Italian stop words
STOP_WORDS.set('it', new Set([
  'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'e', 'ed',
  'o', 'ma', 'se', 'perché', 'anche', 'come', 'da', 'del', 'della',
  'di', 'a', 'al', 'alla', 'in', 'nel', 'nella', 'con', 'su', 'sul',
  'per', 'tra', 'fra', 'che', 'è', 'sono', 'era', 'erano', 'essere',
  'ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno', 'avere', 'questo',
  'quello', 'questa', 'quella', 'questi', 'quelli', 'queste', 'quelle',
  'io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro', 'mio', 'tuo', 'suo'
]));

// Portuguese stop words
STOP_WORDS.set('pt', new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'de',
  'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por',
  'para', 'com', 'sem', 'sob', 'sobre', 'entre', 'que', 'qual', 'quais',
  'como', 'onde', 'quando', 'porque', 'é', 'são', 'foi', 'era', 'eram',
  'ser', 'está', 'estão', 'estava', 'eu', 'tu', 'ele', 'ela', 'nós',
  'vós', 'eles', 'elas', 'meu', 'minha', 'meus', 'minhas', 'teu', 'tua',
  'seu', 'sua', 'seus', 'suas', 'nosso', 'nossa', 'nossos', 'nossas'
]));

// Russian stop words
STOP_WORDS.set('ru', new Set([
  'и', 'в', 'во', 'не', 'что', 'он', 'на', 'я', 'с', 'со', 'как',
  'а', 'то', 'все', 'она', 'так', 'его', 'но', 'да', 'ты', 'к', 'у',
  'же', 'вы', 'за', 'бы', 'по', 'только', 'ее', 'мне', 'было', 'вот',
  'от', 'меня', 'еще', 'нет', 'о', 'из', 'ему', 'теперь', 'когда',
  'даже', 'ну', 'вдруг', 'ли', 'если', 'уже', 'или', 'ни', 'быть',
  'был', 'него', 'до', 'вас', 'нибудь', 'опять', 'уж', 'вам', 'ведь'
]));

// Add Farsi and Arabic
STOP_WORDS.set('fa', getFarsiStopWords());
STOP_WORDS.set('ar', getArabicStopWords());

/**
 * Remove stop words from text
 */
export function removeStopWords(text: string, languages: Language[]): string {
  let words = text.split(/\s+/);
  
  for (const lang of languages) {
    const stopWords = STOP_WORDS.get(lang);
    
    if (stopWords) {
      words = words.filter(word => {
        const lower = word.toLowerCase();
        return !stopWords.has(lower);
      });
    }
  }
  
  return words.join(' ');
}

/**
 * Get stop words for a language
 */
export function getStopWords(language: Language): Set<string> {
  return STOP_WORDS.get(language) || new Set();
}