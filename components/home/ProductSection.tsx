import Link from "next/link";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types/store";

type ProductSectionProps = {
  canToggleProducts: boolean;
  emptyMessage?: string;
  isSearchOpen: boolean;
  searchQuery: string;
  showAllProducts: boolean;
  showShopLink?: boolean;
  subtitle?: string;
  title?: string;
  visibleProducts: Product[];
  onAddToCart: (product: Product) => void;
  onToggleShowAllProducts: () => void;
};

export function ProductSection({
  canToggleProducts,
  emptyMessage = "No clothes found. Try another search.",
  isSearchOpen,
  searchQuery,
  showAllProducts,
  showShopLink = true,
  subtitle = "Shop for items based on what we featured this week",
  title = "Featured Items",
  visibleProducts,
  onAddToCart,
  onToggleShowAllProducts,
}: ProductSectionProps) {
  return (
    <section className="products container">
      <div className="products__header">
        <h2 className="products__title">{title}</h2>
        <p className="products__subtitle">{subtitle}</p>
        {isSearchOpen && searchQuery.trim() ? (
          <p className="products__search-note">
            Search results for: <span>{searchQuery.trim()}</span>
          </p>
        ) : null}
      </div>

      <div className="products__list">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="products__empty">{emptyMessage}</p>
      ) : null}

      {canToggleProducts || showShopLink ? (
        <div className="products__actions">
          {canToggleProducts ? (
            <button
              type="button"
              className="products__btn"
              onClick={onToggleShowAllProducts}
            >
              {showAllProducts ? "Load Less" : "Browse All Products"}
            </button>
          ) : null}

          {showShopLink ? (
            <Link href="/shop" className="products__btn products__btn--secondary">
              Open Full Shop
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
