import { CarouselItem } from "@/components/ui/carousel";
import Button from "@/components/ui/custom/Button";
import CusCarousel from "@/components/ui/custom/Carousel";
import Title from "@/components/ui/custom/Title";
import ProductCard from "@/components/ui/ProductCard";
import { getRatingStars } from "@/lib/minComp";
import { formatPrice } from "@/lib/utils";
import {
  BookMarked,
  ShoppingBasket,
  Clock,
  Weight,
  Info,
  AlertTriangle,
  ShieldCheck,
  Thermometer,
  Plus,
  Minus,
  Star,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaWhatsapp } from "react-icons/fa";
import usePageTitle from "@/hooks/usePageTitle";
import useCartStore from "@/store/cartstore";
import useProductStore from "@/store/useProductStore";
import { useAuthStore } from "@/store/authStore";
import CusSelect from "@/components/ui/custom/Select";
import { toast } from "react-toastify";
import { BlurFade } from "@/components/ui/blur-fade";
import { objects } from "@/assets/assets";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItems, updateQuantity, cartItems } = useCartStore();
  const { products } = useProductStore();
  const isLogin = useAuthStore((state) => state.isLogin);
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const details = products.find((p) => p.id === id);
  const cartItem = details ? cartItems.find((i) => i.id === details.id) : null;

  usePageTitle({ title: details?.title });

  const handleAddItem = (item) => {
    if (!isLogin) {
      navigate("/auth/signup");
      return;
    }
    try {
      addItems(item, quantity);
      toast.success(
        `${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`,
      );
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  const handleCartQuantityChange = (newQty) => {
    if (newQty < 1) {
      updateQuantity(details.id, 0);
    } else {
      updateQuantity(details.id, newQty);
    }
  };

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center font-Montserrat">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 mb-4">
            Product not found
          </p>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const ratingStats = [5, 4, 3, 2, 1].map((label) => ({
    label,
    reviews: details.reviews?.filter((r) => r.rating === label).length || 0,
  }));

  const ratePercentage = (reviews) => {
    const total = details.reviews?.length || 0;
    return total === 0 ? 0 : (reviews / total) * 100;
  };

  const relatedProducts = products.filter(
    (p) => p.id !== details.id && p.category === details.category,
  );

  return (
    <div className="min-h-screen relative bg-[#FAFAFA] font-Montserrat pb-20">
      <img
        src={objects.onion}
        className="hidden lg:block fixed object-contain bottom-5 right-0 opacity-50"
      />
      <img
        src={objects.tomatoe}
        className="hidden lg:block fixed size-56 object-contain top-1 -left-32 opacity-50"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Breadcrumbs - Optional but good for UX */}
        <nav className="flex mb-8 text-sm text-muted-foreground">
          <span
            className="hover:text-primary cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span
            className="hover:text-primary cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Products
          </span>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{details.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Gallery (lg:6) */}
          <div className="lg:col-span-7 space-y-6">
            <BlurFade delay={0.1}>
              <div className="relative group rounded-3xl overflow-hidden bg-white shadow-xl border border-border/50 aspect-square md:aspect-auto md:h-[600px]">
                <img
                  src={details.images?.[selected]}
                  alt={details.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {details.state && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-primary shadow-lg backdrop-blur-md uppercase tracking-widest">
                      {details.state}
                    </span>
                  )}
                  {details.availability && (
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-green-500 shadow-lg backdrop-blur-md uppercase tracking-widest">
                      In Stock
                    </span>
                  )}
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                        Category
                      </p>
                      <p className="font-semibold">{details.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                        SKU
                      </p>
                      <p className="font-semibold">{details.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Thumbnails */}
            {details.images?.length > 1 && (
              <BlurFade delay={0.2}>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {details.images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setSelected(i)}
                      className={`relative min-w-[100px] h-[100px] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        i === selected
                          ? "border-primary ring-4 ring-primary/10"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`thumb-${i}`}
                        className="w-full h-full object-cover"
                      />
                      {i !== selected && (
                        <div className="absolute inset-0 bg-black/5" />
                      )}
                    </button>
                  ))}
                </div>
              </BlurFade>
            )}
          </div>

          {/* Right Column - Info (lg:5) */}
          <div className="lg:col-span-5 space-y-8">
            <BlurFade delay={0.2}>
              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-primary font-Montserrat leading-tight">
                  {details.title}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-secondary">
                    {getRatingStars(details.rating)}
                    <span className="ml-2 text-sm font-bold text-gray-700">
                      ({details.rating})
                    </span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-sm text-muted-foreground font-medium">
                    {details.reviews?.length || 0} Customer Reviews
                  </span>
                </div>

                <div className="text-xl font-bold text-primary/90 mt-4">
                  {formatPrice(details.price)}
                </div>

                <p className="text-gray-600 leading-relaxed text-sm border-l-4 border-secondary/30 pl-4 py-2 bg-secondary/5 rounded-r-lg">
                  {details.description}
                </p>
              </div>
            </BlurFade>

            {/* Food Specs Grid */}
            <BlurFade delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {details.weight && (
                  <div className="flex items-center gap-3 p-4 ">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Weight size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        Weight
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {details.weight}
                      </p>
                    </div>
                  </div>
                )}
                {details.shelfLife && (
                  <div className="flex items-center gap-3 p-4 ">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        Shelf Life
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {details.shelfLife}
                      </p>
                    </div>
                  </div>
                )}
                {details.storage && (
                  <div className="flex items-center gap-3 p-4  sm:col-span-2">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Thermometer size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        Storage
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {details.storage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </BlurFade>

            {/* Ingredients & Nutrition Tabs-style Layout */}
            <BlurFade delay={0.4}>
              <div className="space-y-4">
                {details.ingredients && (
                  <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Info size={18} />
                      <h4 className="font-bold uppercase text-xs tracking-widest">
                        Ingredients
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      {details.ingredients}
                    </p>
                  </div>
                )}

                <div className=" gap-4">
                  {details.nutritionInfo && (
                    <div className="p-6 rounded-2xl bg-primary text-white shadow-xl">
                      <div className="flex items-center gap-2 mb-3 opacity-90">
                        <ShieldCheck size={18} />
                        <h4 className="font-bold uppercase text-[10px] tracking-widest">
                          Nutrition
                        </h4>
                      </div>
                      <p className="text-sm font-medium">
                        {details.nutritionInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>

            {/* Call to Action Section */}
            <BlurFade delay={0.5}>
              <div className="sticky bottom-6 lg:relative lg:bottom-0 p-2 rounded-xl  border-border/60 flex flex-col sm:flex-row items-center gap-6 z-20">
                {details.availability && (
                  <div className={cartItem ? "" : "hidden"}>
                    <div className="flex items-center bg-gray-200 rounded-2xl p-1 w-full sm:w-auto">
                      <button
                        onClick={() =>
                          cartItem
                            ? handleCartQuantityChange(cartItem.quantity - 1)
                            : setQuantity(Math.max(1, quantity - 1))
                        }
                        className="p-3 hover:bg-white rounded-xl transition-colors text-primary"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-primary">
                        {cartItem ? cartItem.quantity : quantity}
                      </span>
                      <button
                        onClick={() =>
                          cartItem
                            ? handleCartQuantityChange(cartItem.quantity + 1)
                            : setQuantity(quantity + 1)
                        }
                        className="p-3 hover:bg-white rounded-xl transition-colors text-primary"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex-1 w-full">
                  {details.type === "Service" ? (
                    <Button
                      className="w-full py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-primary/20"
                      Icon={BookMarked}
                      iconType="icon-right"
                      iconSize={20}
                    >
                      Book Now
                    </Button>
                  ) : cartItem ? null : (
                    <Button
                      className={`w-full py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-primary/20`}
                      Icon={FaShoppingCart}
                      onClick={() => handleAddItem(details)}
                      iconType="icon-right"
                      disabled={!details.availability}
                    >
                      {details.availability
                        ? `Add to cart`
                        : "Currently Unavailable"}
                    </Button>
                  )}
                </div>
              </div>
            </BlurFade>

            {/* Social Share / WhatsApp Inquire */}
            <div className="flex justify-center pt-2">
              <button className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                <FaWhatsapp size={20} />
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section Overhaul */}
        <div className="mt-32 space-y-16">
          <BlurFade delay={0.6}>
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-border border-b-8 border-b-secondary/50">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Product Rating
                  </h3>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-6xl font-black text-primary">
                      {details.rating}
                    </span>
                    <div>
                      <div className="flex text-secondary mb-1">
                        {getRatingStars(details.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">
                        Based on {details.reviews?.length || 0} reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {ratingStats.map(({ label, reviews }) => (
                      <div key={label} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-500 w-4">
                          {label}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${ratePercentage(reviews)}%` }}
                            className="h-full bg-secondary"
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-8">
                          {Math.round(ratePercentage(reviews))}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full py-4 rounded-2xl">
                  Write a Review
                </Button>
              </div>

              <div className="md:w-2/3 space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <Title title={"Customer Stories"} />
                  <CusSelect
                    selectValue="Most Recent"
                    options={[
                      { label: "Most Recent", value: "recent" },
                      { label: "Highest Rating", value: "high" },
                      { label: "Lowest Rating", value: "low" },
                    ]}
                    className="w-48"
                  />
                </div>

                {details.reviews?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {details.reviews.map(
                      ({ rating, comment, reviewerName }, index) => (
                        <div
                          key={index}
                          className="group bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:border-secondary/30"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                              <div className="size-12 flex items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <FaUser size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-primary">
                                  {reviewerName}
                                </p>
                                <div className="flex text-secondary text-sm mt-0.5">
                                  {getRatingStars(rating)}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground font-medium bg-gray-50 px-3 py-1 rounded-full">
                              Verified Buyer
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed pl-16">
                            "{comment}"
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-border">
                    <Star className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-medium">
                      Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <BlurFade delay={0.7}>
              <div className="flex items-center justify-between mb-12">
                <Title title={"You Might Also Love"} className="w-fit" />
                <button
                  onClick={() => navigate("/products")}
                  className="text-primary font-bold px-2 text-sm hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="px-4">
                <CusCarousel autoplay={true} loop={true} showNavigation={true}>
                  {relatedProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className={
                        "basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 py-6 px-3"
                      }
                    >
                      <ProductCard
                        product={product}
                        image={product.images?.[0]}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        reviewsCount={product.reviews?.length}
                      />
                    </CarouselItem>
                  ))}
                </CusCarousel>
              </div>
            </BlurFade>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
