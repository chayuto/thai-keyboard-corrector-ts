# Thai Keyboard Corrector — TypeScript Edition

Fixes text typed with the wrong layout between Thai Kedmanee 🆚 English QWERTY.

## Install

```bash
npm install thai-keyboard-corrector      # or -ts if name taken
```

## Quick Use

```ts
import { correct } from "thai-keyboard-corrector";

// Clear cases (≥70% of one script)
console.log(correct("l;ylfu")); // สวัสดี
console.log(correct("ฟหกด")); // asdf
console.log(correct("hello world")); // ้ำสสน ไนพสก

// Unclear cases (<70% threshold, left unchanged)
console.log(correct("hello สวัสดี")); // hello สวัสดี (unchanged)
console.log(correct("สวัสดี hello")); // สวัสดี hello (unchanged)
```

## Browser

```html
<script src="https://cdn.jsdelivr.net/npm/thai-keyboard-corrector@latest/dist/thai-keyboard-corrector.js"></script>
<script>
  console.log(ThaiKeyboardCorrector.correct("l;ylfu")); // สวัสดี
</script>
```

## API

| function            | purpose                  | example                    |
| ------------------- | ------------------------ | -------------------------- |
| `mapEngToThai(str)` | Raw EN→TH character map  | `mapEngToThai("asdf")` → `"ฟหกด"` |
| `mapThaiToEng(str)` | Raw TH→EN character map  | `mapThaiToEng("ฟหกด")` → `"asdf"` |
| `correct(str)`      | Smart auto-correction    | `correct("l;ylfu")` → `"สวัสดี"` |

## How It Works

The `correct()` function uses a 70% threshold to determine layout:

- **≥70% Latin characters** → Maps entire string to Thai
- **≥70% Thai characters** → Maps entire string to English  
- **<70% of either script** → Leaves unchanged (unclear ratio)

## Examples & Test Cases

### Clear Cases (Always Swapped)

```ts
// 100% Latin → Thai
correct("l;ylfu")        // สวัสดี
correct("asdf")          // ฟหกด
correct("hello world")   // ้ำสสน ไนพสก
correct("qwerty")        // ๆไำพะั
correct("test123")       // ะำหะ123
correct("HELLO")         // ้ำสสน

// 100% Thai → English
correct("ฟหกด")          // asdf
correct("สวัสดี")        // l;ylfu
correct("ประเทศไทย")      // xitgmlwmp
correct("ครับ")          // คiy[
correct("๑๒๓๔๕")         // 12345
```

### Unclear Cases (Left Unchanged)

```ts
// Mixed content with unclear ratio
correct("hello สวัสดี")   // hello สวัสดี (50/50 split)
correct("สวัสดี hello")   // สวัสดี hello (50/50 split)
correct("hi สวัสดี")      // hi l;ylfu (25/75 split, Thai ≥70%)
correct("สวัสดี hi")      // l;ylfu hi (75/25 split, Thai ≥70%)
```

### Edge Cases

```ts
// No script characters
correct("123456")        // 123456 (unchanged)
correct("!@#$%")         // !@#$% (unchanged)
correct("")              // "" (unchanged)
correct("   ")           // "   " (unchanged)

// Numbers and symbols are preserved
correct("test123")       // ะสสะ123
correct("hello!")        // ้ำสสน!
```

## Use Cases

### 1. Chat Applications
```ts
// User types with wrong layout
const userInput = "l;ylfu";
const corrected = correct(userInput); // "สวัสดี"
```

### 2. Form Validation
```ts
// Check if input needs correction
const needsCorrection = correct(input) !== input;
```

### 3. Real-time Text Processing
```ts
// Process text as user types
const processedText = correct(rawInput);
```

### 4. Data Cleaning
```ts
// Clean mixed keyboard layouts in datasets
const cleaned = correct("hello สวัสดี"); // "hello สวัสดี" (preserved)
```

## License

MIT 