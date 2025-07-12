import { describe, it, expect } from 'vitest';
import { correct, mapEngToThai, mapThaiToEng, detectLayout } from '../src/index';

describe('Thai-Keyboard-Corrector', () => {
  it('detects layouts', () => {
    expect(detectLayout('l;ylfu')).toBe('thai_in_en');
    expect(detectLayout('ฟหกด')).toBe('en_in_th');
  });

  it('maps EN→TH correctly', () => {
    expect(mapEngToThai('l;ylfu')).toBe('สวัสดี');
  });

  it('maps TH→EN correctly', () => {
    expect(mapThaiToEng('ฟหกด')).toBe('asdf');
  });

  it('auto-corrects smartly', () => {
    expect(correct('l;ylfu')).toBe('สวัสดี');
    expect(correct('ฟหกด')).toBe('asdf');
    expect(correct('สวัสดี')).toBe('สวัสดี'); // no change
  });
});
