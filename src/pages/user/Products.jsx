import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import CusSelect from "@/components/ui/custom/Select";
import { X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import Input from "@/components/input/Input";
import usePageTitle from "@/hooks/usePageTitle";
import useProductStore from "@/store/useProductStore";

const Products = () => {
  usePageTitle({ title: "Products" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const InputRef = useRef();
  const { products } = useProductStore();

  const categories = [
    { label: "All Categories", value: "all" },
    ...[...new Set(products.map((p) => p.category))].map((c) => ({
      label: c,
      value: c,
    })),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      !query ||
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    InputRef.current?.focus();
  }, []);

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (selectedCategory !== "all") params.category = selectedCategory;
    setSearchParams(params);
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            ref={InputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for items..."
            className="w-full"
          />
          {query.length > 0 && (
            <button
              className="absolute right-13 top-3.5 rounded-md text-gray-500 cursor-pointer"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <FaSearch className="absolute right-4 top-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <CusSelect
          selectValue={"Select Category"}
          optionsLabel={"Categories"}
          options={categories}
          value={selectedCategory}
          onChange={(option) => setSelectedCategory(option.value)}
        />
      </div>

      <section>
        {filteredProducts.length === 0 ? (
          <div className="mt-12 text-center text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {filteredProducts.map((item) => (
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
      </section>
    </div>
  );
};

export default Products;
