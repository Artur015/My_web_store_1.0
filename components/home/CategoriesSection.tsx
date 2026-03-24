import { categoryCards } from "@/data/store-content";

export function CategoriesSection() {
  return (
    <section className="categories container" aria-label="Shop categories">
      {categoryCards.map((card) => (
        <article
          className={`categories__item categories__item--${card.modifier}`}
          key={card.title}
        >
          <div className="categories__overlay">
            <p className="categories__label">{card.label}</p>
            <h2 className="categories__title">{card.title}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}
