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
    detectLayout: () => detectLayout,
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
    "\u0E03": "w",
    "\u0E05": "e",
    "\u0E06": "r",
    "\u0E11": "t",
    "\u0E4D": "y",
    "\u0E10": "u",
    "\u0E13": "i",
    "\u0E0D": "o",
    "\u0E18": "t",
    "\u0E24": "a",
    "\u0E26": "s",
    "\u0E0C": "h",
    "\u0E28": "l",
    "\u0E29": ";",
    "\u0E2E": "'",
    "\u0E12": "z",
    "\u0E2C": "x",
    "\u0E2F": "m",
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
  function detectLayout(txt) {
    const raw = txt.trim().replace(/\s+/g, "");
    if (!raw) return "unknown";
    let th = 0, en = 0;
    for (const ch of raw) {
      if (isThai(ch)) th++;
      else if (isLatin(ch)) en++;
    }
    if (th > en) return "en_in_th";
    if (en > th) return "thai_in_en";
    if (th === 0 && en === 0) return "unknown";
    return "mixed";
  }
  function correct(txt) {
    switch (detectLayout(txt)) {
      case "thai_in_en":
        return mapEngToThai(txt);
      case "en_in_th":
        return mapThaiToEng(txt);
      default:
        return txt;
    }
  }
  return __toCommonJS(src_exports);
})();
