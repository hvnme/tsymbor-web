// hooks/useTelegram.ts
import { useEffect, useState, useCallback } from "react";

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const [topInset, setTopInset] = useState(0);
  const [bottomInset, setBottomInset] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.disableVerticalSwipes();

      tg.setBackgroundColor("#1A2634");

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        tg.requestFullscreen();
      } else {
        tg.expand();
      }

      const updateTopInset = () => {
        const styles = getComputedStyle(document.documentElement);

        const safeAreaTop = styles
          .getPropertyValue("--tg-safe-area-inset-top")
          .trim();

        const contentSafeAreaTop = styles
          .getPropertyValue("--tg-content-safe-area-inset-top")
          .trim();

        const safeAreaValue = parseFloat(safeAreaTop) || 0;
        const contentSafeAreaValue = parseFloat(contentSafeAreaTop) || 0;

        const totalInset = safeAreaValue + contentSafeAreaValue;
        setTopInset(totalInset);
      };

      const updateBottomInset = () => {
        const styles = getComputedStyle(document.documentElement);

        const safeAreaBottom = styles
          .getPropertyValue("--tg-safe-area-inset-bottom")
          .trim();

        const bottomValue = parseFloat(safeAreaBottom) || 0;
        setBottomInset(bottomValue);
      };

      // Обновляем отступы с задержкой для корректной инициализации
      setTimeout(() => {
        updateTopInset();
        updateBottomInset();
      }, 100);
      setTimeout(() => {
        updateTopInset();
        updateBottomInset();
      }, 500);
      setTimeout(() => {
        updateTopInset();
        updateBottomInset();
        setIsReady(true);
      }, 1000);

      const handleViewportChange = () => {
        updateTopInset();
        updateBottomInset();
      };
      tg.onEvent?.("viewportChanged", handleViewportChange);

      return () => {
        tg.offEvent?.("viewportChanged", handleViewportChange);
      };
    } else {
      // Если Telegram WebApp недоступен, помечаем как готовый через короткое время
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    }
  }, []);

  const webApp =
    typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

  const isMobile =
    typeof navigator !== "undefined"
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      : false;

  const showSettingsButton = useCallback(() => {
    if (webApp?.SettingsButton) {
      webApp.SettingsButton.show();
      webApp.SettingsButton.onClick(() => {
        // Обработчик клика на кнопку настроек
      });
    }
  }, [webApp]);

  const openLocationSettings = useCallback(() => {
    if ((webApp as any)?.LocationManager) {
      (webApp as any).LocationManager.openSettings();
    }
  }, [webApp]);

  return {
    user: webApp?.initDataUnsafe?.user,
    webApp,
    isReady,
    isMobile,
    topInset,
    bottomInset,
    showSettingsButton,
    openLocationSettings,
  };
};
