import { useState } from "react";

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  return {
    closeMenu,
    isMenuOpen,
    toggleMenu,
  };
}
