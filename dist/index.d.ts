export type Layout = 'thai_in_en' | 'en_in_th' | 'thai' | 'en' | 'mixed' | 'unknown';
export declare const mapEngToThai: (txt: string) => string;
export declare const mapThaiToEng: (txt: string) => string;
export declare function detectLayout(txt: string): Layout;
export declare function correct(txt: string): string;
