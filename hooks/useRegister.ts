import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { REGISTERED_USERS_STORAGE_KEY } from "@/data/store-content";
import type { RegisteredUser, RegisterFormData } from "@/types/store";

type UseRegisterOptions = {
  onRegistered: (message: string) => void;
};

export function useRegister({ onRegistered }: UseRegisterOptions) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState<string | null>(null);
  const registerNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRegisterOpen) {
      registerNameInputRef.current?.focus();
    }
  }, [isRegisterOpen]);

  function openRegister() {
    setRegisterError(null);
    setIsRegisterOpen(true);
  }

  function closeRegister() {
    setIsRegisterOpen(false);
    setRegisterError(null);
  }

  function updateRegisterField(field: keyof RegisterFormData, value: string) {
    setRegisterForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function readRegisteredUsers(): RegisteredUser[] {
    try {
      const savedUsers = window.localStorage.getItem(REGISTERED_USERS_STORAGE_KEY);

      if (!savedUsers) {
        return [];
      }

      return JSON.parse(savedUsers) as RegisteredUser[];
    } catch {
      window.localStorage.removeItem(REGISTERED_USERS_STORAGE_KEY);
      return [];
    }
  }

  function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = registerForm.name.trim();
    const trimmedEmail = registerForm.email.trim().toLowerCase();
    const trimmedPassword = registerForm.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setRegisterError("Please fill in all registration fields.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setRegisterError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      setRegisterError("Password must contain at least 6 characters.");
      return;
    }

    const registeredUsers = readRegisteredUsers();
    const emailAlreadyExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === trimmedEmail,
    );

    if (emailAlreadyExists) {
      setRegisterError("A client with this email is already registered.");
      return;
    }

    const nextUser: RegisteredUser = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      registeredAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      REGISTERED_USERS_STORAGE_KEY,
      JSON.stringify([...registeredUsers, nextUser]),
    );

    setRegisterForm({
      name: "",
      email: "",
      password: "",
    });
    setRegisterError(null);
    setIsRegisterOpen(false);
    onRegistered(`Registration completed for ${trimmedName}!`);
  }

  return {
    closeRegister,
    handleRegisterSubmit,
    isRegisterOpen,
    openRegister,
    registerError,
    registerForm,
    registerNameInputRef,
    updateRegisterField,
  };
}
