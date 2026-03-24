import Image from "next/image";

export function HeroSection() {
  return (
    <section className="promo">
      <div className="promo__inner container">
        <Image
          className="promo__image"
          src="/mainImg.png"
          alt="Fashion hero"
          width={800}
          height={764}
          priority
        />

        <div className="promo__content">
          <div className="promo__divider" />
          <div className="promo__text">
            <h1 className="promo__title">THE BRAND</h1>
            <p className="promo__subtitle">
              OF LUXURIOUS <span className="promo__highlight">FASHION</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
