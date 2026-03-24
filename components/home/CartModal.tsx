import Image from "next/image";
import type { CartItem } from "@/types/store";

type CartModalProps = {
  cart: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  onClose: () => void;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, change: number) => void;
};

export function CartModal({
  cart,
  isOpen,
  totalPrice,
  onClose,
  onRemove,
  onUpdateQuantity,
}: CartModalProps) {
  return (
    <div
      className={`cart-modal${isOpen ? "" : " cart-modal--hidden"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="cart-modal__overlay"
        aria-label="Close cart"
        onClick={onClose}
      />

      <div
        className="cart-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-modal__header">
          <h2 className="cart-modal__title" id="cart-title">
            Shopping Cart
          </h2>

          <button
            type="button"
            className="cart-modal__close"
            aria-label="Close cart"
            onClick={onClose}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>

        <div className="cart-modal__items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-modal__item" key={item.id}>
                <div className="cart-modal__item-image">
                  <Image
                    className="cart-modal__item-photo"
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </div>

                <div className="cart-modal__item-info">
                  <h3 className="cart-modal__item-title">{item.title}</h3>
                  <div className="cart-modal__item-price">${item.price.toFixed(2)}</div>

                  <div className="cart-modal__item-quantity">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-modal__item-remove"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-modal__footer">
          <div className="cart-modal__total">
            <span>Total:</span>
            <span className="cart-modal__total-price">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="cart-modal__actions">
            <button
              type="button"
              className="cart-modal__btn cart-modal__btn--checkout"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
            <button
              type="button"
              className="cart-modal__btn cart-modal__btn--continue"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
