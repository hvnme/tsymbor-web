export { };

interface TelegramUser {
    id: string;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
}

interface TelegramChat {
    id: string;
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    photo_url?: string;
}

interface TelegramInitData {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: TelegramChat;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
}

interface TelegramThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
}

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready(): void;
                initDataUnsafe: TelegramInitData;
                initData: string;
                version: string;
                platform: string;
                colorScheme: 'light' | 'dark';
                themeParams: TelegramThemeParams;
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
                headerColor: string;
                backgroundColor: string;
                bottomBarColor?: string;
                isClosingConfirmationEnabled: boolean;
                isVerticalSwipesEnabled: boolean;

                expand(): void;
                close(): void;

                disableVerticalSwipes(): void;
                enableVerticalSwipes(): void;
                setBackgroundColor(color: string): void;
                setHeaderColor(color: string): void;
                setBottomBarColor?(color: string): void;

                enableClosingConfirmation(): void;
                disableClosingConfirmation(): void;


                requestFullscreen(): void;
                sendData(data: string): void;


                showAlert(message: string, callback?: () => void): void;
                showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
                showPopup(params: {
                    title?: string;
                    message: string;
                    buttons?: Array<{
                        id?: string;
                        type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
                        text: string;
                    }>;
                }, callback?: (buttonId: string) => void): void;

                showScanQrPopup(params: {
                    text?: string;
                }, callback?: (text: string) => void): void;
                closeScanQrPopup(): void;

                readTextFromClipboard(callback?: (text: string) => void): void;

                requestWriteAccess(callback?: (granted: boolean) => void): void;
                requestContact(callback?: (granted: boolean, contact?: {
                    contact: {
                        user_id: number;
                        phone_number: string;
                        first_name: string;
                        last_name?: string;
                        vcard?: string;
                    };
                }) => void): void;

                onEvent(eventType: 'themeChanged' | 'viewportChanged' | 'mainButtonClicked' | 'backButtonClicked' | 'settingsButtonClicked' | 'invoiceClosed' | 'popupClosed' | 'qrTextReceived' | 'clipboardTextReceived' | 'writeAccessRequested' | 'contactRequested', eventHandler: (...args: any[]) => void): void;
                offEvent(eventType: 'themeChanged' | 'viewportChanged' | 'mainButtonClicked' | 'backButtonClicked' | 'settingsButtonClicked' | 'invoiceClosed' | 'popupClosed' | 'qrTextReceived' | 'clipboardTextReceived' | 'writeAccessRequested' | 'contactRequested', eventHandler: (...args: any[]) => void): void;

                BackButton: {
                    isVisible: boolean;
                    show(): void;
                    hide(): void;
                    onClick(fn: () => void): void;
                    offClick(fn: () => void): void;
                };

                MainButton: {
                    text: string;
                    color: string;
                    textColor: string;
                    isVisible: boolean;
                    isActive: boolean;
                    isProgressVisible: boolean;
                    setText(text: string): void;
                    setParams(params: {
                        text?: string;
                        color?: string;
                        text_color?: string;
                        is_active?: boolean;
                        is_visible?: boolean;
                    }): void;
                    show(): void;
                    hide(): void;
                    enable(): void;
                    disable(): void;
                    showProgress(leaveActive?: boolean): void;
                    hideProgress(): void;
                    onClick(fn: () => void): void;
                    offClick(fn: () => void): void;
                };


                SecondaryButton?: {
                    text: string;
                    color: string;
                    textColor: string;
                    isVisible: boolean;
                    isActive: boolean;
                    isProgressVisible: boolean;
                    position: 'left' | 'right' | 'top' | 'bottom';
                    setText(text: string): void;
                    setParams(params: {
                        text?: string;
                        color?: string;
                        text_color?: string;
                        is_active?: boolean;
                        is_visible?: boolean;
                        position?: 'left' | 'right' | 'top' | 'bottom';
                    }): void;
                    show(): void;
                    hide(): void;
                    enable(): void;
                    disable(): void;
                    showProgress(leaveActive?: boolean): void;
                    hideProgress(): void;
                    onClick(fn: () => void): void;
                    offClick(fn: () => void): void;
                };

                // Кнопка настроек
                SettingsButton?: {
                    isVisible: boolean;
                    show(): void;
                    hide(): void;
                    onClick(fn: () => void): void;
                    offClick(fn: () => void): void;
                };

                // Тактильная обратная связь
                HapticFeedback: {
                    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
                    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
                    selectionChanged(): void;
                };

                // CloudStorage для хранения данных (в новых версиях)
                CloudStorage?: {
                    setItem(key: string, value: string, callback?: (error: string | null, stored: boolean) => void): void;
                    getItem(key: string, callback: (error: string | null, value: string | null) => void): void;
                    getItems(keys: string[], callback: (error: string | null, values: Record<string, string>) => void): void;
                    removeItem(key: string, callback?: (error: string | null, removed: boolean) => void): void;
                    removeItems(keys: string[], callback?: (error: string | null, removed: boolean) => void): void;
                    getKeys(callback: (error: string | null, keys: string[]) => void): void;
                };

                // BiometricManager для биометрии (в новых версиях)
                BiometricManager?: {
                    isInited: boolean;
                    isBiometricAvailable: boolean;
                    biometricType: 'finger' | 'face' | 'unknown';
                    isAccessRequested: boolean;
                    isAccessGranted: boolean;
                    isBiometricTokenSaved: boolean;
                    deviceId: string;
                    init(callback?: () => void): void;
                    requestAccess(params: {
                        reason?: string;
                    }, callback?: (granted: boolean) => void): void;
                    authenticate(params: {
                        reason?: string;
                    }, callback?: (success: boolean, token?: string) => void): void;
                    updateBiometricToken(token: string, callback?: (updated: boolean) => void): void;
                    openSettings(): void;
                };
            };
        };
    }
}