import { useEffect, useState } from "react";
import { CART_STORAGE_KEY } from "@/data/store-content";
import type { CartItem, Product } from "@/types/store";

type UseCartOptions = {
  onProductAdded: (message: string) => void;
};

export function useCart({ onProductAdded }: UseCartOptions) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        setCart(JSON.parse(savedCart) as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hasHydrated]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    onProductAdded(`${product.title} added to cart!`);
  }

  function updateQuantity(productId: number, change: number) {
    setCart((currentCart) =>
      currentCart.reduce<CartItem[]>((nextCart, item) => {
        if (item.id !== productId) {
          nextCart.push(item);
          return nextCart;
        }

        const nextQuantity = item.quantity + change;

        if (nextQuantity > 0) {
          nextCart.push({ ...item, quantity: nextQuantity });
        }

        return nextCart;
      }, []),
    );
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  return {
    addToCart,
    cart,
    closeCart,
    isCartOpen,
    openCart,
    removeFromCart,
    totalItems,
    totalPrice,
    updateQuantity,
  };
}
