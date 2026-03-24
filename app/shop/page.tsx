import { products } from "@/data/store-content";
import { StorefrontPage } from "@/components/home";

export default function ShopPage() {
  return (
    <StorefrontPage
      emptyMessage="No products match your search yet."
      initialVisibleProducts={products.length}
      productSubtitle="Browse the full catalog and add any item to your cart."
      productTitle="Shop All Products"
      showCategories={false}
      showHero={false}
      showHighlights={false}
      showShopLink={false}
    />
  );
}
