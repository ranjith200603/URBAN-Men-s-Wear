import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <CartProvider>

      <OrderProvider>

        <WishlistProvider>

          <App />

        </WishlistProvider>

      </OrderProvider>

    </CartProvider>

  </StrictMode>
);