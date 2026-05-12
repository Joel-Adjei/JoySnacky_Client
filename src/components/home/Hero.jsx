import { heroImages, images, objects } from "@/assets/assets";
import React from "react";
import Button from "../ui/custom/Button";
import { BlurFade } from "../ui/blur-fade";
import { ArrowRight } from "lucide-react";
import CusCarousel from "../ui/custom/Carousel";
import { CarouselItem } from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import chips from "@/assets/imgs/chips_02_ed.png";
import chipsbg from "@/assets/imgs/chips_bg.png";
import meatpie from "@/assets/imgs/meat_pie_02.png";
const Hero = () => {
  return (
    <section className=" h-[85vh] overflow-hidden">
      {/* <HeroSection1 /> */}
      <CusCarousel autoplay={true} interval={7000} showNavigation={false}>
        <CarouselItem>
          <HeroSection1 />
        </CarouselItem>
        <CarouselItem>
          <HeroSection2 />
        </CarouselItem>
        <CarouselItem>
          <HeroSection3 />
        </CarouselItem>
      </CusCarousel>
    </section>
  );
};

export default Hero;

const HeroSection3 = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-full w-full  bg-[#0a0a0a] px-6 overflow-hidden">
      {/* Decorative Objects */}
      <img
        src={objects.onion}
        className="absolute top-20 right-20 size-32 opacity-20 blur-sm rotate-12 pointer-events-none"
        alt=""
      />
      <img
        src={objects.tomatoe}
        className="absolute bottom-40 left-10 size-24 opacity-20 blur-[2px] -rotate-12 pointer-events-none"
        alt=""
      />
      <img
        src={objects.lettuce}
        className="absolute top-10 left-1/4 size-40 opacity-10 blur-md pointer-events-none"
        alt=""
      />

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-amber-900/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl h-full mx-auto flex flex-col items-center justify-center  md:flex-row md:px-20">
        {/* Text Content */}
        <div className="relative z-10 w-full md:w-[55%] flex flex-col items-center md:items-start space-y-8">
          <BlurFade direction="left" duration={0.6}>
            <div className="space-y-2">
              <span className="text-orange-500 font-Montserrat text-center font-bold tracking-[0.3em] text-xs md:text-sm uppercase block mb-2">
                Premium Quality
              </span>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold lg:text-7xl text-[#f5e6d3] leading-[1.1] text-center md:text-left drop-shadow-2xl">
                <span className="text-orange-500 italic">Ultimate</span> <br />
                Campus{" "}
                <span className="relative">
                  Delight
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-orange-500/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0, 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </h1>
            </div>
          </BlurFade>

          <BlurFade direction="left" duration={0.6} delay={0.2}>
            <p className="font-Montserrat text-gray-400 text-sm md:text-lg max-w-lg text-center md:text-left leading-relaxed font-light">
              Indulge in our signature{" "}
              <span className="text-white font-medium">Gourmet Meat Pie</span>.
              Handcrafted with premium ingredients and delivered fresh to your
              doorstep.
            </p>
          </BlurFade>

          <BlurFade direction="up" duration={0.6} delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={() => navigate("/products")}
                className="group relative px-10 py-5 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_25px_50px_rgba(249,115,22,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Order Now{" "}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </BlurFade>
        </div>

        {/* Image Content */}
        <div className="relative z-10 w-full md:w-[45%] flex justify-center items-center mt-12 md:mt-0">
          <BlurFade direction="right" duration={0.8} delay={0.3}>
            <div className="relative group">
              {/* Ambient Shadow */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-orange-900/20 blur-[60px] rounded-full" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/80 blur-xl rounded-full transition-transform duration-500 group-hover:scale-x-110" />

              {/* Main Product Image */}
              <img
                src={meatpie}
                alt="Gourmet Meat Pie"
                className="w-80 md:w-96 lg:w-[590px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-105 hover:-rotate-2 cursor-pointer"
              />

              {/* Badge */}
              <div className="absolute -top-4 lg:top-4 right-9 lg:right-16 size-24 bg-orange-600 rounded-full flex flex-col items-center justify-center text-white border-5 border-[#0a0a0a] rotate-12 shadow-xl">
                <span className="text-[10px] font-bold uppercase leading-none">
                  Freshly
                </span>
                <span className="text-xl font-black leading-none italic">
                  BAKED
                </span>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

const HeroSection1 = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`relative h-full w-full bg-radial  to-orange-950 from-orange-600  overflow-hidden
                    `}
    >
      <div className="h-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4  md:flex-row md:justify-center md:items-center md:gap-7 md:px-7 md:py-4">
        {/* <img
          src={objects.onion}
          className="absolute object-contain bottom-5 right-0 opacity-50"
        />
        <img
          src={objects.tomatoe}
          className="absolute size-56 object-contain top-1 -left-32 "
        /> */}

        <img
          src={chipsbg}
          className="absolute hidden lg:block object-cover  lg:w-full opacity-60  "
        />

        <BlurFade direction="top" duration={0.5} inView>
          <div className={``}>
            <p className="font-Montserrat font-light leading-none lg:text-2xl text-gray-50">
              Get Your
            </p>
            <h3 className="text-[140px] lg:text-[180px] stroke-3 stroke-black leading-none font-Delirium text-yellow-400 font-light">
              Snacks
            </h3>
            <Button
              iconType="icon-right"
              onClick={() => navigate("/products/1")}
              className={"hidden md:flex text-white "}
              variant="primary"
              Icon={ArrowRight}
            >
              Buy Now
            </Button>
          </div>
        </BlurFade>
        <div className={` mb-6`}>
          <BlurFade direction="bottom" duration={0.6} delay={0.3}>
            <img src={chips} className=" object-contain size-72 lg:size-130 " />
          </BlurFade>
        </div>
        <Button
          iconType="icon-right"
          className={
            "flex md:hidden !py-5 !px-10 font-medium !text-xl text-primary bg-yellow-400 border-yellow-500"
          }
          variant="accent"
          Icon={ArrowRight}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

const HeroSection2 = () => {
  return (
    <div
      className={`relative h-[80vh] w-full flex flex-col items-center justify-center bg-radial from from-yellow-300 to-yellow-700 px-4 overflow-hidden
                     md:flex-row-reverse md:justify-center md:items-center md:gap-7 md:px-7 md:py-4`}
    >
      <BlurFade direction="right" duration={0.5} inView className={""}>
        <div className=" flex flex-col items-center gap-2 px-6 md:items-start md:justify-center ">
          <h3 className=" font-playfair font-bold text-6xl md:text-8xl italic text-white text-center md:text-left">
            Gingerpine <br />{" "}
          </h3>

          <h4 className="font-Montserrat text-4xl font-bold leading-none text-green-800">
            Juice
          </h4>
          <p className="text-center text-white  leading-4 md:text-left">
            Discover exclusive deals and offers from campus vendors.
          </p>
          <Button
            variant="primary"
            Icon={ArrowRight}
            iconType="icon-right"
            className={"!from-green-800 !to-green-900"}
          >
            Start Shopping
          </Button>
        </div>
      </BlurFade>

      <BlurFade
        direction="left"
        duration={0.6}
        delay={0.3}
        inView
        className={" md:h-120"}
      >
        <div className=" p-5 md:h-120">
          <img
            src={heroImages.gingerpine_bottle}
            alt="Hero Image"
            className="object-contain h-80 md:h-96 mx-auto"
          />
        </div>
      </BlurFade>
    </div>
  );
};
