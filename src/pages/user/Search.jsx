import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import useProductStore from "@/store/useProductStore";

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const navigate = useNavigate();
  const InputRef = useRef();
  const { products } = useProductStore();

  const categories = [
    { value: "all", label: "All" },
    ...[...new Set(products.map((p) => p.category))].map((c) => ({
      label: c,
      value: c,
    })),
  ];

  const results = products
    .filter((product) => {
      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price_low_high") return a.price - b.price;
      if (sortBy === "price_high_low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  useEffect(() => {
    InputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-60 bg-gray-50 w-full min-h-screen p-6">
      <div className="flex items-center gap-2">
        <button
          className="rounded-md text-gray-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            ref={InputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query.length > 0 && (
            <button
              className="absolute right-12 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <FaSearch className="absolute right-4 top-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        <CusSelect
          selectValue={"Category"}
          optionsLabel={"Categories"}
          options={categories}
          value={selectedCategory}
          onChange={(opt) => setSelectedCategory(opt.value)}
        />
        <CusSelect
          selectValue={"Sort By"}
          optionsLabel={"Sort Options"}
          options={[
            { value: "relevance", label: "Relevance" },
            { value: "price_low_high", label: "Price: Low to High" },
            { value: "price_high_low", label: "Price: High to Low" },
            { value: "rating", label: "Top Rated" },
          ]}
          value={sortBy}
          onChange={(opt) => setSortBy(opt.value)}
        />
      </div>

      <div className="mt-6">
        {query.length === 0 && selectedCategory === "all" ? (
          <p className="text-gray-400 text-sm">Start typing to search products.</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500 text-sm">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                title={item.title}
                price={item.price}
                image={item.images?.[0]}
                rating={item.rating}
                reviewsCount={item.reviews?.length}
                description={item.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
