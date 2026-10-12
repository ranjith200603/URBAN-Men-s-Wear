import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import BackToHome from "../components/BackToHome";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const deliveryCharge =
    cartTotal >= 999 || cartTotal === 0
      ? 0
      : 99;

  const finalTotal =
    cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">

        <div className="mx-auto max-w-7xl">

          <BackToHome />

          <div className="flex min-h-[60vh] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <ShoppingBag
                  size={32}
                  strokeWidth={1.3}
                />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                Your Shopping Bag
              </p>

              <h1 className="mt-3 text-4xl font-black">
                Your cart is empty.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-black/50">
                Looks like you haven't added anything
                to your cart yet.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">

      <div className="mx-auto max-w-7xl">

        <BackToHome />

        {/* HEADER */}

        <div className="mt-8 border-b border-black/10 pb-8">

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-black/40">
            Your Shopping Bag
          </p>

          <div className="mt-3 flex items-end justify-between">

            <h1 className="text-4xl font-black md:text-5xl">
              Cart
            </h1>

            <span className="text-sm text-black/50">
              {cart.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}{" "}
              items
            </span>

          </div>

        </div>

        <div className="grid gap-12 py-10 lg:grid-cols-[1fr_380px]">

          {/* CART ITEMS */}

          <div className="space-y-6">

            {cart.map((item) => (

              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-5 border-b border-black/10 pb-6"
              >

                <Link
                  to={`/product/${item.id}`}
                  className="h-40 w-32 flex-shrink-0 overflow-hidden bg-[#eeeae3] sm:h-48 sm:w-40"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                </Link>

                <div className="flex min-w-0 flex-1 flex-col">

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                        {item.category}
                      </p>

                      <Link
                        to={`/product/${item.id}`}
                      >
                        <h2 className="mt-1 text-base font-bold hover:opacity-50">
                          {item.name}
                        </h2>
                      </Link>

                      <p className="mt-2 text-sm text-black/50">
                        Size:{" "}
                        <span className="font-semibold text-black">
                          {item.size}
                        </span>
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center text-black/40 hover:text-black"
                    >
                      <Trash2
                        size={18}
                        strokeWidth={1.5}
                      />
                    </button>

                  </div>

                  <div className="mt-auto flex items-end justify-between">

                    {/* QUANTITY */}

                    <div className="flex h-10 items-center border border-black/15 bg-white">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="flex h-full w-9 items-center justify-center hover:bg-black/5"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="flex h-full w-9 items-center justify-center hover:bg-black/5"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    {/* PRICE */}

                    <p className="text-sm font-bold">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              </div>

            ))}

            <Link
              to="/shop"
              className="inline-block pt-3 text-sm font-semibold underline underline-offset-4"
            >
              Continue Shopping
            </Link>

          </div>

          {/* SUMMARY */}

          <aside className="h-fit bg-white p-7 lg:sticky lg:top-28">

            <h2 className="text-xl font-black">
              Order Summary
            </h2>

            <div className="my-6 h-px bg-black/10" />

            <div className="flex justify-between text-sm">

              <span className="text-black/50">
                Subtotal
              </span>

              <span className="font-semibold">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="mt-4 flex justify-between text-sm">

              <span className="text-black/50">
                Delivery
              </span>

              <span className="font-semibold">
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>

            </div>

            {cartTotal < 999 && (
              <div className="mt-5 bg-[#f8f6f1] p-4 text-xs leading-5 text-black/60">
                Add ₹
                {(999 - cartTotal).toLocaleString(
                  "en-IN"
                )}{" "}
                more to get free delivery.
              </div>
            )}

            <div className="my-6 h-px bg-black/10" />

            <div className="flex justify-between">

              <span className="font-bold">
                Total
              </span>

              <span className="text-xl font-black">
                ₹
                {finalTotal.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <Link
              to="/checkout"
              className="mt-7 flex h-14 items-center justify-center bg-black text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}