import { type MouseEvent } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../data/products";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  const wishlisted = isInWishlist(product.id);

  const handleWishlist = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <div className="group">

      {/* ================= PRODUCT IMAGE ================= */}

      <div className="relative overflow-hidden bg-[#f1eee8]">

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {/* ================= WISHLIST ================= */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-sm transition-all duration-300 hover:scale-110"
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            fill={
              wishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* ================= NEW LABEL ================= */}

        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
          New
        </div>

      </div>

      {/* ================= PRODUCT INFO ================= */}

      <div className="pt-3">

        {/* CATEGORY */}

        <p className="text-[10px] uppercase tracking-[0.15em] text-black/40">
          {product.category}
        </p>

        {/* PRODUCT NAME */}

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-sm font-semibold transition hover:opacity-50">
            {product.name}
          </h3>
        </Link>

        {/* PRICE */}

        <div className="mt-1.5 flex items-center gap-2">

          <span className="text-sm font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="text-xs text-black/30 line-through">
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

    </div>
  );
}