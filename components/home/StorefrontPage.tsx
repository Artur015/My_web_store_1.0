"use client";

import { useNotification } from "@/hooks/useNotification";
import { useMenu } from "@/hooks/useMenu";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useRegister } from "@/hooks/useRegister";
import { useTopLayersHeight } from "@/hooks/useTopLayersHeight";
import { useCart } from "@/hooks/useCart";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { products } from "@/data/store-content";
import { CartModal } from "@/components/home/CartModal";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HeaderOverlay } from "@/components/home/HeaderOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { NotificationToast } from "@/components/home/NotificationToast";
import { ProductSection } from "@/components/home/ProductSection";
import { RegisterModal } from "@/components/home/RegisterModal";
import { SiteFooter } from "@/components/home/SiteFooter";
import { StoreHighlights } from "@/components/home/StoreHighlights";

type StorefrontPageProps = {
  emptyMessage?: string;
  initialVisibleProducts: number;
  productSubtitle?: string;
  productTitle?: string;
  showCategories?: boolean;
  showFooter?: boolean;
  showHero?: boolean;
  showHighlights?: boolean;
  showShopLink?: boolean;
};

export function StorefrontPage({
  emptyMessage,
  initialVisibleProducts,
  productSubtitle,
  productTitle,
  showCategories = true,
  showFooter = true,
  showHero = true,
  showHighlights = true,
  showShopLink = true,
}: StorefrontPageProps) {
  const { notification, showNotification } = useNotification();
  const { closeMenu, isMenuOpen, toggleMenu } = useMenu();
  const {
    canToggleProducts,
    isSearchOpen,
    searchInputRef,
    searchQuery,
    setSearchQuery,
    showAllProducts,
    toggleSearch,
    toggleShowAllProducts,
    visibleProducts,
  } = useProductSearch({
    initialVisibleProducts,
    products,
  });
  const {
    addToCart,
    cart,
    closeCart,
    isCartOpen,
    openCart,
    removeFromCart,
    totalItems,
    totalPrice,
    updateQuantity,
  } = useCart({
    onProductAdded: showNotification,
  });
  const {
    closeRegister,
    handleRegisterSubmit,
    isRegisterOpen,
    openRegister,
    registerError,
    registerForm,
    registerNameInputRef,
    updateRegisterField,
  } = useRegister({
    onRegistered: showNotification,
  });
  const { topLayersHeight, topLayersRef, topLayersStyle } = useTopLayersHeight();

  useBodyScrollLock(isCartOpen || isRegisterOpen);

  return (
    <>
      <HeaderOverlay
        topLayersRef={topLayersRef}
        topLayersStyle={topLayersStyle}
        isMenuOpen={isMenuOpen}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        totalItems={totalItems}
        searchInputRef={searchInputRef}
        onCloseMenu={closeMenu}
        onOpenCart={openCart}
        onOpenRegister={openRegister}
        onSearchChange={setSearchQuery}
        onToggleMenu={toggleMenu}
        onToggleSearch={toggleSearch}
      />

      <main style={{ paddingTop: topLayersHeight }}>
        {showHero ? <HeroSection /> : null}
        {showCategories ? <CategoriesSection /> : null}
        <ProductSection
          canToggleProducts={canToggleProducts}
          emptyMessage={emptyMessage}
          isSearchOpen={isSearchOpen}
          searchQuery={searchQuery}
          showAllProducts={showAllProducts}
          showShopLink={showShopLink}
          subtitle={productSubtitle}
          title={productTitle}
          visibleProducts={visibleProducts}
          onAddToCart={addToCart}
          onToggleShowAllProducts={toggleShowAllProducts}
        />
        <RegisterModal
          error={registerError}
          isOpen={isRegisterOpen}
          formData={registerForm}
          nameInputRef={registerNameInputRef}
          onClose={closeRegister}
          onFieldChange={updateRegisterField}
          onSubmit={handleRegisterSubmit}
        />
        <CartModal
          cart={cart}
          isOpen={isCartOpen}
          totalPrice={totalPrice}
          onClose={closeCart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
        {showHighlights ? <StoreHighlights /> : null}
      </main>

      {showFooter ? <SiteFooter /> : null}
      <NotificationToast message={notification} />
    </>
  );
}
