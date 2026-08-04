import type {
  ShoppingItem as ShoppingItemType,
} from "../types";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

function ShoppingItem({
  item,
  onToggle,
  onRemove,
}: ShoppingItemProps) {
  return (
    <li className={item.bought ? "purchased" : ""}>
      <label className="item-content">
        <input
          type="checkbox"
          checked={item.bought}
          onChange={() => onToggle(item.id)}
        />

        <span className="item-name">
          {item.name}
        </span>

        <small className="item-category">
          {item.category}
        </small>
      </label>

      <button
        className="delete-button"
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Smazat položku ${item.name}`}
        title="Smazat položku"
      >
        🗑️
      </button>
    </li>
  );
}

export default ShoppingItem;