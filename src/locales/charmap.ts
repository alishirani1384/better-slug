import type { Language } from '../core/types';
import { getFarsiCharmap } from './languages/farsi';
import { getArabicCharmap } from './languages/arabic';
import { getChineseCharmap } from './languages/chinese';
import { getRussianCharmap } from './languages/russian';
import { getGreekCharmap } from './languages/greek';
import { getHebrewCharmap } from './languages/hebrew';
import { getHindiCharmap } from './languages/hindi';
import { getThaiCharmap } from './languages/thai';
import { getVietnameseCharmap } from './languages/vietnamese';
import { getJapaneseCharmap } from './languages/japanese';
import { getKoreanCharmap } from './languages/korean';
import { getCommonCharmap } from './languages/common';

/**
 * Master charmap registry
 */
const CHARMAP_REGISTRY = new Map<Language, () => Map<string, string>>();

// Register all language charmaps
CHARMAP_REGISTRY.set('fa', getFarsiCharmap);
CHARMAP_REGISTRY.set('ar', getArabicCharmap);
CHARMAP_REGISTRY.set('zh', getChineseCharmap);
CHARMAP_REGISTRY.set('ru', getRussianCharmap);
CHARMAP_REGISTRY.set('el', getGreekCharmap);
CHARMAP_REGISTRY.set('he', getHebrewCharmap);
CHARMAP_REGISTRY.set('hi', getHindiCharmap);
CHARMAP_REGISTRY.set('th', getThaiCharmap);
CHARMAP_REGISTRY.set('vi', getVietnameseCharmap);
CHARMAP_REGISTRY.set('ja', getJapaneseCharmap);
CHARMAP_REGISTRY.set('ko', getKoreanCharmap);

/**
 * Get charmap for a specific language
 */
export function getCharmap(language: Language): Map<string, string> {
  const loader = CHARMAP_REGISTRY.get(language);
  
  if (loader) {
    return loader();
  }
  
  // Return common charmap for unsupported languages
  return getCommonCharmap();
}

/**
 * Merge multiple charmaps
 */
export function mergeCharmaps(...maps: Map<string, string>[]): Map<string, string> {
  const result = new Map<string, string>();
  
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }
  
  return result;
}