interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({
  onShopClick,
  onExploreClick,
}: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#e8e3da]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1800&q=85"
          alt="URBAN men's fashion"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-end px-6 pb-16 lg:px-12 lg:pb-20">
        <div className="max-w-2xl text-white">

          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em]">
            URBAN / MEN'S COLLECTION
          </p>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Dress with
            <br />
            intention.
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-white/80">
            Contemporary menswear built around clean silhouettes,
            timeless essentials and effortless style.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">

            {/* Shop Collection */}
            <button
              type="button"
              onClick={onShopClick}
              className="bg-white px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition duration-300 hover:bg-white/90"
            >
              Shop Collection
            </button>

            {/* Explore */}
            <button
              type="button"
              onClick={onExploreClick}
              className="border border-white px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-white hover:text-black"
            >
              Explore
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}