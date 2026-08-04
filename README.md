# 🛒 Nákupní seznam

Jednoduchá webová aplikace pro vytváření nákupního seznamu. Projekt je vytvořený pomocí **Reactu, TypeScriptu a Vite**.

Uživatel může přidávat položky, vybírat jejich kategorii, označit je jako koupené a následně je ze seznamu odstranit.

---

## ✨ Funkce aplikace

- přidání nové položky
- přidání položky klávesou Enter
- výběr kategorie
- označení položky jako koupené
- přeškrtnutí koupené položky
- odstranění položky
- zobrazení celkového počtu položek
- zobrazení prázdného stavu
- responzivní design pro mobilní zařízení

---

## 🗂️ Kategorie

Položku je možné zařadit do jedné ze tří kategorií:

- Potraviny
- Drogerie
- Domácnost

Kategorie jsou definované pomocí TypeScriptového typu:

```ts
export type Category =
  | "Potraviny"
  | "Drogerie"
  | "Domácnost";
```

Díky tomu TypeScript nedovolí použít neplatnou kategorii.

---

## 🛠️ Použité technologie

- React
- TypeScript
- Vite
- HTML
- CSS
- React Hooks
- responzivní design

---

## 📁 Struktura projektu

```text
shopping-list/
├── src/
│   ├── components/
│   │   ├── AddItemForm.tsx
│   │   └── ShoppingItem.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧩 Komponenty

### `App.tsx`

Hlavní komponenta aplikace.

Obsahuje:

- stav nákupních položek
- stav názvu nové položky
- stav vybrané kategorie
- funkci pro přidání položky
- funkci pro označení položky jako koupené
- funkci pro odstranění položky

```tsx
const [items, setItems] =
  useState<ShoppingItemType[]>([]);

const [name, setName] = useState("");

const [category, setCategory] =
  useState<Category>("Potraviny");
```

---

### `AddItemForm.tsx`

Komponenta formuláře pro přidávání položek.

Obsahuje:

- textový input
- výběr kategorie
- tlačítko Přidat
- obsluhu odeslání formuláře

Formulář je možné odeslat kliknutím na tlačítko nebo stisknutím klávesy Enter.

```tsx
const handleSubmit = (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  onAdd();
};
```

---

### `ShoppingItem.tsx`

Komponenta zobrazující jednu položku nákupního seznamu.

Obsahuje:

- checkbox
- název položky
- kategorii
- tlačítko pro odstranění

Komponenta dostává data a funkce prostřednictvím props.

```tsx
interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}
```

---

## 🧠 Datový typ položky

Každá položka odpovídá rozhraní `ShoppingItem`:

```ts
export interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  bought: boolean;
}
```

### Význam vlastností

| Vlastnost | Typ | Význam |
|---|---|---|
| `id` | `string` | Jedinečný identifikátor položky |
| `name` | `string` | Název položky |
| `category` | `Category` | Kategorie položky |
| `quantity` | `number` | Počet kusů |
| `bought` | `boolean` | Informace, zda je položka koupená |

---

## 🚀 Spuštění projektu

### 1. Naklonování repozitáře

```bash
git clone URL_REPOZITARE
```

### 2. Přechod do složky projektu

```bash
cd shopping-list
```

### 3. Instalace balíčků

```bash
npm install
```

### 4. Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace se obvykle otevře na adrese:

```text
http://localhost:5173/
```

---

## 📦 Vytvoření produkční verze

```bash
npm run build
```

Hotové soubory se vytvoří ve složce:

```text
dist/
```

Náhled produkční verze lze spustit příkazem:

```bash
npm run preview
```

---

## 🔄 Jak aplikace funguje

### Přidání položky

Po odeslání formuláře se vytvoří nový objekt:

```tsx
const newItem: ShoppingItemType = {
  id: Date.now().toString(),
  name: trimmedName,
  category,
  quantity: 1,
  bought: false,
};
```

Nový objekt se přidá do pole pomocí spread operátoru:

```tsx
setItems((currentItems) => [
  ...currentItems,
  newItem,
]);
```

---

### Označení položky jako koupené

Metoda `map()` projde všechny položky.

U položky se správným `id` změní hodnotu `bought`:

```tsx
const toggleItem = (id: string) => {
  setItems((currentItems) =>
    currentItems.map((item) =>
      item.id === id
        ? {
            ...item,
            bought: !item.bought,
          }
        : item
    )
  );
};
```

---

### Odstranění položky

Metoda `filter()` vytvoří nové pole bez položky, která má zadané `id`:

```tsx
const removeItem = (id: string) => {
  setItems((currentItems) =>
    currentItems.filter(
      (item) => item.id !== id
    )
  );
};
```

---

## 📚 Co jsem si na projektu procvičila

- vytváření React komponent
- rozdělení aplikace do souborů
- props
- TypeScript interface
- vlastní TypeScript typy
- `useState`
- formuláře v Reactu
- controlled inputs
- události `onChange`, `onSubmit` a `onClick`
- `event.preventDefault()`
- vykreslování seznamu pomocí `map()`
- změnu položek pomocí `map()`
- mazání položek pomocí `filter()`
- podmíněné vykreslování
- podmíněné CSS třídy
- responzivní CSS

---

## 🔮 Možná budoucí vylepšení

- změna množství položky
- filtrování podle kategorií
- zobrazení pouze koupených nebo nekoupených položek
- tlačítko pro smazání všech koupených položek
- ukládání seznamu do `localStorage`
- editace názvu položky
- vlastní kategorie
- tmavý režim
- potvrzení před odstraněním položky
- testy komponent

---

## 👩‍💻 

Projekt vytvořený jako praktické cvičení při studiu Reactu a TypeScriptu.