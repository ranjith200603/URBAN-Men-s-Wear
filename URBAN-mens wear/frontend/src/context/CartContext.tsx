import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  cartCount: number;

  cartTotal: number;

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    id: number,
    size: string
  ) => void;

  updateQuantity: (
    id: number,
    size: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] = useState<CartItem[]>([]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {

    setCart((currentCart) => {

      const existingItem =
        currentCart.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size
        );

      if (existingItem) {

        return currentCart.map(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === item.size
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        );

      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];

    });
  };

  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  const removeFromCart = (
    id: number,
    size: string
  ) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );

  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (
    id: number,
    size: string,
    quantity: number
  ) => {

    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );

  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCart([]);
  };

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }, [cart]);

  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartTotal = useMemo(() => {

    return cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {

  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}