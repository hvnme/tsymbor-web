// hooks/useTelegram.ts
import { useEffect } from 'react';

export const useTelegram = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.disableVerticalSwipes();
            tg.requestFullscreen();
        }
    }, []);

    const webApp = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

    return {
        user: webApp?.initDataUnsafe?.user,
        webApp
    };
};