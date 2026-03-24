import Image from "next/image";
import type { Product } from "@/types/store";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <Image
          className="product-card__photo"
          src={product.image}
          alt={product.title}
          width={360}
          height={420}
        />

        <div className="product-card__overlay">
          <button
            type="button"
            className="product-card__btn"
            onClick={() => onAddToCart(product)}
          >
            <Image
              src="/img4.png"
              alt=""
              width={26}
              height={24}
              aria-hidden="true"
            />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__price">${product.price.toFixed(2)}</span>
      </div>
    </article>
  );
}
