# Thai Keyboard Corrector — TypeScript Edition

Fixes text typed with the wrong layout between Thai Kedmanee 🆚 English QWERTY.

## Install

```bash
npm install thai-keyboard-corrector      # or -ts if name taken
```

## Quick Use

```ts
import { correct } from "thai-keyboard-corrector";
console.log(correct("l;ylfu")); // สวัสดี
```

## Browser

```html
<script src="https://cdn.jsdelivr.net/npm/thai-keyboard-corrector@latest/dist/thai-keyboard-corrector.js"></script>
<script>
  console.log(ThaiKeyboardCorrector.correct("l;ylfu")); // สวัสดี
</script>
```

## API

| function            | purpose                  |              |       |
| ------------------- | ------------------------ | ------------ | ----- |
| `detectLayout(str)` | Returns `'thai_in_en'`, `'en_in_th'`, `'thai'`, `'en'`, `'mixed'`, or `'unknown'` |
| `mapEngToThai(str)` | Raw EN→TH character map  |              |       |
| `mapThaiToEng(str)` | Raw TH→EN character map  |              |       |
| `correct(str)`      | Detect + fix in one call |              |       |

## License

MIT 