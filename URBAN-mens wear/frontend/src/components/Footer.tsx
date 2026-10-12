import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setMessage("Please enter a valid email.");
      return;
    }

    const subscribers = JSON.parse(
      localStorage.getItem("urban-subscribers") || "[]"
    );

    if (subscribers.includes(trimmedEmail)) {
      setMessage("You're already subscribed.");
      setIsSubscribed(true);
      return;
    }

    subscribers.push(trimmedEmail);

    localStorage.setItem(
      "urban-subscribers",
      JSON.stringify(subscribers)
    );

    setEmail("");
    setIsSubscribed(true);
    setMessage("You're subscribed to URBAN.");

    setTimeout(() => {
      setIsSubscribed(false);
      setMessage("");
    }, 4000);
  };

  return (
    <footer className="bg-[#171717] text-white">

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}
      <section className="border-b border-white/10 px-6 py-16 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">

          {/* Newsletter Text */}
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Stay in the loop
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Get the latest from URBAN.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/50">
              New arrivals, exclusive drops and style updates —
              delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="flex w-full border-b border-white/30 pb-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                  setIsSubscribed(false);
                }}
                disabled={isSubscribed}
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isSubscribed}
                aria-label="Subscribe"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:text-white/50 disabled:cursor-default"
              >
                {isSubscribed ? (
                  <>
                    Subscribed
                    <Check size={16} strokeWidth={1.5} />
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </>
                )}
              </button>
            </form>

            {/* Validation / Success Message */}
            {message && (
              <p
                className={`mt-3 text-xs ${
                  isSubscribed
                    ? "text-white/60"
                    : "text-white/40"
                }`}
              >
                {isSubscribed && (
                  <Check
                    size={13}
                    strokeWidth={1.5}
                    className="mr-1 inline-block"
                  />
                )}

                {message}
              </p>
            )}
          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-block text-3xl font-bold tracking-[-0.06em] transition hover:opacity-70"
            >
              URBAN
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
              Modern menswear designed for everyday confidence.
              Clean silhouettes, timeless essentials and effortless
              style.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-medium transition duration-300 hover:border-white/40 hover:bg-white hover:text-black"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-medium transition duration-300 hover:border-white/40 hover:bg-white hover:text-black"
              >
                FB
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-medium transition duration-300 hover:border-white/40 hover:bg-white hover:text-black"
              >
                X
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Shop
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/shop"
                className="text-sm text-white/70 transition hover:text-white"
              >
                All Products
              </Link>

              <Link
                to="/shop?category=Shirts"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Shirts
              </Link>

              <Link
                to="/shop?category=T-Shirts"
                className="text-sm text-white/70 transition hover:text-white"
              >
                T-Shirts
              </Link>

              <Link
                to="/shop?category=Jeans"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Jeans
              </Link>

              <Link
                to="/shop?category=Jackets"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Jackets
              </Link>

              <Link
                to="/shop?category=Inners"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Inners
              </Link>

              <Link
                to="/shop?category=Shoes%20%26%20Accessories"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Shoes & Accessories
              </Link>
            </div>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Customer Care
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/orders"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Track Order
              </Link>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Shipping & Delivery
              </a>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Returns & Exchanges
              </a>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                FAQs
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-white/70 transition hover:text-white"
              >
                About URBAN
              </Link>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Careers
              </a>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Terms & Conditions
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}
      <div className="border-t border-white/10 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-[10px] uppercase tracking-[0.15em] text-white/30 sm:flex-row">

          <p>
            © {new Date().getFullYear()} URBAN. All rights reserved.
          </p>

          <p>
            Designed for everyday confidence.
          </p>

        </div>
      </div>

    </footer>
  );
}