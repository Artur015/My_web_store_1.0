import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, RefObject } from "react";
import { menuSections } from "@/data/store-content";

type HeaderOverlayProps = {
  topLayersRef: RefObject<HTMLDivElement | null>;
  topLayersStyle: CSSProperties;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  totalItems: number;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onCloseMenu: () => void;
  onOpenCart: () => void;
  onOpenRegister: () => void;
  onSearchChange: (value: string) => void;
  onToggleMenu: () => void;
  onToggleSearch: () => void;
};

export function HeaderOverlay({
  topLayersRef,
  topLayersStyle,
  isMenuOpen,
  isSearchOpen,
  searchQuery,
  totalItems,
  searchInputRef,
  onCloseMenu,
  onOpenCart,
  onOpenRegister,
  onSearchChange,
  onToggleMenu,
  onToggleSearch,
}: HeaderOverlayProps) {
  return (
    <div className="top-layers" ref={topLayersRef} style={topLayersStyle}>
      <header className="header">
        <div className="header__inner container">
          <div className="header__brand">
            <a href="#" className="header__logo-link" aria-label="Brand home">
              <Image
                src="/logo.png"
                alt="Brand logo"
                width={44}
                height={38}
                priority
              />
            </a>

            <button
              type="button"
              className="header__search-btn"
              aria-label="Search clothes"
              aria-expanded={isSearchOpen}
              onClick={onToggleSearch}
            >
              <Image src="/img1.png" alt="Search" width={27} height={27} />
            </button>
          </div>

          <nav className="nav" aria-label="Main">
            <div className="menu-shell">
              <button
                type="button"
                className="nav__btn nav__btn--menu"
                aria-expanded={isMenuOpen}
                aria-label="Open menu"
                onClick={onToggleMenu}
              >
                <Image src="/img2.png" alt="Menu" width={32} height={23} />
              </button>

              {isMenuOpen ? (
                <>
                  <button
                    type="button"
                    className="menu__backdrop"
                    aria-label="Close menu"
                    onClick={onCloseMenu}
                  />

                  <div className="menu">
                    <div className="menu__inner">
                      <h2 className="menu__title">MENU</h2>
                      <div className="menu__section">
                        <h3 className="menu__category">SHOP</h3>
                        <ul className="menu__list">
                          <li className="menu__item">
                            <Link href="/shop" className="menu__link" onClick={onCloseMenu}>
                              All Products
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {menuSections.map((section) => (
                        <div className="menu__section" key={section.title}>
                          <h3 className="menu__category">{section.title}</h3>
                          <ul className="menu__list">
                            {section.items.map((item) => (
                              <li className="menu__item" key={item}>
                                <a href="#" className="menu__link" onClick={onCloseMenu}>
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <button
              type="button"
              className="nav__btn nav__btn--account"
              aria-label="Register"
              onClick={onOpenRegister}
            >
              <Image src="/img3.png" alt="Account" width={29} height={29} />
            </button>

            <button
              type="button"
              className="nav__btn nav__btn--cart"
              aria-label="Basket"
              onClick={onOpenCart}
            >
              <Image src="/img4.png" alt="Cart" width={32} height={29} />
              {totalItems > 0 ? <span className="nav__cart-count">{totalItems}</span> : null}
            </button>
          </nav>
        </div>
      </header>

      {isSearchOpen ? (
        <section className="search-bar">
          <div className="search-bar__inner container">
            <label className="search-bar__field" htmlFor="clothes-search">
              <span className="search-bar__label">Search clothes</span>
              <input
                id="clothes-search"
                ref={searchInputRef}
                className="search-bar__input"
                type="search"
                placeholder="Search clothes"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </label>

            <button
              type="button"
              className="search-bar__close"
              onClick={onToggleSearch}
            >
              Close
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
