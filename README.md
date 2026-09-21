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
| Komponentové testy | Vitest + React Testing Library | 5 |
| E2E testy | Playwright + Chromium | 2 |

Celkem projekt obsahuje **7 automatizovaných testů**.

### Komponentové testy

Pomocí Vitestu a React Testing Library ověřuji:

1. zobrazení výchozího stavu aplikace
2. přidání položky a aktualizaci počítadla
3. zamítnutí prázdné položky
4. označení položky jako koupené
5. odstranění položky a aktualizaci počítadla

Při testování používám `render`, `screen`, `userEvent` a kontroly pomocí `expect`. Prvky vyhledávám hlavně podle jejich přístupnostních rolí a názvů.

### E2E testy

Playwright ověřuje aplikaci ve skutečném prohlížeči Chromium.

E2E testy kontrolují:

1. zobrazení prázdného nákupního seznamu
2. hlavní uživatelský scénář od přidání položky přes označení jako koupené až po její odstranění

Testy používají Playwright lokátory podle přístupnostních rolí a simulují skutečné chování uživatele v prohlížeči.

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

## 🧪 Spuštění testů

### Komponentové testy

```bash
npm test
```

Komponentové testy spouští Vitest.

### E2E testy

Při prvním spuštění je potřeba nainstalovat Chromium:

```bash
npx playwright install chromium
```

Potom lze Playwright testy spustit:

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

## ✅ Další kontroly projektu

Kontrola kódu pomocí ESLintu:

```bash
npm run lint
```

Produkční build:

```bash
npm run build
```

## ⚙️ Continuous Integration

Projekt používá GitHub Actions pro automatické spouštění kontrol.

Po pushi nebo pull requestu do větve `main` se automaticky spustí:

- ESLint
- komponentové testy
- produkční build
- E2E testy v Chromiu
- vytvoření Playwright HTML reportu

Díky tomu lze rychle ověřit, jestli změna v projektu nerozbila aplikaci nebo automatizované testy.

## 📚 Co jsem si na projektu procvičila

- základy práce s Reactem a TypeScriptem
- práci s formulářem a stavem aplikace
- ukládání dat do `localStorage`
- komponentové testování pomocí Vitestu a React Testing Library
- simulaci uživatelských akcí pomocí `userEvent`
- práci s `async` a `await`
- pozitivní a negativní testovací scénáře
- práci s assertions
- hledání prvků podle přístupnostních rolí
- E2E automatizaci v Playwrightu
- práci s Playwright locatory
- izolaci jednotlivých testů
- automatické spouštění testů pomocí GitHub Actions

## 🔮 Možná budoucí vylepšení

- změna množství položky
- filtrování podle kategorií
- editace názvu položky
- vlastní kategorie
- tmavý režim
- potvrzení před odstraněním položky
- test zachování dat v `localStorage` po obnovení stránky

## 👩‍💻 Autorka

**Katy Kubašková**

- GitHub: [github.com/katty-kub](https://github.com/katty-kub)
- LinkedIn: [linkedin.com/in/katkakubaskova](https://www.linkedin.com/in/katkakubaskova)

Projekt jsem vytvořila jako praktický projekt zaměřený na React, TypeScript a základy automatizovaného testování.
