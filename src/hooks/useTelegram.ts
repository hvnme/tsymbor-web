// hooks/useTelegram.ts
import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initTelegram = () => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.disableVerticalSwipes();

        const isDesktop =
          tg.platform === "web" ||
          tg.platform === "weba" ||
          tg.platform === "webk" ||
          window.innerWidth > 768;

        if (isDesktop) {
          tg.expand();
        } else {
          tg.requestFullscreen();
        }

        // Даем время на инициализацию
        setTimeout(() => {
          setIsReady(true);
        }, 500);
      } else {
        // Если Telegram WebApp недоступен, помечаем как готовый через короткое время
        setTimeout(() => {
          setIsReady(true);
        }, 1000);
      }
    };

    initTelegram();
  }, []);

  const webApp =
    typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

  return {
    user: webApp?.initDataUnsafe?.user,
    webApp,
    isReady,
  };
};
