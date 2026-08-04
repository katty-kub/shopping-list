export type Category =
  | "Potraviny"
  | "Drogerie"
  | "Domácnost";

export interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  bought: boolean;
}