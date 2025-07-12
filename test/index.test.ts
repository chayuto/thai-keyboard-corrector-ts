import { describe, it, expect } from 'vitest';
import { correct, mapEngToThai, mapThaiToEng } from '../src/index';

describe('Thai-Keyboard-Corrector', () => {
  describe('mapEngToThai', () => {
    it('maps basic English to Thai', () => {
      expect(mapEngToThai('l;ylfu')).toBe('สวัสดี');
      expect(mapEngToThai('asdf')).toBe('ฟหกด');
      expect(mapEngToThai('qwerty')).toBe('ๆไำพะั');
    });

    it('preserves unmapped characters', () => {
      expect(mapEngToThai('hello world')).toBe('้ำสสน ไนพสก');
      expect(mapEngToThai('test123')).toBe('ะำหะ123');
      expect(mapEngToThai('!@#$%')).toBe('!@#$%');
    });

    it('handles case sensitivity', () => {
      expect(mapEngToThai('HELLO')).toBe('้ำสสน');
      expect(mapEngToThai('Hello')).toBe('้ำสสน');
    });
  });

  describe('mapThaiToEng', () => {
    it('maps basic Thai to English', () => {
      expect(mapThaiToEng('ฟหกด')).toBe('asdf');
      expect(mapThaiToEng('สวัสดี')).toBe('l;ylfu');
      expect(mapThaiToEng('ๆไำพะั')).toBe('qwerty');
    });

    it('preserves unmapped characters', () => {
      expect(mapThaiToEng('สวัสดี ฟหกด')).toBe('l;ylfu asdf');
      expect(mapThaiToEng('test123')).toBe('test123');
      expect(mapThaiToEng('!@#$%')).toBe('!@#$%');
    });

    it('handles shift characters', () => {
      expect(mapThaiToEng('๑๒๓๔๕')).toBe('12345');
      expect(mapThaiToEng('ฃฅฆฑ')).toBe('WERT');
    });
  });

  describe('correct', () => {
    it('swaps all Latin to Thai and all Thai to English', () => {
      expect(correct('l;ylfu')).toBe('สวัสดี');
      expect(correct('asdf')).toBe('ฟหกด');
      expect(correct('ฟหกด')).toBe('asdf');
      expect(correct('สวัสดี')).toBe('l;ylfu');
    });

    it('leaves mixed input unchanged when ratio is unclear', () => {
      expect(correct('hello สวัสดี')).toBe('hello สวัสดี'); // 50/50 split
      expect(correct('สวัสดี hello')).toBe('สวัสดี hello'); // 50/50 split
      expect(correct('hi สวัสดี')).toBe('hi l;ylfu'); // 25/75 split, Thai ≥70%
      expect(correct('สวัสดี hi')).toBe('l;ylfu hi'); // 75/25 split, Thai ≥70%
    });

    it('handles 100% Latin input', () => {
      expect(correct('hello world')).toBe('้ำสสน ไนพสก');
      expect(correct('qwerty')).toBe('ๆไำพะั');
      expect(correct('test123')).toBe('ะำหะ123');
      expect(correct('HELLO')).toBe('้ำสสน');
      expect(correct('hello!')).toBe('้ำสสน!');
    });

    it('handles 100% Thai input', () => {
      expect(correct('ฟหกด')).toBe('asdf');
      expect(correct('สวัสดี')).toBe('l;ylfu');
      expect(correct('ประเทศไทย')).toBe('xitgmlwmp');
      expect(correct('ครับ')).toBe('คiy[');
      expect(correct('๑๒๓๔๕')).toBe('12345');
    });

    it('handles edge cases with no script characters', () => {
      expect(correct('123456')).toBe('123456');
      expect(correct('!@#$%')).toBe('!@#$%');
      expect(correct('')).toBe('');
      expect(correct('   ')).toBe('   ');
    });

    it('handles real-world examples', () => {
      // Common Thai greetings typed with English layout
      expect(correct('l;ylfu')).toBe('สวัสดี'); // สวัสดี
      expect(correct(';w')).toBe('วไ'); // ครับ
      expect(correct(';w;w')).toBe('วไวไ'); // ครับครับ
      
      // Common English words typed with Thai layout
      expect(correct('ฟหกด')).toBe('asdf'); // asdf
      expect(correct('สวัสดี')).toBe('l;ylfu'); // hello
      
      // Mixed content (should be unchanged)
      expect(correct('hello สวัสดี')).toBe('hello สวัสดี');
      expect(correct('สวัสดี hello')).toBe('สวัสดี hello');
    });

    it('handles numbers and symbols correctly', () => {
      expect(correct('test123')).toBe('ะำหะ123'); // numbers preserved
      expect(correct('hello!')).toBe('้ำสสน!'); // symbols preserved
      expect(correct('test@123')).toBe('ะำหะ@123'); // mixed symbols
      expect(correct('สวัสดี123')).toBe('l;ylfu123'); // Thai with numbers
    });

    it('handles case sensitivity in mapping', () => {
      expect(correct('HELLO')).toBe('้ำสสน'); // uppercase
      expect(correct('Hello')).toBe('้ำสสน'); // mixed case
      expect(correct('hello')).toBe('้ำสสน'); // lowercase
    });
  });
});
