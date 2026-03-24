import Image from "next/image";
import { features } from "@/data/store-content";

export function StoreHighlights() {
  return (
    <>
      <section className="features">
        <div className="features__list container">
          {features.map((feature) => (
            <article className="features__item" key={feature.title}>
              <Image
                className="features__icon"
                src={feature.icon}
                alt={feature.title}
                width={48}
                height={40}
              />
              <h2 className="features__title">{feature.title}</h2>
              <p className="features__text">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="subscribe">
        <div className="subscribe__inner">
          <div className="subscribe__review">
            <div className="subscribe__avatar" />
            <p className="subscribe__quote">
              &quot;I found stylish pieces that feel comfortable every day and still look
              premium.&quot;
            </p>
          </div>

          <div className="subscribe__content">
            <h2 className="subscribe__title">SUBSCRIBE</h2>
            <p className="subscribe__subtitle">FOR OUR NEWSLETTER AND PROMOTION</p>

            <form className="subscribe__form" onSubmit={(event) => event.preventDefault()}>
              <input
                className="subscribe__input"
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button type="submit" className="subscribe__button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
