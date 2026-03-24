import { useEffect, useState } from "react";

export function useNotification(timeoutMs = 1500) {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNotification(null);
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [notification, timeoutMs]);

  return {
    notification,
    showNotification: setNotification,
  };
}
