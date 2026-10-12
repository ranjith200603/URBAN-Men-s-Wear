import { useState } from "react";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import BackToHome from "../components/BackToHome";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist();

  // ==========================================
  // FIND PRODUCT
  // ==========================================

  const product = products.find(
    (item) =>
      item.id === Number(id)
  );

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [quantity, setQuantity] =
    useState(1);

  const [added, setAdded] =
    useState(false);

  const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {

    return (
      <main className="min-h-screen bg-[#f8f6f1] px-6 pt-32">

        <div className="mx-auto max-w-7xl">

          <BackToHome />

          <div className="flex min-h-[60vh] items-center justify-center text-center">

            <div>

              <h1 className="text-4xl font-black">
                Product Not Found
              </h1>

              <p className="mt-3 text-sm text-black/50">
                The product you're looking for
                doesn't exist.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
              >
                Go to Shop
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================
  // WISHLIST STATUS
  // ==========================================

  const wishlisted =
    isInWishlist(product.id);

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const relatedProducts =
    products
      .filter(
        (item) =>
          item.category ===
            product.category &&
          item.id !== product.id
      )
      .slice(0, 4);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {

    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });

    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);

  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {

    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });

    }

    navigate("/cart");

  };

  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 pb-24 pt-32">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <BackToHome />

        {/* PRODUCT */}

        <div className="mt-8 grid gap-12 lg:grid-cols-2">

          {/* =================================
              PRODUCT IMAGE
          ================================= */}

          <div className="relative overflow-hidden bg-[#eeeae3]">

            <img
              src={product.image}
              alt={product.name}
              className="h-[650px] w-full object-cover transition duration-700 hover:scale-[1.02]"
            />

            <div className="absolute left-5 top-5 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
              New Arrival
            </div>

          </div>

          {/* =================================
              PRODUCT INFORMATION
          ================================= */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
              {product.category}
            </p>

            {/* NAME */}

            <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {product.name}
            </h1>

            {/* PRICE */}

            <div className="mt-6 flex items-center gap-4">

              <span className="text-2xl font-bold">
                ₹
                {product.price.toLocaleString(
                  "en-IN"
                )}
              </span>

              <span className="text-base text-black/30 line-through">
                ₹
                {product.oldPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

              <span className="bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Sale
              </span>

            </div>

            {/* DESCRIPTION */}

            <p className="mt-6 max-w-lg text-sm leading-7 text-black/50">
              A premium everyday essential designed
              for modern men's wardrobes. Clean
              construction, comfortable fit and
              timeless styling.
            </p>

            {/* SIZE */}

            <div className="mt-8">

              <div className="mb-4 flex items-center justify-between">

                <span className="text-xs font-bold uppercase tracking-widest">
                  Select Size
                </span>

                <button
                  type="button"
                  className="text-xs text-black/40 underline underline-offset-4"
                >
                  Size Guide
                </button>

              </div>

              <div className="flex flex-wrap gap-3">

                {sizes.map((size) => (

                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`flex h-12 w-14 items-center justify-center border text-sm font-semibold transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white hover:border-black"
                    }`}
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>

            {/* QUANTITY */}

            <div className="mt-8">

              <p className="mb-4 text-xs font-bold uppercase tracking-widest">
                Quantity
              </p>

              <div className="flex h-12 w-36 items-center border border-black/15 bg-white">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                  className="flex h-full w-12 items-center justify-center hover:bg-black/5"
                >
                  <Minus size={15} />
                </button>

                <span className="flex-1 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="flex h-full w-12 items-center justify-center hover:bg-black/5"
                >
                  <Plus size={15} />
                </button>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-8 flex gap-3">

              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex h-14 flex-1 items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-white transition ${
                  added
                    ? "bg-black/70"
                    : "bg-black hover:bg-black/80"
                }`}
              >

                <ShoppingBag size={18} />

                {added
                  ? "Added to Cart"
                  : "Add to Cart"}

              </button>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  wishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                title={
                  wishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`flex h-14 w-14 items-center justify-center border transition ${
                  wishlisted
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black hover:bg-black hover:text-white"
                }`}
              >

                <Heart
                  size={20}
                  strokeWidth={1.5}
                  fill={
                    wishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            </div>

            {/* BUY NOW */}

            <button
              type="button"
              onClick={handleBuyNow}
              className="mt-3 h-14 w-full border border-black bg-transparent text-sm font-bold uppercase tracking-widest transition hover:bg-black hover:text-white"
            >
              Buy Now
            </button>

            {/* BENEFITS */}

            <div className="mt-10 border-t border-black/10">

              {/* DELIVERY */}

              <div className="flex gap-4 border-b border-black/10 py-5">

                <Truck
                  size={20}
                  strokeWidth={1.4}
                />

                <div>

                  <p className="text-sm font-bold">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Free delivery on orders above ₹999
                  </p>

                </div>

              </div>

              {/* RETURNS */}

              <div className="flex gap-4 border-b border-black/10 py-5">

                <RotateCcw
                  size={20}
                  strokeWidth={1.4}
                />

                <div>

                  <p className="text-sm font-bold">
                    Easy Returns
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Easy return within 7 days
                  </p>

                </div>

              </div>

              {/* SECURITY */}

              <div className="flex gap-4 py-5">

                <ShieldCheck
                  size={20}
                  strokeWidth={1.4}
                />

                <div>

                  <p className="text-sm font-bold">
                    Secure Shopping
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Your information is protected
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            RELATED PRODUCTS
        ================================= */}

        {relatedProducts.length > 0 && (

          <section className="mt-24">

            <div className="border-b border-black/10 pb-6">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                You May Also Like
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Related Products
              </h2>

            </div>

            <div className="grid gap-x-6 gap-y-12 py-10 sm:grid-cols-2 lg:grid-cols-4">

              {relatedProducts.map((item) => (

                <ProductCard
                  key={item.id}
                  product={item}
                />

              ))}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}