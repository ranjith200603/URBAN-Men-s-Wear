import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {

  const navigate = useNavigate();

  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (
    product: (typeof wishlist)[number]
  ) => {

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size: "M",
    });

    // Remove product from wishlist
    removeFromWishlist(product.id);

    // Automatically go to cart
    navigate("/cart");
  };

  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlist.length === 0) {
    return (
      <section className="min-h-[80vh] bg-[#f8f6f1] px-6 py-20">

        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-20 text-center">

          <Heart
            size={42}
            strokeWidth={1}
            className="mb-6"
          />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
            Your Wishlist
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your wishlist is empty
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
            Save your favorite pieces here and come back whenever
            you're ready to shop.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-black/80"
          >
            Continue Shopping
          </Link>

        </div>

      </section>
    );
  }

  // ==========================================
  // WISHLIST
  // ==========================================

  return (
    <section className="min-h-screen bg-[#f8f6f1] px-6 py-16 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-8">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
              Saved Pieces
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Wishlist
            </h1>

            <p className="mt-2 text-sm text-black/50">
              {wishlistCount}{" "}
              {wishlistCount === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>

          </div>

          {/* CLEAR ALL */}

          <button
            type="button"
            onClick={clearWishlist}
            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-black/50 transition hover:text-black sm:flex"
          >
            <Trash2
              size={15}
              strokeWidth={1.5}
            />

            Clear All
          </button>

        </div>

        {/* ================= PRODUCTS ================= */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

          {wishlist.map((product) => (

            <div
              key={product.id}
              className="group"
            >

              {/* ================= IMAGE ================= */}

              <div className="relative overflow-hidden bg-[#f1eee8]">

                <Link
                  to={`/product/${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* REMOVE */}

                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                  title="Remove from wishlist"
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-sm transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
                >
                  <Trash2
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

              </div>

              {/* ================= PRODUCT INFO ================= */}

              <div className="pt-3">

                {/* CATEGORY */}

                <p className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                  {product.category}
                </p>

                {/* PRODUCT NAME */}

                <Link
                  to={`/product/${product.id}`}
                >
                  <h3 className="mt-1 text-sm font-semibold transition hover:opacity-50">
                    {product.name}
                  </h3>
                </Link>

                {/* PRICE */}

                <div className="mt-1.5 flex items-center gap-2">

                  <span className="text-sm font-semibold">
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="text-xs text-black/30 line-through">
                    ₹
                    {product.oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 border border-black bg-black px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-transparent hover:text-black"
                >

                  <ShoppingBag
                    size={15}
                    strokeWidth={1.5}
                  />

                  Add to Cart

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* ================= MOBILE CLEAR ================= */}

        <button
          type="button"
          onClick={clearWishlist}
          className="mt-12 flex w-full items-center justify-center gap-2 border border-black/10 px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black/60 transition hover:border-black hover:text-black sm:hidden"
        >

          <Trash2
            size={15}
            strokeWidth={1.5}
          />

          Clear Wishlist

        </button>

      </div>

    </section>
  );
}