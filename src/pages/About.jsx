import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import usePageTitle from "@/hooks/usePageTitle";
import joyLogo from "@/assets/imgs/Joy Snacky logo.png";

const About = () => {
  usePageTitle({ title: "About Us" });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <BlurFade delay={0.1}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img
                  src={joyLogo}
                  alt="Joy Snacky Logo"
                  className="relative w-full max-w-md mx-auto "
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-Montserrat text-primary">
                About <span className="text-secondary">Joy Snacky</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Joy Snacky, we believe that every snack should bring a moment
                of pure joy. What started as a small campus initiative has grown
                into a beloved destination for students and snack enthusiasts
                alike.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is simple: to provide high-quality, delicious, and
                affordable snacks that power your study sessions and brighten
                your day. From our signature caramel popcorn to our spicy
                plantain chips, every item is crafted with care and the finest
                ingredients.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                  <h3 className="text-2xl font-bold text-primary">5000+</h3>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Happy Customers
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h3 className="text-2xl font-bold text-primary">50+</h3>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Snack Varieties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        <div className="mt-24">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-Montserrat text-primary">
                Our Core Values
              </h2>
              <div className="h-1.5 w-24 bg-secondary mx-auto mt-4 rounded-full"></div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlurFade delay={0.3}>
              <div className="group p-8 rounded-2xl bg-white border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Quality First
                </h3>
                <p className="text-muted-foreground">
                  We never compromise on taste or ingredients. If it's not
                  delicious, it's not Joy Snacky.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="group p-8 rounded-2xl bg-white border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Campus Speed
                </h3>
                <p className="text-muted-foreground">
                  We know you're busy. Our delivery and service are optimized
                  for the fast-paced campus life.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="group p-8 rounded-2xl bg-white border border-border hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Community
                </h3>
                <p className="text-muted-foreground">
                  We're more than just a vendor; we're part of the campus
                  community, supporting local talent and events.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
