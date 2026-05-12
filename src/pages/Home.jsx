import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import CusCarousel from "@/components/ui/custom/Carousel";
import Button from "@/components/ui/custom/Button";
import { BlurFade } from "@/components/ui/blur-fade";
import { FaShoppingCart } from "react-icons/fa";
import { icons, images } from "@/assets/assets";
import Title from "@/components/ui/custom/Title";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/ui/ProductCard";
import usePageTitle from "@/hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useProductStore from "@/store/useProductStore";
import CusSelect from "@/components/ui/custom/Select";
import { Cookie } from "lucide-react";

const Home = () => {
  usePageTitle({ title: "Home" });
  const navigate = useNavigate();
  const { products } = useProductStore();

  const featuredProducts = products.slice(0, 6);
  const moreProducts = products.slice(2);

  const categories = [
    ...new Map(
      products.map((p) => [
        p.category,
        { name: p.category, image: p.images?.[0] },
      ]),
    ).values(),
  ];

  return (
    <div>
      <div>
        <Hero />
      </div>

      <BlurFade>
        <section className="my-12 px-4 md:px-8 lg:px-16">
          <div className="mb-4">
            <Title title={"Categories"} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-10">
            {categories.slice(0, 8).map((category) => (
              <div
                key={category.name}
                className="group flex flex-col items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/products?category=${category.name}`)}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-primary/20 to-secondary/20 group-hover:from-primary group-hover:to-secondary transition-all duration-500 shadow-lg group-hover:shadow-secondary/20 group-hover:-translate-y-2">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-primary/60 group-hover:text-primary uppercase tracking-widest transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      <section className="py-3">
        <div className="flex items-center gap-1 bg-gradient-to-br from-primary to-orange-800 border-r-15 border-secondary w-full pl-7 lg:pl-19 py-2">
          <Cookie className="w-6 h-6 text-orange-300" />
          <h2 className="text-lg md:text-xl font-Montserrat font-semibold text-slate-100">
            Top Products
          </h2>
        </div>
        <div className="max-w-7xl px-4 lg:px-16 md:px-8">
          <CusCarousel autoplay={false} loop={false} showNavigation={false}>
            {featuredProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className={"basis-1/2 md:basis-1/4 lg:basis-1/5 py-6"}
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
      </section>

      <section className="relative h-60 md:h-120 w-full bg-transparent mb-7">
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-28 bg-gradient-to-r from-background/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-28 bg-gradient-to-l from-background/90 to-transparent z-10 pointer-events-none" />

        <CusCarousel data={featuredProducts}>
          {featuredProducts.map((item) => (
            <CarouselItem key={item.id} className={"md:basis-[70%]"}>
              <div className="px-4 md:px-0">
                <div className="h-60 md:h-120 w-full relative flex-shrink-0 rounded-2xl overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="h-1/2 w-full bg-gradient-to-t from-gray-800 to-gray-200/0 absolute bottom-0" />
                  <div className="absolute bottom-4 left-2 md:left-4 px-3 py-1 rounded">
                    <h3 className="text-gray-100 font-semibold font-Montserrat text-xl line-clamp-1 sm:text-2xl md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <Button
                      variant={"secondary"}
                      className="mt-3 w-fit px-1"
                      onClick={() => navigate(`/products/${item.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CusCarousel>
      </section>

      <BlurFade inView blur="0">
        <section className="py-3 mb-4">
          <div className="flex items-center gap-1 bg-gradient-to-br from-primary to-orange-800 border-r-15 border-secondary w-full pl-7 lg:pl-19 py-2">
            <Cookie className="w-6 h-6 text-orange-300" />
            <h2 className="text-lg md:text-xl font-Montserrat font-semibold text-slate-100">
              You May Also Like
            </h2>
          </div>
          <div className=" max-w-7xl px-4 lg:px-16 md:px-8">
            <CusCarousel autoplay={false} loop={false} showNavigation={false}>
              {moreProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className={"basis-1/2 md:basis-1/4 lg:basis-1/5 py-6"}
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
        </section>
      </BlurFade>

      <BlurFade inView blur="0">
        <section className="py-24 bg-orange-50 px-4 md:px-8 lg:px-16 overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Visuals with Floating Cards */}
            <div className="relative order-2 lg:order-1">
              {/* Background Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary rounded-[3rem] -rotate-6" />

              {/* Main Image */}
              <div className="relative z-10 flex justify-center">
                <img
                  src={images.img3}
                  alt="Students enjoying snacks"
                  className="w-[90%] h-auto object-cover rounded-2xl"
                />
              </div>

              {/* Floating Card 1 - Top Left */}
              <div className="absolute top-10 left-0 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <img src={icons.titleCart} className="w-8 h-8" alt="Food" />
                </div>
                <div>
                  <p className="text-xl font-black text-primary leading-none">
                    500+
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Destinations
                  </p>
                </div>
              </div>

              {/* Floating Card 2 - Bottom Right */}
              <div className="absolute bottom-10 right-0 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-float">
                <div className="p-3 bg-red-50 rounded-xl text-red-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-black text-primary leading-none">
                    6000+
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <p className="text-secondary font-bold uppercase tracking-widest text-xs">
                  Our Experience
                </p>
                <h2 className="text-4xl md:text-5xl font-bold font-Montserrat text-primary leading">
                  Fresh Picks,{" "}
                  <span className="text-secondary">Delivered to You..</span>
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words.
                </p>
              </div>

              <div className="">
                <Button
                  variant="primary"
                  className="rounded-full !py-4 !px-6 !text- font-bold shadow-2xl shadow-primary/20"
                  onClick={() => navigate("/about")}
                >
                  Learn Our Story
                </Button>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        `}</style>
      </BlurFade>

      <BlurFade inView blur="0">
        <section className="px-4 md:px-8 lg:px-16 mt-5 mb-8">
          <div className="mb-4">
            <Title title={"All Products"} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                image={product.images?.[0]}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
                reviewsCount={product.reviews?.length}
              />
            ))}
          </div>
        </section>
      </BlurFade>
    </div>
  );
};

export default Home;
