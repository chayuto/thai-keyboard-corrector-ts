"use strict";
var ThaiKeyboardCorrector = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    correct: () => correct,
    mapEngToThai: () => mapEngToThai,
    mapThaiToEng: () => mapThaiToEng
  });
  var BASE = {
    q: "\u0E46",
    w: "\u0E44",
    e: "\u0E33",
    r: "\u0E1E",
    t: "\u0E30",
    y: "\u0E31",
    u: "\u0E35",
    i: "\u0E23",
    o: "\u0E19",
    p: "\u0E22",
    "[": "\u0E1A",
    "]": "\u0E25",
    a: "\u0E1F",
    s: "\u0E2B",
    d: "\u0E01",
    f: "\u0E14",
    g: "\u0E40",
    h: "\u0E49",
    j: "\u0E48",
    k: "\u0E32",
    l: "\u0E2A",
    ";": "\u0E27",
    "'": "\u0E07",
    z: "\u0E1C",
    x: "\u0E1B",
    c: "\u0E41",
    v: "\u0E2D",
    b: "\u0E34",
    n: "\u0E37",
    m: "\u0E17",
    ",": "\u0E21",
    ".": "\u0E43",
    "/": "\u0E1D"
  };
  var SHIFT = {
    "\u0E51": "1",
    "\u0E52": "2",
    "\u0E53": "3",
    "\u0E54": "4",
    "\u0E55": "5",
    "\u0E56": "6",
    "\u0E57": "7",
    "\u0E58": "8",
    "\u0E59": "9",
    "\u0E50": "0",
    "\u0E03": "W",
    "\u0E05": "E",
    "\u0E06": "R",
    "\u0E11": "T",
    "\u0E4D": "Y",
    "\u0E10": "U",
    "\u0E13": "I",
    "\u0E0D": "O",
    "\u0E18": "T",
    "\u0E24": "A",
    "\u0E26": "S",
    "\u0E0C": "H",
    "\u0E28": "L",
    "\u0E29": ";",
    "\u0E2E": "'",
    "\u0E12": "Z",
    "\u0E2C": "X",
    "\u0E2F": "M",
    "\u0E3F": ".",
    "\u0E4F": "/",
    "\u0E5B": ","
  };
  var ENG_TO_THAI = (() => {
    const m = {};
    for (const [en, th] of Object.entries(BASE)) {
      m[en] = th;
      m[en.toUpperCase()] = th;
    }
    return m;
  })();
  var THAI_TO_ENG = (() => {
    const m = {};
    for (const [en, th] of Object.entries(BASE)) m[th] = en;
    for (const [th, en] of Object.entries(SHIFT)) m[th] = en;
    return m;
  })();
  var mapEngToThai = (txt) => Array.from(txt).map((c) => ENG_TO_THAI[c] ?? c).join("");
  var mapThaiToEng = (txt) => Array.from(txt).map((c) => THAI_TO_ENG[c] ?? c).join("");
  var isThai = (c) => c.charCodeAt(0) >= 3584 && c.charCodeAt(0) <= 3711;
  var isLatin = (c) => /[A-Za-z]/.test(c);
  function correct(txt) {
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
    return txt;
  }
  return __toCommonJS(src_exports);
})();
