import {
  Heart,
  Search,
  ShoppingBag,
  User,
  Home,
  Package,
  X,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const location = useLocation();
  const navigate = useNavigate();

  // =====================================================
  // SEARCH STATE
  // =====================================================

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // =====================================================
  // CATEGORY
  // =====================================================

  const currentCategory = new URLSearchParams(
    location.search
  ).get("category");

  const isCategoryActive = (category: string) => {
    return (
      location.pathname === "/shop" &&
      currentCategory === category
    );
  };

  // =====================================================
  // STYLES
  // =====================================================

  const normalStyle =
    "text-black transition-colors duration-300 hover:opacity-50";

  const activeStyle =
    "text-[#8B6F47] font-semibold transition-colors duration-300";

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // =====================================================
  // HOME PAGE
  // =====================================================

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* ================================================= */}
      {/* HOME OFFER BAR */}
      {/* ================================================= */}

      {isHomePage && (
        <div
          className="
            fixed
            left-0
            top-0
            z-[55]
            w-full
            overflow-hidden
            bg-black
            text-white
          "
        >
          <div
            className="
              flex
              min-w-max
              animate-[urban-marquee_22s_linear_infinite]
            "
          >
            {[1, 2].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-12
                  whitespace-nowrap
                  px-6
                  py-2.5
                "
              >
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                  "
                >
                  ✦ Free Shipping on Orders Above ₹999
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/40
                  "
                >
                  New Season Collection
                </span>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                  "
                >
                  Up to 30% Off
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/40
                  "
                >
                  Limited Time Offer
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header
        className={`
          fixed
          left-0
          z-50
          w-full
          border-b
          border-black/10
          bg-[#f8f6f1]/95
          backdrop-blur-md
          ${
            isHomePage
              ? "top-[34px]"
              : "top-0"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-6
            lg:px-10
          "
        >
          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            to="/"
            className="
              text-xl
              font-black
              tracking-[0.25em]
              text-black
              transition-opacity
              duration-300
              hover:opacity-50
            "
          >
            URBAN
          </Link>

          {/* ================================================= */}
          {/* NAVIGATION */}
          {/* ================================================= */}

          <nav
            className="
              hidden
              items-center
              gap-7
              text-sm
              font-medium
              md:flex
            "
          >
            {/* HOME */}

            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? activeStyle
                  : normalStyle
              }
            >
              <span className="flex items-center gap-1.5">
                <Home
                  size={15}
                  strokeWidth={1.5}
                />

                Home
              </span>
            </Link>

            {/* NEW ARRIVALS */}

            <Link
              to="/shop?category=New"
              className={
                isCategoryActive("New")
                  ? activeStyle
                  : normalStyle
              }
            >
              New Arrivals
            </Link>

            {/* SHIRTS */}

            <Link
              to="/shop?category=Shirts"
              className={
                isCategoryActive("Shirts")
                  ? activeStyle
                  : normalStyle
              }
            >
              Shirts
            </Link>

            {/* T-SHIRTS */}

            <Link
              to="/shop?category=T-Shirts"
              className={
                isCategoryActive("T-Shirts")
                  ? activeStyle
                  : normalStyle
              }
            >
              T-Shirts
            </Link>

            {/* JEANS */}

            <Link
              to="/shop?category=Jeans"
              className={
                isCategoryActive("Jeans")
                  ? activeStyle
                  : normalStyle
              }
            >
              Jeans
            </Link>

            {/* JACKETS */}

            <Link
              to="/shop?category=Jackets"
              className={
                isCategoryActive("Jackets")
                  ? activeStyle
                  : normalStyle
              }
            >
              Jackets
            </Link>

            {/* INNERS */}

            <Link
              to="/shop?category=Inners"
              className={
                isCategoryActive("Inners")
                  ? activeStyle
                  : normalStyle
              }
            >
              Inners
            </Link>

            {/* SHOES & ACCESSORIES */}

            <Link
              to="/shop?category=Shoes%20%26%20Accessories"
              className={
                isCategoryActive(
                  "Shoes & Accessories"
                )
                  ? activeStyle
                  : normalStyle
              }
            >
              Shoes & Accessories
            </Link>
          </nav>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="flex items-center gap-4">

            {/* SEARCH */}

            <button
              type="button"
              title="Search"
              onClick={openSearch}
              className="
                text-black
                transition-all
                duration-300
                hover:scale-110
                hover:opacity-60
              "
            >
              <Search
                size={20}
                strokeWidth={1.5}
              />
            </button>

            {/* MY ORDERS */}

            <Link
              to="/orders"
              title="My Orders"
              className={`
                hidden
                transition-all
                duration-300
                hover:scale-110
                sm:block
                ${
                  location.pathname === "/orders"
                    ? "text-[#8B6F47]"
                    : "text-black"
                }
              `}
            >
              <Package
                size={20}
                strokeWidth={1.5}
              />
            </Link>

            {/* ACCOUNT */}

            <Link
              to={
                localStorage.getItem(
                  "urban-logged-in"
                ) === "true"
                  ? "/account"
                  : "/login"
              }
              title="Account"
              className={`
                hidden
                transition-all
                duration-300
                hover:scale-110
                sm:block
                ${
                  location.pathname === "/account" ||
                  location.pathname === "/login" ||
                  location.pathname === "/signup"
                    ? "text-[#8B6F47]"
                    : "text-black"
                }
              `}
            >
              <User
                size={20}
                strokeWidth={1.5}
              />
            </Link>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              title="Wishlist"
              className={`
                relative
                hidden
                transition-all
                duration-300
                hover:scale-110
                sm:block
                ${
                  location.pathname === "/wishlist"
                    ? "text-[#8B6F47]"
                    : "text-black"
                }
              `}
            >
              <Heart
                size={20}
                strokeWidth={1.5}
              />

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}

            <Link
              to="/cart"
              title="Cart"
              className={`
                relative
                transition-all
                duration-300
                hover:scale-110
                ${
                  location.pathname === "/cart"
                    ? "text-[#8B6F47]"
                    : "text-black"
                }
              `}
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* PREMIUM SEARCH OVERLAY */}
      {/* ===================================================== */}

      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-black/20
            backdrop-blur-sm
          "
          onClick={closeSearch}
        >
          <div
            className="
              bg-[#f8f6f1]
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* SEARCH CONTAINER */}

            <div
              className="
                mx-auto
                max-w-7xl
                px-6
                py-8
                lg:px-10
              "
            >
              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-black/40
                    "
                  >
                    URBAN SEARCH
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-black/50
                    "
                  >
                    Find your next essential.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeSearch}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    border
                    border-black/10
                    text-black/50
                    transition
                    hover:border-black
                    hover:text-black
                  "
                  aria-label="Close search"
                >
                  <X
                    size={18}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* SEARCH FORM */}

              <form
                onSubmit={handleSearch}
                className="
                  mt-8
                  flex
                  items-center
                  border-b
                  border-black
                  pb-4
                "
              >
                <Search
                  size={22}
                  strokeWidth={1.5}
                  className="mr-4 text-black/40"
                />

                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search shirts, jeans, jackets..."
                  className="
                    flex-1
                    bg-transparent
                    text-xl
                    font-medium
                    outline-none
                    placeholder:text-black/20
                    md:text-2xl
                  "
                />

                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-black
                    transition
                    disabled:pointer-events-none
                    disabled:opacity-20
                  "
                >
                  Search

                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </form>

              {/* POPULAR SEARCHES */}

              <div className="mt-8">
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-black/35
                  "
                >
                  Popular Searches
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {[
                    "Shirts",
                    "T-Shirts",
                    "Jeans",
                    "Jackets",
                    "Inners",
                    "Shoes",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        navigate(
                          `/shop?search=${encodeURIComponent(
                            item
                          )}`
                        );

                        closeSearch();
                      }}
                      className="
                        border
                        border-black/10
                        px-4
                        py-2.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-black/60
                        transition
                        duration-300
                        hover:border-black
                        hover:bg-black
                        hover:text-white
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}