import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import usePageTitle from "@/hooks/usePageTitle";
import joyLogo from "@/assets/imgs/Joy Snacky logo.png";
import img01 from "@/assets/imgs/img-01.jpeg";
import img02 from "@/assets/imgs/img-02.jpeg";
import img03 from "@/assets/imgs/img-03.jpeg";

const STATS = [
  { value: "5000+", label: "Happy Customers" },
  { value: "50+", label: "Snack Varieties" },
  { value: "3+", label: "Years on Campus" },
  { value: "100%", label: "Fresh Ingredients" },
];

const VALUES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quality First",
    desc: "We never compromise on taste or ingredients. If it's not delicious, it's not Joy Snacky.",
    accent: "secondary",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Campus Speed",
    desc: "We know you're busy. Our service is optimized for the fast-paced campus life.",
    accent: "primary",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Community",
    desc: "We're more than a vendor — we're part of campus life, supporting local talent and events.",
    accent: "accent",
  },
];

const About = () => {
  usePageTitle({ title: "About Us" });

  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative bg-[#1A0A05] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={img01} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A05]/60 via-[#1A0A05]/80 to-[#1A0A05]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 text-center">
          <BlurFade delay={0.1}>
            <p className="text-secondary font-Montserrat text-sm font-semibold uppercase tracking-[0.25em] mb-4">
              Our Story
            </p>
            <h1 className="text-5xl md:text-7xl font-bold font-playfair leading-tight mb-6">
              Crafted with Joy,
              <br />
              <span className="text-secondary italic">Served with Love</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-300 font-Montserrat text-lg leading-relaxed">
              From a small campus initiative to a beloved snack destination — fueling
              students, one delicious bite at a time.
            </p>
          </BlurFade>
        </div>

        {/* Decorative glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-secondary/20 blur-[80px]" />
      </section>

      {/* ── Stats bar ── */}
      <BlurFade delay={0.15}>
        <section className="bg-secondary text-white font-Montserrat">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {STATS.map(({ value, label }) => (
              <div key={label} className="py-8 px-6 text-center">
                <p className="text-3xl md:text-4xl font-bold font-playfair">{value}</p>
                <p className="text-sm uppercase tracking-wider mt-1 text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      {/* ── Story section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Images collage */}
          <BlurFade delay={0.2}>
            <div className="relative h-[520px]">
              <img
                src={img02}
                alt="Our snacks"
                className="absolute top-0 left-0 w-[65%] h-[70%] object-cover rounded-2xl shadow-2xl"
              />
              <img
                src={img03}
                alt="Campus life"
                className="absolute bottom-0 right-0 w-[58%] h-[65%] object-cover rounded-2xl shadow-2xl border-4 border-background"
              />
              {/* Logo badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center p-2 border-2 border-secondary/30">
                <img src={joyLogo} alt="Joy Snacky" className="w-full h-full object-contain" />
              </div>
            </div>
          </BlurFade>

          {/* Text */}
          <BlurFade delay={0.3}>
            <div className="space-y-6 font-Montserrat">
              <p className="text-secondary text-sm font-semibold uppercase tracking-[0.2em]">
                Who We Are
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-primary leading-tight">
                About <span className="text-secondary italic">Joy Snacky</span>
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full" />
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Joy Snacky, we believe that every snack should bring a moment of
                pure joy. What started as a small campus initiative has grown into a
                beloved destination for students and snack enthusiasts alike.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is simple: to provide high-quality, delicious, and
                affordable snacks that power your study sessions and brighten your
                day. From our signature caramel popcorn to our spicy plantain chips,
                every item is crafted with care and the finest ingredients.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zm1 9H9V7h2v4zm0-6H9V3h2v2z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Started in a dorm room, now serving the entire campus community."
                  <span className="block font-semibold text-primary not-italic mt-1">— Founder, Joy Snacky</span>
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-[#1A0A05] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <p className="text-secondary font-Montserrat text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                What Drives Us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white">
                Our Core Values
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto mt-5 rounded-full" />
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon, title, desc, accent }, i) => (
              <BlurFade key={title} delay={0.2 + i * 0.1}>
                <div className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default overflow-hidden">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-${accent} rounded-t-2xl`} />
                  <div className={`w-14 h-14 rounded-xl bg-${accent}/15 flex items-center justify-center mb-6 text-${accent} group-hover:bg-${accent} group-hover:text-white transition-colors duration-300`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold font-playfair text-white mb-3">{title}</h3>
                  <p className="text-gray-400 font-Montserrat text-sm leading-relaxed">{desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <BlurFade delay={0.1}>
        <section className="bg-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 text-center font-Montserrat text-white">
            <h3 className="text-3xl md:text-4xl font-bold font-playfair mb-3">
              Ready to taste the joy?
            </h3>
            <p className="text-white/80 mb-8">
              Explore our full menu and order your favourites right from campus.
            </p>
            <a
              href="/products"
              className="inline-block bg-white text-secondary font-semibold px-8 py-3 rounded-full hover:bg-[#1A0A05] hover:text-white transition-colors duration-300 shadow-lg"
            >
              View Our Menu
            </a>
          </div>
        </section>
      </BlurFade>

    </div>
  );
};

export default About;
