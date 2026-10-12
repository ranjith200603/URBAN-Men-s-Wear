import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Link } from "react-router-dom";

const styles = [
  {
    title: "Shirts",
    subtitle: "Sharp. Clean. Everyday.",
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "T-Shirts",
    subtitle: "Simple. Essential. Comfortable.",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Jeans",
    subtitle: "Built for everyday movement.",
    category: "Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Jackets",
    subtitle: "Layer your look.",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Home() {
  // Hero buttons → directly scroll to New Arrivals
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="bg-[#f8f6f1]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section>
        <Hero
          onShopClick={scrollToProducts}
          onExploreClick={scrollToProducts}
        />
      </section>

      {/* =====================================================
          SHOP BY STYLE
          FIND YOUR FIT
      ===================================================== */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
              Shop by style
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Find your fit
            </h2>
          </div>

          {/* Style Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {styles.map((style) => (
              <Link
                key={style.category}
                to={`/shop?category=${encodeURIComponent(
                  style.category
                )}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#eeeae2]">

                  {/* Image */}
                  <img
                    src={style.image}
                    alt={style.title}
                    className="h-[430px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/20" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">

                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] opacity-80">
                      {style.subtitle}
                    </p>

                    <h3 className="text-2xl font-semibold">
                      {style.title}
                    </h3>

                    <span className="mt-4 inline-block border-b border-white pb-1 text-[9px] font-bold uppercase tracking-[0.2em]">
                      Shop now
                    </span>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          NEW ARRIVALS
      ===================================================== */}
      <section
        id="products"
        className="scroll-mt-24 px-6 py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mb-12 flex items-end justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                The Collection
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                New Arrivals
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
                Modern essentials designed for everyday confidence.
              </p>
            </div>

            {/* Desktop View All */}
            <Link
              to="/shop"
              className="hidden border-b border-black pb-1 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:opacity-50 sm:block"
            >
              View all
            </Link>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

          {/* Mobile View All */}
          <div className="mt-12 text-center sm:hidden">
            <Link
              to="/shop"
              className="inline-block border-b border-black pb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              View all products
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}