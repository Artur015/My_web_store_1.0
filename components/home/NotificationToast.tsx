type NotificationToastProps = {
  message: string | null;
};

export function NotificationToast({ message }: NotificationToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="notification" role="status" aria-live="polite">
      {message}
    </div>
  );
}
