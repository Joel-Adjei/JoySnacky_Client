import { create } from "zustand";
import { persist } from "zustand/middleware";
import { images } from "@/assets/assets";

const initialProducts = [
  {
    id: "PRD-JS001",
    title: "Spicy Plantain Chips",
    description: "Experience the perfect harmony of sweet and heat. Our plantain chips are hand-sliced from premium, sun-ripened plantains and kettle-fried to a signature crunch. Each batch is dusted with a bespoke blend of local chili peppers and a hint of sea salt for an addictive flavor profile that defines the Joy Snacky experience.",
    price: 8.5,
    category: "Snacks",
    rating: 4.8,
    availability: true,
    state: "New",
    type: "Product",
    images: [images.chips],
    weight: "150g",
    ingredients: "Sun-ripened plantains, vegetable oil, local chili powder, sea salt.",
    nutritionInfo: "Calories: 160 per serving, Fat: 9g, Sodium: 110mg",
    shelfLife: "3 weeks (sealed)",
    allergens: "None",
    storage: "Store in a cool, dry place. Reseal after opening to maintain crunch.",
    reviews: [
      { reviewerName: "Kojo M.", rating: 5, comment: "The best plantain chips on campus! Perfect spice level." },
      { reviewerName: "Ama R.", rating: 4, comment: "Crispy and fresh. Maybe a bit too spicy for some, but I love it!" }
    ],
  },
  {
    id: "PRD-JS002",
    title: "Chicken Spring Rolls",
    description: "A delicate, golden-crisp shell gives way to a succulent filling of tender shredded chicken breast, finely julienned vegetables, and a secret infusion of ginger and sesame. These spring rolls are prepared fresh daily, offering a light yet deeply satisfying gourmet snack that's perfect for a quick bite between lectures.",
    price: 15.0,
    category: "Appetizers",
    rating: 4.9,
    availability: true,
    state: "Freshly Made",
    type: "Product",
    images: [images.springRolls],
    weight: "4 pieces per pack",
    ingredients: "Chicken breast, wheat wrapper, cabbage, carrots, spring onions, ginger, sesame oil, soy sauce.",
    nutritionInfo: "Protein: 12g, Calories: 240 per serving",
    shelfLife: "2 days (refrigerated)",
    allergens: "Contains Wheat (Gluten), Soy, Sesame.",
    storage: "Best served warm. Reheat in an oven or air fryer for 3 minutes at 180°C for maximum crispness.",
    reviews: [
      { reviewerName: "Nana Y.", rating: 5, comment: "So crispy and the chicken is seasoned perfectly." }
    ],
  },
  {
    id: "PRD-JS003",
    title: "Vegetable Samosas",
    description: "Our triangular parcels of joy feature a thin, crispy pastry enveloping a vibrant heart of spiced garden peas, diced potatoes, and aromatic herbs. Each bite is a journey through authentic spices, carefully balanced to provide a savory punch without being overwhelming. A vegetarian favorite that never fails to impress.",
    price: 10.0,
    category: "Appetizers",
    rating: 4.7,
    availability: true,
    state: "Freshly Made",
    type: "Product",
    images: [images.samosas],
    weight: "3 large pieces",
    ingredients: "Wheat flour, potatoes, green peas, onions, cumin, turmeric, coriander, garam masala.",
    nutritionInfo: "Calories: 180 per piece, Vegan Friendly",
    shelfLife: "2 days (refrigerated)",
    allergens: "Contains Wheat (Gluten).",
    storage: "Keep refrigerated. For best results, air fry for 5 minutes at 160°C.",
    reviews: [
      { reviewerName: "Ekow B.", rating: 4, comment: "Excellent seasoning. Goes great with the dip." }
    ],
  },
  {
    id: "PRD-JS004",
    title: "Gourmet Meat Pies",
    description: "A true campus classic. Our Beef Meat Pies feature a meticulously crafted buttery, flaky pastry shell that melts in your mouth. Inside, you'll find a hearty and savory filling of premium seasoned minced beef, tender potatoes, and garden-fresh carrots, all simmered in a rich gravy.",
    price: 12.0,
    category: "Pastries",
    rating: 4.6,
    availability: true,
    state: "New",
    type: "Product",
    images: [images.meatPie],
    weight: "180g",
    ingredients: "Wheat flour, butter, minced beef, potatoes, carrots, onions, beef stock, spices.",
    nutritionInfo: "Protein: 8g, Calories: 320",
    shelfLife: "2 days (refrigerated)",
    allergens: "Contains Wheat (Gluten), Milk (Butter).",
    storage: "Best served warm. Refrigerate if not consumed within 4 hours.",
    reviews: [
      { reviewerName: "Abena K.", rating: 4, comment: "The pastry is so flaky!" }
    ],
  },
  {
    id: "PRD-JS005",
    title: "Caramel Popcorn",
    description: "Air-popped to perfection and coated in our secret, small-batch rich caramel sauce. A sweet and salty legend.",
    price: 15.0,
    category: "Snacks",
    rating: 4.9,
    availability: true,
    state: "New",
    type: "Product",
    images: [images.img1],
    weight: "250g",
    ingredients: "Corn kernels, brown sugar, butter, sea salt, vanilla extract.",
    nutritionInfo: "Calories: 120 per cup, Fat: 5g, Sugar: 12g",
    shelfLife: "3 weeks",
    allergens: "Contains Milk (Butter).",
    storage: "Store in a cool, dry place. Reseal tightly.",
    reviews: [
      { reviewerName: "Ama R.", rating: 5, comment: "Best popcorn on campus!" }
    ],
  }
];

const useProductStore = create(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductById: (id) => get().products.find((p) => p.id === id),
    }),
    { name: "vendor-products", version: 1 }
  )
);

export default useProductStore;
