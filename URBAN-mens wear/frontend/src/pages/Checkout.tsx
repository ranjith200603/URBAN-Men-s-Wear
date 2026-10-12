import { useState } from "react";

import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const { createOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryCharge =
    cartTotal >= 999 || cartTotal === 0 ? 0 : 99;

  const finalTotal =
    cartTotal + deliveryCharge;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    /*
      IMPORTANT:

      Save the order BEFORE clearing the cart.
    */

    const newOrderId = createOrder(
      cart,
      finalTotal,
      paymentMethod
    );

    setOrderId(newOrderId);

    // Clear cart after order is saved
    clearCart();

    // Show success page
    setOrderPlaced(true);
  };

  /* =========================
     ORDER SUCCESS
  ========================== */

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-6 pt-20">
        <div className="w-full max-w-xl bg-white px-8 py-14 text-center md:px-12">

          {/* SUCCESS ICON */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
            <Check
              size={34}
              strokeWidth={1.5}
            />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-black/40">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/50">
            Your order has been successfully
            placed. We've received your order
            and will start preparing it for
            delivery.
          </p>

          {/* ORDER ID */}

          <div className="mt-6 border border-black/10 bg-[#f8f6f1] p-5">
            <p className="text-xs uppercase tracking-widest text-black/40">
              Order ID
            </p>

            <p className="mt-2 text-lg font-black tracking-wider">
              {orderId}
            </p>
          </div>

          {/* ORDER INFO */}

          <div className="mt-4 border border-black/10 bg-[#f8f6f1] p-5 text-left">

            <div className="flex justify-between text-sm">
              <span className="text-black/50">
                Payment
              </span>

              <span className="font-semibold">
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Card Payment"}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-black/50">
                Total
              </span>

              <span className="font-bold">
                ₹
                {finalTotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

          </div>

          {/* TRACK ORDER */}

          <Link
            to="/orders"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 border border-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
          >
            Track My Order
          </Link>

          {/* SHOP */}

          <Link
            to="/shop"
            className="mt-3 inline-flex w-full items-center justify-center bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  /* =========================
     EMPTY CART
  ========================== */

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-6 pt-20">

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <ShoppingBag
              size={32}
              strokeWidth={1.3}
            />
          </div>

          <h1 className="mt-8 text-4xl font-black">
            Your cart is empty.
          </h1>

          <p className="mt-4 text-sm text-black/50">
            Add some products before checking
            out.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
          >
            <ArrowLeft size={16} />
            Go to Shop
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}

        <div className="border-b border-black/10 pb-8">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-black/50 transition hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </Link>

          <h1 className="mt-6 text-4xl font-black md:text-5xl">
            Checkout
          </h1>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-12 py-10 lg:grid-cols-[1fr_380px]">

            {/* =========================
                LEFT SIDE
            ========================== */}

            <div>

              {/* CONTACT INFORMATION */}

              <section>

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    1
                  </div>

                  <h2 className="text-xl font-black">
                    Contact Information
                  </h2>

                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  <Input
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </section>

              {/* DELIVERY ADDRESS */}

              <section className="mt-12">

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    2
                  </div>

                  <h2 className="text-xl font-black">
                    Delivery Address
                  </h2>

                </div>

                <div className="mt-6 grid gap-5">

                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid gap-5 sm:grid-cols-3">

                    <Input
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      label="PIN Code"
                      name="pincode"
                      type="text"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </section>

              {/* PAYMENT */}

              <section className="mt-12">

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    3
                  </div>

                  <h2 className="text-xl font-black">
                    Payment Method
                  </h2>

                </div>

                <div className="mt-6 space-y-3">

                  {/* COD */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("cod")
                    }
                    className={`flex w-full items-center justify-between border p-5 text-left transition ${
                      paymentMethod === "cod"
                        ? "border-black bg-white"
                        : "border-black/10 bg-transparent"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          paymentMethod === "cod"
                            ? "border-black"
                            : "border-black/30"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-black" />
                        )}
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Pay when your order arrives
                        </p>

                      </div>

                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest">
                      COD
                    </span>

                  </button>

                  {/* CARD */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    className={`flex w-full items-center justify-between border p-5 text-left transition ${
                      paymentMethod === "card"
                        ? "border-black bg-white"
                        : "border-black/10 bg-transparent"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          paymentMethod === "card"
                            ? "border-black"
                            : "border-black/30"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-black" />
                        )}
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          Credit / Debit Card
                        </p>

                        <p className="mt-1 text-xs text-black/40">
                          Secure online payment
                        </p>

                      </div>

                    </div>

                    <CreditCard
                      size={21}
                      strokeWidth={1.5}
                    />

                  </button>

                </div>

                {/* CARD MESSAGE */}

                {paymentMethod === "card" && (
                  <div className="mt-5 border border-black/10 bg-white p-5">

                    <p className="text-xs leading-5 text-black/50">
                      This is a demo checkout.
                      Real card payments can be
                      connected later using
                      Razorpay or Stripe.
                    </p>

                  </div>
                )}

              </section>

            </div>

            {/* =========================
                ORDER SUMMARY
            ========================== */}

            <aside className="h-fit bg-white p-7 lg:sticky lg:top-28">

              <h2 className="text-xl font-black">
                Your Order
              </h2>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-5">

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4"
                  >

                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-[#eeeae3]">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[9px] text-white">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Size: {item.size}
                      </p>

                    </div>

                    <p className="text-sm font-semibold">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>
                ))}

              </div>

              <div className="my-6 h-px bg-black/10" />

              {/* SUBTOTAL */}

              <div className="flex justify-between text-sm">

                <span className="text-black/50">
                  Subtotal
                </span>

                <span className="font-semibold">
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* DELIVERY */}

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

              <div className="my-6 h-px bg-black/10" />

              {/* TOTAL */}

              <div className="flex items-center justify-between">

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

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="mt-7 flex h-14 w-full items-center justify-center gap-2 bg-black text-sm font-bold uppercase tracking-widest text-white transition hover:bg-black/80"
              >
                <Lock size={16} />
                Place Order
              </button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-black/30">
                Secure checkout • Easy returns
              </p>

            </aside>

          </div>

        </form>

      </div>

    </main>
  );
}

/* =========================
   INPUT COMPONENT
========================= */

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: InputProps) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-bold uppercase tracking-widest">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-14 w-full border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black"
      />

    </label>
  );
}