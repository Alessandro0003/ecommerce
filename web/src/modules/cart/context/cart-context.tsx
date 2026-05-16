import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../schemas";
import type { Product } from "@/modules/product/schemas";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  selectedItems: CartItem[];
  selectedSubtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelected: (productId: string) => void;
  selectAll: () => void;
  unselectAll: () => void;
  clearCart: () => void;
  clearSelected: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "@petshop:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return (
        (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as CartItem[] | null) ?? []
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { productId: product.id, product, quantity: 1, selected: true },
      ];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }

  function toggleSelected(productId: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, selected: !i.selected } : i
      )
    );
  }

  function selectAll() {
    setItems((prev) => prev.map((i) => ({ ...i, selected: true })));
  }

  function unselectAll() {
    setItems((prev) => prev.map((i) => ({ ...i, selected: false })));
  }

  function clearCart() {
    setItems([]);
  }

  function clearSelected() {
    setItems((prev) => prev.filter((i) => !i.selected));
  }

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  const selectedItems = useMemo(() => items.filter((i) => i.selected), [items]);

  const selectedSubtotal = useMemo(
    () =>
      selectedItems.reduce((acc, i) => {
        const price = i.product.promotionalPrice ?? i.product.price;
        return acc + price * i.quantity;
      }, 0),
    [selectedItems]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        selectedItems,
        selectedSubtotal,
        addItem,
        removeItem,
        updateQuantity,
        toggleSelected,
        selectAll,
        unselectAll,
        clearCart,
        clearSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
