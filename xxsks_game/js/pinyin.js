// 拼音题库：按认读、辨音、拼读到拼写的顺序组织
(function (global) {
  'use strict';

  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(items) { return items[randInt(0, items.length - 1)]; }
  function shuffle(items) {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  const INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'];
  const SINGLE_FINALS = ['a', 'o', 'e', 'i', 'u', 'ü'];
  const COMPOUND_FINALS = ['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er'];
  const NASAL_FINALS = ['an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'];
  const WHOLE_SYLLABLES = [
    { pinyin: 'zhǐ', hanzi: '纸' }, { pinyin: 'chí', hanzi: '池' },
    { pinyin: 'shī', hanzi: '诗' }, { pinyin: 'rì', hanzi: '日' },
    { pinyin: 'zǐ', hanzi: '子' }, { pinyin: 'cì', hanzi: '次' },
    { pinyin: 'sì', hanzi: '四' }, { pinyin: 'yī', hanzi: '衣' },
    { pinyin: 'wū', hanzi: '屋' }, { pinyin: 'yǔ', hanzi: '雨' },
    { pinyin: 'yè', hanzi: '夜' }, { pinyin: 'yuè', hanzi: '月' },
    { pinyin: 'yuán', hanzi: '圆' }, { pinyin: 'yín', hanzi: '银' },
    { pinyin: 'yún', hanzi: '云' }, { pinyin: 'yīng', hanzi: '英' }
  ];
  const REGULAR_SYLLABLES = ['bā', 'pō', 'mǎ', 'fēi', 'dà', 'tí', 'nǐ', 'lù', 'gē', 'kè', 'hǎo', 'jiā', 'qǐ', 'xiǎo', 'huā', 'guǒ', 'xué', 'shuǐ', 'tiān', 'lǜ'];
  const BLENDS = [
    { initial: 'b', final: 'ā', pinyin: 'bā', hanzi: '八' },
    { initial: 'p', final: 'ō', pinyin: 'pō', hanzi: '坡' },
    { initial: 'm', final: 'ǎ', pinyin: 'mǎ', hanzi: '马' },
    { initial: 'f', final: 'ēi', pinyin: 'fēi', hanzi: '飞' },
    { initial: 'd', final: 'à', pinyin: 'dà', hanzi: '大' },
    { initial: 't', final: 'í', pinyin: 'tí', hanzi: '提' },
    { initial: 'n', final: 'ǐ', pinyin: 'nǐ', hanzi: '你' },
    { initial: 'l', final: 'ǜ', pinyin: 'lǜ', hanzi: '绿' },
    { initial: 'g', final: 'ē', pinyin: 'gē', hanzi: '哥' },
    { initial: 'k', final: 'è', pinyin: 'kè', hanzi: '课' },
    { initial: 'h', final: 'ǎo', pinyin: 'hǎo', hanzi: '好' },
    { initial: 'j', final: 'iā', pinyin: 'jiā', hanzi: '家' },
    { initial: 'q', final: 'ǐ', pinyin: 'qǐ', hanzi: '起' },
    { initial: 'x', final: 'iǎo', pinyin: 'xiǎo', hanzi: '小' },
    { initial: 'zh', final: 'ǐ', pinyin: 'zhǐ', hanzi: '纸' },
    { initial: 'ch', final: 'í', pinyin: 'chí', hanzi: '池' },
    { initial: 'sh', final: 'ī', pinyin: 'shī', hanzi: '诗' },
    { initial: 'r', final: 'ì', pinyin: 'rì', hanzi: '日' },
    { initial: 'z', final: 'ǐ', pinyin: 'zǐ', hanzi: '子' },
    { initial: 'c', final: 'ì', pinyin: 'cì', hanzi: '次' },
    { initial: 's', final: 'ì', pinyin: 'sì', hanzi: '四' },
    { initial: 'y', final: 'ǔ', pinyin: 'yǔ', hanzi: '雨' },
    { initial: 'w', final: 'ū', pinyin: 'wū', hanzi: '屋' }
  ];
  const WORDS = [
    { hanzi: '八', pinyin: 'bā' }, { hanzi: '爸', pinyin: 'bà' },
    { hanzi: '笔', pinyin: 'bǐ' }, { hanzi: '不', pinyin: 'bù' },
    { hanzi: '大', pinyin: 'dà' }, { hanzi: '地', pinyin: 'dì' },
    { hanzi: '多', pinyin: 'duō' }, { hanzi: '二', pinyin: 'èr' },
    { hanzi: '花', pinyin: 'huā' }, { hanzi: '火', pinyin: 'huǒ' },
    { hanzi: '家', pinyin: 'jiā' }, { hanzi: '九', pinyin: 'jiǔ' },
    { hanzi: '可', pinyin: 'kě' }, { hanzi: '老', pinyin: 'lǎo' },
    { hanzi: '六', pinyin: 'liù' }, { hanzi: '马', pinyin: 'mǎ' },
    { hanzi: '米', pinyin: 'mǐ' }, { hanzi: '木', pinyin: 'mù' },
    { hanzi: '鸟', pinyin: 'niǎo' }, { hanzi: '牛', pinyin: 'niú' },
    { hanzi: '七', pinyin: 'qī' }, { hanzi: '人', pinyin: 'rén' },
    { hanzi: '三', pinyin: 'sān' }, { hanzi: '山', pinyin: 'shān' },
    { hanzi: '水', pinyin: 'shuǐ' }, { hanzi: '田', pinyin: 'tián' },
    { hanzi: '天', pinyin: 'tiān' }, { hanzi: '小', pinyin: 'xiǎo' },
    { hanzi: '鱼', pinyin: 'yú' }, { hanzi: '月', pinyin: 'yuè' },
    { hanzi: '早', pinyin: 'zǎo' }, { hanzi: '中', pinyin: 'zhōng' }
  ];
  const SPOKEN_WORDS = [
    { hanzi: '妈妈', pinyin: 'māma' }, { hanzi: '爸爸', pinyin: 'bàba' },
    { hanzi: '大米', pinyin: 'dàmǐ' }, { hanzi: '小鱼', pinyin: 'xiǎoyú' },
    { hanzi: '花朵', pinyin: 'huāduǒ' }, { hanzi: '天空', pinyin: 'tiānkōng' },
    { hanzi: '朋友', pinyin: 'péngyou' }, { hanzi: '学校', pinyin: 'xuéxiào' },
    { hanzi: '月亮', pinyin: 'yuèliang' }, { hanzi: '苹果', pinyin: 'píngguǒ' },
    { hanzi: '老师', pinyin: 'lǎoshī' }, { hanzi: '中国', pinyin: 'zhōngguó' }
  ];

  function options(correct, pool) {
    const out = [String(correct)];
    shuffle(pool).forEach(value => {
      if (out.length < 4 && !out.includes(String(value))) out.push(String(value));
    });
    return shuffle(out);
  }
  function choice(text, answer, pool, hint) {
    return { text: text, answer: String(answer), inputMode: 'choice', options: options(answer, pool), hint: hint, sec: 16 };
  }
  function recognition(label, targets, distractors) {
    const answer = pick(targets);
    return choice('下面哪个是' + label + '？', answer, distractors, '看一看，选出正确的一项');
  }
  function listen(text, answer, pool, sample) {
    return {
      text: '<span class="listen-prompt">' + text + '</span>',
      answer: String(answer),
      inputMode: 'choice',
      options: options(answer, pool),
      speak: sample,
      speakLang: 'zh-CN',
      hint: '点 🔊 可以再听一次',
      sec: 20
    };
  }
  function spell(item, prompt) {
    const chars = Array.from(item.pinyin);
    const extras = shuffle(Array.from('aeioubnr')).filter(c => !chars.includes(c)).slice(0, 3);
    return {
      text: '<span class="py-prompt">' + prompt + '</span><span class="py-hanzi">' + item.hanzi + '</span>',
      answer: item.pinyin,
      inputMode: 'spell',
      letters: shuffle(chars.concat(extras)),
      hint: '按顺序选字母，别忘了声调',
      sec: 24
    };
  }

  const GEN = {
    py_initial_recog() {
      const other = SINGLE_FINALS.concat(COMPOUND_FINALS, NASAL_FINALS, WHOLE_SYLLABLES.map(x => x.pinyin));
      return recognition('声母', INITIALS, other);
    },
    py_initial_sound() {
      const sample = pick(BLENDS);
      return choice('<span class="py-prompt">“' + sample.pinyin + '”的声母是什么？</span>', sample.initial, INITIALS, '读一读音节，找出开头的声母');
    },
    py_initial_listen() {
      const sample = pick(BLENDS);
      return listen('听读音节，选择它的声母', sample.initial, INITIALS, sample.hanzi);
    },
    py_final_single() {
      return recognition('单韵母', SINGLE_FINALS, INITIALS.concat(COMPOUND_FINALS, NASAL_FINALS));
    },
    py_final_compound() {
      return recognition('复韵母', COMPOUND_FINALS, INITIALS.concat(SINGLE_FINALS, NASAL_FINALS));
    },
    py_final_nasal() {
      return recognition('鼻韵母', NASAL_FINALS, INITIALS.concat(SINGLE_FINALS, COMPOUND_FINALS));
    },
    py_final_listen() {
      const sample = pick(BLENDS);
      const final = sample.final.replace(/[āáǎà]/g, 'a').replace(/[ōóǒò]/g, 'o')
        .replace(/[ēéěè]/g, 'e').replace(/[īíǐì]/g, 'i').replace(/[ūúǔù]/g, 'u')
        .replace(/[ǖǘǚǜ]/g, 'ü');
      return listen('听读音节，选择它的韵母', final, SINGLE_FINALS.concat(COMPOUND_FINALS, NASAL_FINALS), sample.hanzi);
    },
    py_whole_recog() {
      const syllable = pick(WHOLE_SYLLABLES);
      return choice('下面哪个是整体认读音节？', syllable.pinyin, REGULAR_SYLLABLES, '整体认读，看到它就能直接读');
    },
    py_blend() {
      const sample = pick(BLENDS);
      return choice('<span class="py-value">' + sample.initial + ' + ' + sample.final + ' = ?</span>', sample.pinyin, BLENDS.map(x => x.pinyin), '把声母和韵母连起来，再读出声调');
    },
    py_syllable_listen() {
      const sample = pick(BLENDS);
      return listen('听读音节，选择对应的拼音', sample.pinyin, BLENDS.map(x => x.pinyin), sample.hanzi);
    },
    py_spell_syllable() {
      return spell(pick(WORDS), '请写出这个字的拼音');
    },
    py_spell_whole() {
      return spell(pick(WHOLE_SYLLABLES), '请写出这个整体认读音节');
    },
    py_word_listen() {
      const sample = pick(SPOKEN_WORDS);
      return listen('听汉字读音，选择对应的拼音', sample.pinyin, SPOKEN_WORDS.map(x => x.pinyin), sample.hanzi);
    }
  };

  const WORLDS = [
    {
      id: 'pyw1', grade: '入门阶段', name: '声母启航', emoji: '🔤', color: '#69c7d2', desc: '认识声母，听辨音节开头',
      levels: [
        { id: 'pyw1l1', name: '声母找一找', type: 'py_initial_recog', count: 10, emoji: '🔎' },
        { id: 'pyw1l2', name: '声母听辨', type: 'py_initial_sound', count: 10, emoji: '👂' },
        { id: 'pyw1l3', name: '听音辨声母', type: 'py_initial_listen', count: 10, emoji: '🔊' }
      ]
    },
    {
      id: 'pyw2', grade: '基础阶段', name: '韵母花园', emoji: '🌱', color: '#7dff9b', desc: '从单韵母到复韵母、鼻韵母',
      levels: [
        { id: 'pyw2l1', name: '单韵母识别', type: 'py_final_single', count: 8, emoji: '🌼' },
        { id: 'pyw2l2', name: '复韵母识别', type: 'py_final_compound', count: 10, emoji: '🌷' },
        { id: 'pyw2l3', name: '鼻韵母识别', type: 'py_final_nasal', count: 10, emoji: '🌻' },
        { id: 'pyw2l4', name: '听音辨韵母', type: 'py_final_listen', count: 10, emoji: '🔊' }
      ]
    },
    {
      id: 'pyw3', grade: '进阶阶段', name: '音节星河', emoji: '✨', color: '#ffc66d', desc: '认读整体音节，练习声韵拼读',
      levels: [
        { id: 'pyw3l1', name: '整体认读音节', type: 'py_whole_recog', count: 10, emoji: '🌟' },
        { id: 'pyw3l2', name: '声母韵母拼读', type: 'py_blend', count: 10, emoji: '🧩' },
        { id: 'pyw3l3', name: '听音选拼音', type: 'py_syllable_listen', count: 10, emoji: '🔊' }
      ]
    },
    {
      id: 'pyw4', grade: '挑战阶段', name: '拼写训练营', emoji: '✍️', color: '#ff8b7b', desc: '看汉字拼写拼音，练习声调',
      levels: [
        { id: 'pyw4l1', name: '常用字拼音', type: 'py_spell_syllable', count: 8, emoji: '📝' },
        { id: 'pyw4l2', name: '整体音节拼写', type: 'py_spell_whole', count: 8, emoji: '🏁' },
        { id: 'pyw4l3', name: '听词选拼音', type: 'py_word_listen', count: 10, emoji: '🔊' }
      ]
    }
  ];

  function generate(type, count) {
    const make = GEN[type];
    if (!make) throw new Error('未知拼音题型: ' + type);
    const out = [];
    const recent = [];
    let guard = 0;
    while (out.length < count && guard < count * 30) {
      guard++;
      const item = make();
      const key = item.text + '|' + item.answer;
      if (recent.includes(key)) continue;
      recent.push(key);
      if (recent.length > 3) recent.shift();
      out.push(item);
    }
    while (out.length < count) out.push(make());
    return out;
  }

  global.Pinyin = { WORLDS: WORLDS, generate: generate, TYPES: Object.keys(GEN) };
})(window);
