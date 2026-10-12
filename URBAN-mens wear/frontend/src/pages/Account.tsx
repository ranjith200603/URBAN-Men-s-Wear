import {
  User,
  Package,
  Heart,
  LogIn,
  UserPlus,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Account() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-5xl">

        {/* BACK TO HOME */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition duration-300 hover:bg-black hover:text-white"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
            />

            Back to Home
          </Link>
        </div>

        {/* HEADER */}
        <div className="border-b border-black/10 pb-8">

          <div className="flex items-center gap-3">

            <User
              size={18}
              strokeWidth={1.5}
            />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
              Account
            </p>

          </div>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            My Account
          </h1>

          <p className="mt-4 text-sm text-black/50">
            Manage your account, orders and wishlist.
          </p>

        </div>

        {/* ACCOUNT OPTIONS */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">

          {/* LOGIN */}
          <Link
            to="/login"
            className="group flex items-center justify-between border border-black/10 bg-white p-6 transition duration-300 hover:border-black hover:shadow-sm"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <LogIn
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <div>

                <h2 className="font-bold">
                  Login
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Sign in to your account
                </p>

              </div>

            </div>

            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

          {/* SIGN UP */}
          <Link
            to="/signup"
            className="group flex items-center justify-between border border-black/10 bg-white p-6 transition duration-300 hover:border-black hover:shadow-sm"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <UserPlus
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <div>

                <h2 className="font-bold">
                  Create Account
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Sign up for a new account
                </p>

              </div>

            </div>

            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

          {/* ORDERS */}
          <Link
            to="/orders"
            className="group flex items-center justify-between border border-black/10 bg-white p-6 transition duration-300 hover:border-black hover:shadow-sm"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <Package
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <div>

                <h2 className="font-bold">
                  My Orders
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Track your purchases
                </p>

              </div>

            </div>

            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="group flex items-center justify-between border border-black/10 bg-white p-6 transition duration-300 hover:border-black hover:shadow-sm"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <Heart
                  size={20}
                  strokeWidth={1.5}
                />
              </div>

              <div>

                <h2 className="font-bold">
                  Wishlist
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  View your saved products
                </p>

              </div>

            </div>

            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* BOTTOM LOGIN / SIGNUP */}
        <div className="mt-12 border-t border-black/10 pt-10">

          <div className="bg-black px-6 py-10 text-white md:px-10">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  URBAN MEMBERS
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Join the URBAN community.
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  Create an account for a better shopping experience.
                </p>

              </div>

              <div className="flex gap-3">

                <Link
                  to="/login"
                  className="border border-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition hover:bg-white hover:text-black"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-black transition hover:bg-white/80"
                >
                  Sign Up
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}