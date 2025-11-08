/**
 * Chinese (Simplified & Traditional) Pinyin mapping
 * Using most common characters and their romanization
 */
export function getChineseCharmap(): Map<string, string> {
  const charmap = new Map<string, string>();
  
  // Common Chinese characters with Pinyin
  // Numbers
  charmap.set('一', 'yi');
  charmap.set('二', 'er');
  charmap.set('三', 'san');
  charmap.set('四', 'si');
  charmap.set('五', 'wu');
  charmap.set('六', 'liu');
  charmap.set('七', 'qi');
  charmap.set('八', 'ba');
  charmap.set('九', 'jiu');
  charmap.set('十', 'shi');
  charmap.set('百', 'bai');
  charmap.set('千', 'qian');
  charmap.set('万', 'wan');
  charmap.set('亿', 'yi');
  
  // Common words
  charmap.set('中', 'zhong');
  charmap.set('国', 'guo');
  charmap.set('人', 'ren');
  charmap.set('大', 'da');
  charmap.set('小', 'xiao');
  charmap.set('上', 'shang');
  charmap.set('下', 'xia');
  charmap.set('左', 'zuo');
  charmap.set('右', 'you');
  charmap.set('前', 'qian');
  charmap.set('后', 'hou');
  charmap.set('东', 'dong');
  charmap.set('西', 'xi');
  charmap.set('南', 'nan');
  charmap.set('北', 'bei');
  charmap.set('年', 'nian');
  charmap.set('月', 'yue');
  charmap.set('日', 'ri');
  charmap.set('时', 'shi');
  charmap.set('分', 'fen');
  charmap.set('秒', 'miao');
  charmap.set('天', 'tian');
  charmap.set('地', 'di');
  charmap.set('男', 'nan');
  charmap.set('女', 'nv');
  charmap.set('水', 'shui');
  charmap.set('火', 'huo');
  charmap.set('木', 'mu');
  charmap.set('金', 'jin');
  charmap.set('土', 'tu');
  charmap.set('风', 'feng');
  charmap.set('雨', 'yu');
  charmap.set('雪', 'xue');
  charmap.set('云', 'yun');
  charmap.set('电', 'dian');
  charmap.set('话', 'hua');
  charmap.set('手', 'shou');
  charmap.set('机', 'ji');
  charmap.set('家', 'jia');
  charmap.set('学', 'xue');
  charmap.set('校', 'xiao');
  charmap.set('生', 'sheng');
  charmap.set('老', 'lao');
  charmap.set('师', 'shi');
  charmap.set('书', 'shu');
  charmap.set('本', 'ben');
  charmap.set('字', 'zi');
  charmap.set('画', 'hua');
  charmap.set('音', 'yin');
  charmap.set('乐', 'le');
  charmap.set('爱', 'ai');
  charmap.set('情', 'qing');
  charmap.set('心', 'xin');
  charmap.set('想', 'xiang');
  charmap.set('思', 'si');
  charmap.set('意', 'yi');
  charmap.set('见', 'jian');
  charmap.set('听', 'ting');
  charmap.set('说', 'shuo');
  charmap.set('读', 'du');
  charmap.set('写', 'xie');
  charmap.set('看', 'kan');
  charmap.set('走', 'zou');
  charmap.set('跑', 'pao');
  charmap.set('吃', 'chi');
  charmap.set('喝', 'he');
  charmap.set('睡', 'shui');
  charmap.set('觉', 'jue');
  charmap.set('做', 'zuo');
  charmap.set('作', 'zuo');
  charmap.set('工', 'gong');
  charmap.set('打', 'da');
  charmap.set('开', 'kai');
  charmap.set('关', 'guan');
  charmap.set('来', 'lai');
  charmap.set('去', 'qu');
  charmap.set('回', 'hui');
  charmap.set('到', 'dao');
  charmap.set('有', 'you');
  charmap.set('没', 'mei');
  charmap.set('是', 'shi');
  charmap.set('不', 'bu');
  charmap.set('的', 'de');
  charmap.set('了', 'le');
  charmap.set('在', 'zai');
  charmap.set('和', 'he');
  charmap.set('与', 'yu');
  charmap.set('或', 'huo');
  charmap.set('这', 'zhe');
  charmap.set('那', 'na');
  charmap.set('哪', 'na');
  charmap.set('谁', 'shei');
  charmap.set('什', 'shen');
  charmap.set('么', 'me');
  charmap.set('为', 'wei');
  charmap.set('因', 'yin');
  charmap.set('所', 'suo');
  charmap.set('以', 'yi');
  charmap.set('就', 'jiu');
  charmap.set('也', 'ye');
  charmap.set('都', 'dou');
  charmap.set('很', 'hen');
  charmap.set('太', 'tai');
  charmap.set('非', 'fei');
  charmap.set('常', 'chang');
  charmap.set('好', 'hao');
  charmap.set('坏', 'huai');
  charmap.set('对', 'dui');
  charmap.set('错', 'cuo');
  charmap.set('新', 'xin');
  charmap.set('旧', 'jiu');
  charmap.set('快', 'kuai');
  charmap.set('慢', 'man');
  charmap.set('高', 'gao');
  charmap.set('低', 'di');
  charmap.set('长', 'chang');
  charmap.set('短', 'duan');
  charmap.set('多', 'duo');
  charmap.set('少', 'shao');
  charmap.set('早', 'zao');
  charmap.set('晚', 'wan');
  charmap.set('美', 'mei');
  charmap.set('丽', 'li');
  charmap.set('明', 'ming');
  charmap.set('白', 'bai');
  charmap.set('黑', 'hei');
  charmap.set('红', 'hong');
  charmap.set('绿', 'lv');
  charmap.set('蓝', 'lan');
  charmap.set('黄', 'huang');
  charmap.set('紫', 'zi');
  
  // Chinese punctuation
  charmap.set('，', ',');
  charmap.set('。', '.');
  charmap.set('！', '!');
  charmap.set('？', '?');
  charmap.set('；', ';');
  charmap.set('：', ':');
  charmap.set('"', '"');
  charmap.set('"', '"');
  charmap.set('）', ')');
  charmap.set('【', '[');
  charmap.set('】', ']');
  charmap.set('《', '<');
  charmap.set('》', '>');
  charmap.set('、', ',');
  charmap.set('·', '.');
  charmap.set('…', '...');
  charmap.set('—', '-');
  charmap.set('～', '~');
  
  return charmap;
}

/**
 * Get Chinese stop words
 */
export function getChineseStopWords(): Set<string> {
  return new Set([
    '的', '了', '和', '是', '就', '都', '而', '及', '与', '着',
    '或', '一', '不', '在', '人', '有', '为', '以', '于', '上',
    '他', '而', '后', '之', '来', '因', '下', '可', '到', '由',
    '这', '些', '会', '也', '此', '但', '并', '个', '其', '已',
    '无', '小', '我', '们', '起', '最', '再', '今', '去', '好'
  ]);
}