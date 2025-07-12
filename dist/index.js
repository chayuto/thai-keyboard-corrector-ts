// ── EN (QWERTY) → TH (Kedmanee) base layer
const BASE = {
    q: 'ๆ', w: 'ไ', e: 'ำ', r: 'พ', t: 'ะ',
    y: 'ั', u: 'ี', i: 'ร', o: 'น', p: 'ย',
    '[': 'บ', ']': 'ล',
    a: 'ฟ', s: 'ห', d: 'ก', f: 'ด', g: 'เ',
    h: '้', j: '่', k: 'า', l: 'ส', ';': 'ว', "'": 'ง',
    z: 'ผ', x: 'ป', c: 'แ', v: 'อ', b: 'ิ',
    n: 'ื', m: 'ท', ',': 'ม', '.': 'ใ', '/': 'ฝ'
};
// ── TH shift glyphs → EN keys
const SHIFT = {
    '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5',
    '๖': '6', '๗': '7', '๘': '8', '๙': '9', '๐': '0',
    'ฃ': 'w', 'ฅ': 'e', 'ฆ': 'r', 'ฑ': 't', 'ํ': 'y',
    'ฐ': 'u', 'ณ': 'i', 'ญ': 'o', 'ธ': 't',
    'ฤ': 'a', 'ฦ': 's', 'ฌ': 'h', 'ศ': 'l', 'ษ': ';', 'ฮ': "'",
    'ฒ': 'z', 'ฬ': 'x', 'ฯ': 'm', '฿': '.', '๏': '/', '๛': ','
};
// ── Build full maps
const ENG_TO_THAI = (() => {
    const m = {};
    for (const [en, th] of Object.entries(BASE)) {
        m[en] = th;
        m[en.toUpperCase()] = th;
    }
    return m;
})();
const THAI_TO_ENG = (() => {
    const m = {};
    for (const [en, th] of Object.entries(BASE))
        m[th] = en;
    for (const [th, en] of Object.entries(SHIFT))
        m[th] = en;
    return m;
})();
// ── Converters
export const mapEngToThai = (txt) => Array.from(txt).map(c => { var _a; return (_a = ENG_TO_THAI[c]) !== null && _a !== void 0 ? _a : c; }).join('');
export const mapThaiToEng = (txt) => Array.from(txt).map(c => { var _a; return (_a = THAI_TO_ENG[c]) !== null && _a !== void 0 ? _a : c; }).join('');
// ── Layout detection (very lightweight heuristic)
const isThai = (c) => c.charCodeAt(0) >= 0x0e00 && c.charCodeAt(0) <= 0x0e7f;
const isLatin = (c) => /[A-Za-z]/.test(c);
export function detectLayout(txt) {
    const raw = txt.trim().replace(/\s+/g, '');
    if (!raw)
        return 'unknown';
    let th = 0, en = 0;
    for (const ch of raw) {
        if (isThai(ch))
            th++;
        else if (isLatin(ch))
            en++;
    }
    if (th > en)
        return 'en_in_th';
    if (en > th)
        return 'thai_in_en';
    if (th === 0 && en === 0)
        return 'unknown';
    return 'mixed';
}
// ── Public helper that auto-corrects when layout seems swapped
export function correct(txt) {
    switch (detectLayout(txt)) {
        case 'thai_in_en': return mapEngToThai(txt);
        case 'en_in_th': return mapThaiToEng(txt);
        default: return txt;
    }
}
