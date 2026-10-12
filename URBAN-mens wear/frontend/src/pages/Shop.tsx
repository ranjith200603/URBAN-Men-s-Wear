import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  useSearchParams,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";
import BackToHome from "../components/BackToHome";

import { products } from "../data/products";


const categories = [
  "All",
  "New",
  "Shirts",
  "T-Shirts",
  "Jeans",
  "Jackets",
  "Inners",
  "Shoes & Accessories",
];


export default function Shop() {

  const [searchParams, setSearchParams] =
    useSearchParams();


  // =====================================================
  // URL VALUES
  // =====================================================

  const urlCategory =
    searchParams.get("category");

  const urlSearch =
    searchParams.get("search");


  // =====================================================
  // STATE
  // =====================================================

  const [category, setCategory] =
    useState(urlCategory || "All");

  const [search, setSearch] =
    useState(urlSearch || "");

  const [sort, setSort] =
    useState("default");


  // =====================================================
  // SYNC CATEGORY WITH URL
  // =====================================================

  useEffect(() => {

    setCategory(
      urlCategory || "All"
    );

  }, [urlCategory]);


  // =====================================================
  // SYNC SEARCH WITH URL
  // =====================================================

  useEffect(() => {

    setSearch(
      urlSearch || ""
    );

  }, [urlSearch]);


  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {

    let result = [...products];


    // -------------------------------------------------
    // CATEGORY FILTER
    // -------------------------------------------------

    if (
      category !== "All" &&
      category !== "New"
    ) {

      result = result.filter(
        (product) =>
          product.category === category
      );

    }


    // -------------------------------------------------
    // SEARCH FILTER
    // -------------------------------------------------

    if (search.trim()) {

      const query =
        search
          .trim()
          .toLowerCase();


      result = result.filter(
        (product) => {

          const productName =
            product.name.toLowerCase();

          const productCategory =
            product.category.toLowerCase();

          return (
            productName.includes(query) ||
            productCategory.includes(query)
          );

        }
      );

    }


    // -------------------------------------------------
    // SORT
    // -------------------------------------------------

    if (sort === "low") {

      result.sort(
        (a, b) =>
          a.price - b.price
      );

    }


    if (sort === "high") {

      result.sort(
        (a, b) =>
          b.price - a.price
      );

    }


    return result;

  }, [
    category,
    search,
    sort,
  ]);


  // =====================================================
  // CATEGORY
  // =====================================================

  const handleCategory = (
    selectedCategory: string
  ) => {

    setCategory(
      selectedCategory
    );

    // Keep current search while changing category

    if (
      selectedCategory === "All"
    ) {

      if (search.trim()) {

        setSearchParams({
          search: search.trim(),
        });

      } else {

        setSearchParams({});

      }

    } else {

      const params: {
        category: string;
        search?: string;
      } = {
        category:
          selectedCategory,
      };


      if (search.trim()) {

        params.search =
          search.trim();

      }


      setSearchParams(params);

    }

  };


  // =====================================================
  // LIVE SEARCH
  // =====================================================

  const handleSearch = (
    value: string
  ) => {

    setSearch(value);


    const trimmed =
      value.trim();


    const params =
      new URLSearchParams();


    // Keep category

    if (
      category !== "All"
    ) {

      params.set(
        "category",
        category
      );

    }


    // Add search

    if (trimmed) {

      params.set(
        "search",
        trimmed
      );

    }


    setSearchParams(params);

  };


  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const clearSearch = () => {

    setSearch("");


    const params =
      new URLSearchParams();


    if (
      category !== "All"
    ) {

      params.set(
        "category",
        category
      );

    }


    setSearchParams(params);

  };


  return (

    <main
      className="
        min-h-screen
        bg-[#f8f6f1]
        px-6
        pb-20
        pt-32
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >


        {/* ================================================= */}
        {/* BACK HOME */}
        {/* ================================================= */}

        <BackToHome />


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            border-b
            border-black/10
            pb-8
          "
        >

          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-black/40
            "
          >
            URBAN COLLECTION
          </p>


          <div
            className="
              mt-3
              flex
              items-end
              justify-between
              gap-6
            "
          >

            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  md:text-5xl
                "
              >
                Shop
              </h1>


              {/* SEARCH RESULT */}

              {search.trim() && (

                <p
                  className="
                    mt-3
                    text-sm
                    text-black/45
                  "
                >
                  Search results for{" "}
                  <span
                    className="
                      font-semibold
                      text-black
                    "
                  >
                    "{search}"
                  </span>
                </p>

              )}

            </div>


            <p
              className="
                text-sm
                text-black/40
              "
            >
              {filteredProducts.length} Products
            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* CONTROLS */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-black/10
            py-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >


          {/* ================================================= */}
          {/* CATEGORIES */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {categories.map(
              (item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleCategory(item)
                  }
                  className={`
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    transition
                    ${
                      category === item
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }
                  `}
                >
                  {item}
                </button>

              )
            )}

          </div>


          {/* ================================================= */}
          {/* SEARCH + SORT */}
          {/* ================================================= */}

          <div
            className="
              flex
              gap-3
            "
          >


            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div
              className="
                relative
              "
            >

              <Search
                size={17}
                strokeWidth={1.5}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-black/40
                "
              />


              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                  handleSearch(
                    event.target.value
                  )
                }
                className="
                  h-10
                  w-48
                  border
                  border-black/10
                  bg-white
                  pl-9
                  pr-9
                  text-sm
                  outline-none
                  transition
                  focus:border-black
                  md:w-56
                "
              />


              {/* CLEAR */}

              {search && (

                <button
                  type="button"
                  onClick={clearSearch}
                  className="
                    absolute
                    right-2
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-black/35
                    transition
                    hover:text-black
                  "
                  title="Clear search"
                >

                  <X
                    size={15}
                    strokeWidth={1.5}
                  />

                </button>

              )}

            </div>


            {/* ================================================= */}
            {/* SORT */}
            {/* ================================================= */}

            <div
              className="
                relative
              "
            >

              <SlidersHorizontal
                size={16}
                strokeWidth={1.5}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                "
              />


              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value
                  )
                }
                className="
                  h-10
                  appearance-none
                  border
                  border-black/10
                  bg-white
                  pl-9
                  pr-8
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  outline-none
                "
              >

                <option value="default">
                  Sort
                </option>

                <option value="low">
                  Price: Low
                </option>

                <option value="high">
                  Price: High
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        {filteredProducts.length > 0 ? (

          <div
            className="
              grid
              gap-x-6
              gap-y-12
              py-10
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          /* ================================================= */
          /* NO RESULTS */
          /* ================================================= */

          <div
            className="
              flex
              min-h-[400px]
              items-center
              justify-center
            "
          >

            <div
              className="
                max-w-md
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  border
                  border-black/10
                  bg-white
                "
              >

                <Search
                  size={22}
                  strokeWidth={1.5}
                  className="text-black/40"
                />

              </div>


              <h2
                className="
                  mt-6
                  text-2xl
                  font-black
                "
              >
                No products found
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-black/40
                "
              >
                We couldn't find anything matching
                {search
                  ? ` "${search}"`
                  : " your search"}
                .
              </p>


              {(search || category !== "All") && (

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSearchParams({});
                  }}
                  className="
                    mt-6
                    bg-black
                    px-6
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    transition
                    duration-300
                    hover:bg-[#8B6F47]
                  "
                >
                  View All Products
                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </main>
  );
}