import { heroImages, images, objects } from "@/assets/assets";
import React from "react";
import Button from "../ui/custom/Button";
import { BlurFade } from "../ui/blur-fade";
import { ArrowRight } from "lucide-react";
import CusCarousel from "../ui/custom/Carousel";
import { CarouselItem } from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { object } from "yup";

const Hero = () => {
  return (
    <section className=" h-[80vh] overflow-hidden">
      {/* <HeroSection1 /> */}
      <CusCarousel autoplay={true} interval={7000} showNavigation={false}>
        <CarouselItem>
          <HeroSection1 />
        </CarouselItem>
        <CarouselItem>
          <HeroSection2 />
        </CarouselItem>
      </CusCarousel>
    </section>
  );
};

export default Hero;

const HeroSection1 = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`relative h-full w-full flex flex-col items-center justify-center bg-radial to-orange-950 from-orange-600 px-4 overflow-hidden
                     md:flex-row md:justify-center md:items-center md:gap-7 md:px-7 md:py-4`}
    >
      <img
        src={objects.onion}
        className="absolute object-contain bottom-5 right-0 opacity-50"
      />
      <img
        src={objects.tomatoe}
        className="absolute size-56 object-contain top-1 -left-32 "
      />

      <BlurFade direction="top" duration={0.5} inView>
        <div className={``}>
          <p className="font-Montserrat font-light leading-none text-gray-50">
            Get Your
          </p>
          <h3 className="text-[140px] stroke-3 stroke-black leading-none font-Delirium text-accent font-light">
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
      <div
        className={`rounded-full overflow-hidden border-5 border-accent shadow-2xl mb-6`}
      >
        <BlurFade direction="bottom" duration={0.6} delay={0.3}>
          <img
            src={images.meatPie}
            className="size-70 md:h-90 lg:h-full lg:w-105 object-contain "
          />
        </BlurFade>
      </div>
      <Button
        iconType="icon-right"
        className={
          "flex md:hidden !py-5 !px-10 font-medium !text-xl text-white bg-orange-400 border-orange-500"
        }
        variant="primary"
        Icon={ArrowRight}
      >
        Buy Now
      </Button>
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
          <h3 className=" font-Delirium font-light text-8xl md:text-[120px] text-white leading-13 text-center md:text-left">
            Gingerpine <br />{" "}
          </h3>

          <h4 className="font-Montserrat text-4xl font-bold leading-none text-green-800">
            Juice
          </h4>
          <p className="text-center text-white hidden md:block leading-4 md:text-left">
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

        <p className="text-center text-sm text-white leading-4 md:hidden">
          Discover exclusive deals and offers from campus vendors.
        </p>
      </BlurFade>
    </div>
  );
};
