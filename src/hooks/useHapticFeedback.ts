// hooks/useHapticFeedback.ts
import { useTelegram } from "./useTelegram";

type HapticType = "light" | "medium" | "heavy" | "rigid";
type NotificationType = "error" | "success" | "warning";

export const useHapticFeedback = () => {
  const { webApp } = useTelegram();

  const impactOccurred = (type: HapticType = "light") => {
    webApp?.HapticFeedback?.impactOccurred(type);
  };

  const notificationOccurred = (type: NotificationType) => {
    webApp?.HapticFeedback?.notificationOccurred(type);
  };

  const selectionChanged = () => {
    webApp?.HapticFeedback?.selectionChanged();
  };

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  };
};
