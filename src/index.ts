// Thai Keyboard Corrector – TypeScript
// When bundling for browser, global is now ThaiKeyboardCorrector

// ── EN (QWERTY) → TH (Kedmanee) base layer
const BASE: Record<string, string> = {
  q: 'ๆ', w: 'ไ', e: 'ำ', r: 'พ', t: 'ะ',
  y: 'ั', u: 'ี', i: 'ร', o: 'น', p: 'ย',
  '[': 'บ', ']': 'ล',
  a: 'ฟ', s: 'ห', d: 'ก', f: 'ด', g: 'เ',
  h: '้', j: '่', k: 'า', l: 'ส', ';': 'ว', "'": 'ง',
  z: 'ผ', x: 'ป', c: 'แ', v: 'อ', b: 'ิ',
  n: 'ื', m: 'ท', ',': 'ม', '.': 'ใ', '/': 'ฝ'
} as const;

const SHIFT: Record<string, string> = {
  '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5',
  '๖': '6', '๗': '7', '๘': '8', '๙': '9', '๐': '0',
  'ฃ': 'W', 'ฅ': 'E', 'ฆ': 'R', 'ฑ': 'T', 'ํ': 'Y',
  'ฐ': 'U', 'ณ': 'I', 'ญ': 'O', 'ธ': 'T',
  'ฤ': 'A', 'ฦ': 'S', 'ฌ': 'H', 'ศ': 'l', 'ษ': ';', 'ฮ': "'",
  'ฒ': 'Z', 'ฬ': 'X', 'ฯ': 'M', '฿': '.', '๏': '/', '๛': ','
} as const;

const ENG_TO_THAI: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const [en, th] of Object.entries(BASE)) {
    m[en] = th;
    m[en.toUpperCase()] = th;
  }
  return m;
})();

const THAI_TO_ENG: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const [en, th] of Object.entries(BASE)) m[th] = en;
  for (const [th, en] of Object.entries(SHIFT)) m[th] = en;
  return m;
})();

export const mapEngToThai = (txt: string) =>
  Array.from(txt).map(c => ENG_TO_THAI[c] ?? c).join('');

export const mapThaiToEng = (txt: string) =>
  Array.from(txt).map(c => THAI_TO_ENG[c] ?? c).join('');

// Always swap: if a character is Latin, map to Thai; if Thai, map to English; else leave as-is
const isThai = (c: string) => c.charCodeAt(0) >= 0x0e00 && c.charCodeAt(0) <= 0x0e7f;
const isLatin = (c: string) => /[A-Za-z]/.test(c);

export function correct(txt: string): string {
  let latin = 0, thai = 0;
  for (const c of txt) {
    if (isLatin(c)) latin++;
    else if (isThai(c)) thai++;
  }
  const total = latin + thai;
  if (total === 0) return txt;
  
  const latinRatio = latin / total;
  const thaiRatio = thai / total;
  
  if (latinRatio >= 0.7) return mapEngToThai(txt);
  if (thaiRatio >= 0.7) return mapThaiToEng(txt);
  return txt; // unclear ratio, don't do anything
}
