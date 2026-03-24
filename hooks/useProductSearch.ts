import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/store";

type UseProductSearchOptions = {
  initialVisibleProducts: number;
  products: Product[];
};

export function useProductSearch({
  initialVisibleProducts,
  products,
}: UseProductSearchOptions) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!normalizedSearchQuery) {
          return true;
        }

        const searchableContent = `${product.title} ${product.description}`.toLowerCase();
        return searchableContent.includes(normalizedSearchQuery);
      }),
    [normalizedSearchQuery, products],
  );

  const visibleProducts = useMemo(
    () =>
      showAllProducts
        ? filteredProducts
        : filteredProducts.slice(0, initialVisibleProducts),
    [filteredProducts, initialVisibleProducts, showAllProducts],
  );

  const canToggleProducts = filteredProducts.length > initialVisibleProducts;

  function toggleSearch() {
    setIsSearchOpen((currentValue) => {
      if (currentValue) {
        setSearchQuery("");
      }

      return !currentValue;
    });
  }

  function toggleShowAllProducts() {
    setShowAllProducts((currentValue) => !currentValue);
  }

  return {
    canToggleProducts,
    filteredProducts,
    isSearchOpen,
    searchInputRef,
    searchQuery,
    setSearchQuery,
    showAllProducts,
    toggleSearch,
    toggleShowAllProducts,
    visibleProducts,
  };
}
