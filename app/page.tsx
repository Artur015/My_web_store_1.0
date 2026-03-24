import { INITIAL_VISIBLE_PRODUCTS } from "@/data/store-content";
import { StorefrontPage } from "@/components/home";

export default function Home() {
  return <StorefrontPage initialVisibleProducts={INITIAL_VISIBLE_PRODUCTS} />;
}
