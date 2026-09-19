# 🛒 Nákupní seznam

[![Automatizované testy](https://github.com/katty-kub/shopping-list/actions/workflows/playwright.yml/badge.svg)](https://github.com/katty-kub/shopping-list/actions/workflows/playwright.yml)

Webová aplikace pro vytváření nákupního seznamu vytvořená pomocí Reactu a TypeScriptu. Projekt obsahuje komponentové i end-to-end automatizované testy.

## ✨ Funkce aplikace

- přidání nové položky
- přidání položky klávesou Enter
- výběr kategorie
- označení položky jako koupené
- odstranění položky
- zobrazení celkového počtu položek
- validace prázdného vstupu
- ukládání seznamu do `localStorage`
- responzivní design

## 🛠️ Použité technologie

- React
- TypeScript
- Vite
- HTML a CSS
- Vitest
- React Testing Library
- Playwright
- GitHub Actions

## 🧪 Automatizované testování

Projekt obsahuje dvě úrovně automatizovaných testů:

| Druh testů | Nástroje | Počet |
|---|---|---:|
| Komponentové testy | Vitest + React Testing Library | 13 |
| E2E testy | Playwright + Chromium | 6 |

### E2E scénáře

Playwright ověřuje:

1. zobrazení prázdného nákupního seznamu
2. přidání nové položky
3. zamítnutí prázdné položky
4. uložení položky do vybrané kategorie
5. označení položky jako koupené
6. odstranění položky a aktualizaci počítadla

Testy používají lokátory podle přístupnostních rolí a simulují skutečné uživatelské chování v prohlížeči.

## 🚀 Spuštění projektu

```bash
git clone https://github.com/katty-kub/shopping-list.git
cd shopping-list
npm install
npm run dev
```

Aplikace bude dostupná na:

```text
http://localhost:5173
```

## Spuštění testů

### Komponentové testy

```bash
npm test
```

### E2E testy

Při prvním spuštění je potřeba nainstalovat Chromium:

```bash
npx playwright install chromium
```

Potom lze testy spustit příkazem:

```bash
npm run test:e2e
```

### Interaktivní režim Playwright

```bash
npm run test:e2e:ui
```

### HTML report

```bash
npm run test:e2e:report
```

## Další kontroly projektu

```bash
npm run lint
npm run build
```

## ⚙️ Continuous Integration

GitHub Actions po každém pushi nebo pull requestu do větve `main` automaticky spustí:

- ESLint
- komponentové testy
- produkční build
- E2E testy v Chromiu
- vytvoření Playwright HTML reportu

## 📁 Struktura projektu

```text
shopping-list/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── e2e/
│   └── shopping-list.spec.ts
├── src/
│   ├── components/
│   ├── test/
│   ├── types/
│   ├── App.test.tsx
│   └── App.tsx
├── playwright.config.ts
├── package.json
├── vite.config.ts
└── README.md
```

## 📚 Co jsem si procvičila

- tvorbu React komponent v TypeScriptu
- práci se stavem a formuláři
- ukládání dat do `localStorage`
- komponentové testování
- E2E automatizaci v Playwrightu
- tvorbu uživatelských testovacích scénářů
- práci s přístupnostními lokátory
- automatické spouštění testů v GitHub Actions

## 🔮 Možná budoucí vylepšení

- změna množství položky
- filtrování podle kategorií
- editace názvu položky
- vlastní kategorie
- tmavý režim
- potvrzení před odstraněním položky

## 👩‍💻 Autorka

Projekt vytvořila [Katy Kubašková](https://github.com/katty-kub) jako praktické cvičení Reactu, TypeScriptu a automatizovaného testování.