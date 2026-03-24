import type { FormEvent, RefObject } from "react";
import type { RegisterFormData } from "@/types/store";

type RegisterModalProps = {
  error: string | null;
  isOpen: boolean;
  formData: RegisterFormData;
  nameInputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onFieldChange: (field: keyof RegisterFormData, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function RegisterModal({
  error,
  isOpen,
  formData,
  nameInputRef,
  onClose,
  onFieldChange,
  onSubmit,
}: RegisterModalProps) {
  return (
    <div
      className={`auth-modal${isOpen ? "" : " auth-modal--hidden"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="auth-modal__overlay"
        aria-label="Close registration"
        onClick={onClose}
      />

      <div
        className="auth-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <div className="auth-modal__header">
          <div>
            <p className="auth-modal__eyebrow">Client account</p>
            <h2 className="auth-modal__title" id="register-title">
              Create your profile
            </h2>
          </div>

          <button
            type="button"
            className="auth-modal__close"
            aria-label="Close registration"
            onClick={onClose}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="auth-form__field" htmlFor="register-name">
            <span className="auth-form__label">Full name</span>
            <input
              id="register-name"
              ref={nameInputRef}
              className="auth-form__input"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(event) => onFieldChange("name", event.target.value)}
            />
          </label>

          <label className="auth-form__field" htmlFor="register-email">
            <span className="auth-form__label">Email</span>
            <input
              id="register-email"
              className="auth-form__input"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(event) => onFieldChange("email", event.target.value)}
            />
          </label>

          <label className="auth-form__field" htmlFor="register-password">
            <span className="auth-form__label">Password</span>
            <input
              id="register-password"
              className="auth-form__input"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(event) => onFieldChange("password", event.target.value)}
            />
          </label>

          {error ? (
            <p className="auth-form__error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="auth-form__actions">
            <button type="submit" className="auth-form__submit">
              Register
            </button>
            <button
              type="button"
              className="auth-form__secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
