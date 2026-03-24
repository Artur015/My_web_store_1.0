import Image from "next/image";
import { socials } from "@/data/store-content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Brand. All Rights Reserved.
        </p>

        <div className="footer__socials">
          {socials.map((social) => (
            <button
              type="button"
              className="footer__social-btn"
              aria-label={social.label}
              key={social.label}
            >
              <Image src={social.icon} alt="" width={16} height={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
