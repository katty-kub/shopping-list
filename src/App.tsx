import { useState } from "react";

import type {
  Category,
  ShoppingItem as ShoppingItemType,
} from "./types";

import AddItemForm from "./components/AddItemForm";
import ShoppingItem from "./components/ShoppingItem";

import "./App.css";

function App() {
  const [items, setItems] =
    useState<ShoppingItemType[]>([]);

  const [name, setName] = useState("");

  const [category, setCategory] =
    useState<Category>("Potraviny");

  const addItem = () => {
    const trimmedName = name.trim();

    if (trimmedName === "") {
      return;
    }

    const newItem: ShoppingItemType = {
      id: crypto.randomUUID(),
      name: trimmedName,
      category,
      quantity: 1,
      bought: false,
    };

    setItems((currentItems) => [
      ...currentItems,
      newItem,
    ]);

    setName("");
    setCategory("Potraviny");
  };

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

  const removeItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <main className="app">
      <header className="app-header">
        <span className="app-icon">🛒</span>

        <div>
          <h1>Nákupní seznam</h1>
          <p>
            Přidej vše, co potřebuješ nakoupit.
          </p>
        </div>
      </header>

      <AddItemForm
        name={name}
        category={category}
        onNameChange={setName}
        onCategoryChange={setCategory}
        onAdd={addItem}
      />

      {items.length === 0 ? (
        <div className="empty-state">
          <span>📝</span>
          <p>Seznam je zatím prázdný.</p>
        </div>
      ) : (
        <ul className="shopping-list">
          {items.map((item) => (
            <ShoppingItem
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onRemove={removeItem}
            />
          ))}
        </ul>
      )}

      <footer className="items-count">
        <span>Celkem položek</span>
        <strong>{items.length}</strong>
      </footer>
    </main>
  );
}

export default App;