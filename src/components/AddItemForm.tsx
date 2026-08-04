import type { FormEvent } from "react";
import type { Category } from "../types";

interface AddItemFormProps {
  name: string;
  category: Category;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: Category) => void;
  onAdd: () => void;
}

function AddItemForm({
  name,
  category,
  onNameChange,
  onCategoryChange,
  onAdd,
}: AddItemFormProps) {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onAdd();
  };

  return (
    <form
      className="shopping-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        onChange={(event) =>
          onNameChange(event.target.value)
        }
        placeholder="Např. Mléko..."
        aria-label="Název položky"
      />

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(
            event.target.value as Category
          )
        }
        aria-label="Kategorie položky"
      >
        <option value="Potraviny">
          Potraviny
        </option>

        <option value="Drogerie">
          Drogerie
        </option>

        <option value="Domácnost">
          Domácnost
        </option>
      </select>

      <button type="submit">
        <span className="add-icon">+</span>
        Přidat
      </button>
    </form>
  );
}

export default AddItemForm;