import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "./CartContext";

export type OrderStatus =
  | "Order Placed"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export interface Order {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
  status: OrderStatus;
  deliveryDate: string;
  paymentMethod: string;
}

interface OrderContextType {
  orders: Order[];

  createOrder: (
    items: CartItem[],
    total: number,
    paymentMethod: string
  ) => string;
}

const OrderContext = createContext<
  OrderContextType | undefined
>(undefined);

const STORAGE_KEY = "urban-orders";

export function OrderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders =
        localStorage.getItem(STORAGE_KEY);

      if (!savedOrders) {
        return [];
      }

      return JSON.parse(savedOrders) as Order[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

  const createOrder = (
    items: CartItem[],
    total: number,
    paymentMethod: string
  ): string => {
    const orderId =
      "URB" +
      Date.now().toString().slice(-8);

    const today = new Date();

    const deliveryDate = new Date(today);
    deliveryDate.setDate(
      deliveryDate.getDate() + 4
    );

    const newOrder: Order = {
      id: orderId,

      date: today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      total,

      items: items.map((item) => ({
        ...item,
      })),

      status: "Order Placed",

      deliveryDate:
        deliveryDate.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),

      paymentMethod,
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    return orderId;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider"
    );
  }

  return context;
}