import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../data/products";

interface WishlistContextType {
  wishlist: Product[];

  wishlistCount: number;

  isInWishlist: (
    productId: number
  ) => boolean;

  toggleWishlist: (
    product: Product
  ) => void;

  removeFromWishlist: (
    productId: number
  ) => void;

  clearWishlist: () => void;
}

const WishlistContext =
  createContext<
    WishlistContextType | undefined
  >(undefined);

const STORAGE_KEY = "urban-wishlist";

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [wishlist, setWishlist] =
    useState<Product[]>(() => {

      try {

        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (!saved) {
          return [];
        }

        return JSON.parse(
          saved
        ) as Product[];

      } catch {

        return [];

      }

    });

  // ==========================================
  // SAVE WISHLIST
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  const isInWishlist = (
    productId: number
  ) => {

    return wishlist.some(
      (product) =>
        product.id === productId
    );

  };

  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const toggleWishlist = (
    product: Product
  ) => {

    setWishlist(
      (currentWishlist) => {

        const exists =
          currentWishlist.some(
            (item) =>
              item.id === product.id
          );

        if (exists) {

          return currentWishlist.filter(
            (item) =>
              item.id !== product.id
          );

        }

        return [
          ...currentWishlist,
          product,
        ];

      }
    );

  };

  // ==========================================
  // REMOVE
  // ==========================================

  const removeFromWishlist = (
    productId: number
  ) => {

    setWishlist(
      (currentWishlist) =>
        currentWishlist.filter(
          (item) =>
            item.id !== productId
        )
    );

  };

  // ==========================================
  // CLEAR ALL
  // ==========================================

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount:
          wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {

  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}