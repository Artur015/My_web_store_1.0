import productCatalog from "@/data/products.json";
import type {
  CategoryCard,
  FeatureItem,
  MenuSection,
  Product,
  SocialLink,
} from "@/types/store";

export const products = productCatalog as Product[];

export const categoryCards = [
  { modifier: "women", label: "30% OFF", title: "FOR WOMEN" },
  { modifier: "men", label: "HOT DEAL", title: "FOR MEN" },
  { modifier: "kids", label: "NEW ARRIVALS", title: "FOR KIDS" },
  {
    modifier: "accessories",
    label: "LUXURIOUS & TRENDY",
    title: "ACCESSORIES",
  },
] satisfies readonly CategoryCard[];

export const menuSections = [
  {
    title: "MAN",
    items: ["Accessories", "Bags", "Denim", "T-Shirts"],
  },
  {
    title: "WOMAN",
    items: ["Accessories", "Jackets & Coats", "Polos", "T-Shirts", "Shirts"],
  },
  {
    title: "KIDS",
    items: ["Accessories", "Jackets & Coats", "Polos", "T-Shirts", "Shirts", "Bags"],
  },
] satisfies readonly MenuSection[];

export const features = [
  {
    icon: "/Truck.svg",
    title: "Free Delivery",
    text: "Worldwide delivery on all orders.",
  },
  {
    icon: "/percent.svg",
    title: "Sales & Discounts",
    text: "Save money on promotions.",
  },
  {
    icon: "/crown.svg",
    title: "Quality Assurance",
    text: "Only the best materials.",
  },
] satisfies readonly FeatureItem[];

export const socials = [
  { icon: "/facebook.svg", label: "Facebook" },
  { icon: "/instagram.svg", label: "Instagram" },
  { icon: "/pinterest.svg", label: "Pinterest" },
  { icon: "/twitter.svg", label: "Twitter" },
] satisfies readonly SocialLink[];

export const CART_STORAGE_KEY = "cart";
export const REGISTERED_USERS_STORAGE_KEY = "registeredUsers";
export const INITIAL_VISIBLE_PRODUCTS = 6;
