import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BarcodeCard from "@/pages/main-page/components/BarcodeCard";
import PromotionsCarousel from "@/pages/main-page/components/PromotionsCarousel";
import InfoCard from "@/pages/main-page/components/InfoCard";
import { GlowEffect } from "@/components/ui/glow-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { FAQ } from "./components/FAQCard";
import { RulesDialog } from "./components/RulesDialog";
import { ScanningDialogs } from "./components/ScanningDialogs";
import { RulesButton } from "./components/RulesButton";
import { AuthRequiredDialog } from "./components/AuthRequiredDialog";
import { tsymborApi, type UserDto, type PromotionDTO } from "@/api/tsymborApi";
import labubuFace from "@/assets/labubu-face.svg";

const StoreApp = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [finalNumber, setFinalNumber] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [spinningNumbers, setSpinningNumbers] = useState<number[]>([0, 0, 0]);

  // Данные из API
  const [userInfo, setUserInfo] = useState<UserDto | null>(null);
  const [promotions, setPromotions] = useState<PromotionDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserNotFound, setIsUserNotFound] = useState(false);

  const { user, webApp, isReady } = useTelegram();
  const { impactOccurred } = useHapticFeedback();
  const customerName = user?.first_name || "Користувач";
  const photoUrl = user?.photo_url;
  const chatId = user?.id;

  // Отладочная информация
  console.log("Telegram ready:", isReady);
  console.log("Telegram user:", user);
  console.log("Chat ID:", chatId);
  console.log("WebApp available:", !!webApp);
  console.log("User info from API:", userInfo);
  console.log("Is user not found:", isUserNotFound);

  useEffect(() => {
    const loadData = async () => {
      if (!isReady) {
        return;
      }

      if (!chatId) {
        console.log("No chat ID found, showing auth dialog");
        setIsUserNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const [userResponse, promotionsResponse] = await Promise.all([
          tsymborApi.getUserInfo(Number(chatId)),
          tsymborApi.getActivePromotions(),
        ]);

        if (userResponse === null) {
          console.log("User not found in API, showing auth dialog");
          setIsUserNotFound(true);
          setUserInfo(null);
        } else {
          setUserInfo(userResponse);
          setIsUserNotFound(false);
        }

        setPromotions(promotionsResponse);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setIsUserNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [chatId, isReady]);

  const scanQR = async () => {
    if (!webApp || !chatId) {
      alert("Telegram WebApp недоступний");
      return;
    }

    try {
      webApp.showScanQrPopup(
        { text: "Відскануйте QR-код стаканчика" },
        async (scannedText) => {
          if (scannedText) {
            webApp.closeScanQrPopup();

            // Проверяем формат QR-кода
            if (!scannedText.startsWith("QR")) {
              webApp.HapticFeedback?.notificationOccurred("error");
              setShowError(true);
              setShowCloseButton(false); // Сначала скрываем кнопку

              // Показываем кнопку "Закрити" через 3 секунды
              setTimeout(() => {
                setShowCloseButton(true);
              }, 3000);

              setTimeout(() => {
                setShowError(false);
                setShowCloseButton(false); // Сбрасываем состояние кнопки
              }, 6000);

              return;
            }

            webApp.HapticFeedback?.notificationOccurred("success");
            setScannedCode(scannedText);
            setIsProcessing(true);

            // Сначала проверяем валидность QR-кода через API
            try {
              const result = await tsymborApi.activateLabubu(
                Number(chatId),
                scannedText
              );

              if (result.success && result.number) {
                // QR-код валидный - запускаем анимацию
                let vibrationCount = 0;
                const interval = setInterval(() => {
                  setSpinningNumbers([
                    Math.floor(Math.random() * 10),
                    Math.floor(Math.random() * 10),
                    Math.floor(Math.random() * 10),
                  ]);

                  vibrationCount++;
                  if (vibrationCount <= 15) {
                    webApp.HapticFeedback?.impactOccurred("light");
                  } else if (vibrationCount <= 35) {
                    webApp.HapticFeedback?.impactOccurred("medium");
                  } else if (vibrationCount <= 50) {
                    webApp.HapticFeedback?.impactOccurred("heavy");
                  } else {
                    webApp.HapticFeedback?.impactOccurred("rigid");
                  }
                }, 100);

                // Показываем результат через 4 секунды анимации
                setTimeout(() => {
                  clearInterval(interval);
                  webApp.HapticFeedback?.impactOccurred("heavy");

                  // Успешная активация
                  const finalNum = result.number!; // Мы уже проверили что number существует
                  const isWinning = finalNum.toString() === "27";

                  setTimeout(() => {
                    if (isWinning) {
                      // Победа - мощная вибрация
                      webApp.HapticFeedback?.notificationOccurred("success");
                      webApp.HapticFeedback?.impactOccurred("heavy");
                    } else {
                      // Проигрыш - легкая вибрация
                      webApp.HapticFeedback?.notificationOccurred("warning");
                      webApp.HapticFeedback?.impactOccurred("light");
                    }
                  }, 200);

                  setIsProcessing(false);
                  setFinalNumber(finalNum.toString());
                  setShowResult(true);
                  setShowCloseButton(false); // Сначала скрываем кнопку

                  // Показываем кнопку "Закрити" через 3 секунды
                  setTimeout(() => {
                    setShowCloseButton(true);
                  }, 3000);

                  setTimeout(
                    () => {
                      setShowResult(false);
                      setScannedCode(null);
                      setFinalNumber("");
                      setShowCloseButton(false); // Сбрасываем состояние кнопки
                    },
                    isWinning ? 12000 : 8000
                  ); // Увеличиваем время отображения
                }, 4000); // 4 секунды анимации
              } else {
                // QR-код невалидный - сразу показываем ошибку
                setIsProcessing(false);

                // Сразу показываем ошибку без задержки
                webApp.HapticFeedback?.notificationOccurred("error");
                setShowError(true);
                setShowCloseButton(false); // Сначала скрываем кнопку

                // Показываем кнопку "Закрити" через 3 секунды
                setTimeout(() => {
                  setShowCloseButton(true);
                }, 3000);

                // Автоматически скрываем ошибку через 6 секунд
                setTimeout(() => {
                  setShowError(false);
                  setShowCloseButton(false); // Сбрасываем состояние кнопки
                }, 6000);
              }
            } catch (error) {
              // Ошибка сети - сразу показываем ошибку
              setIsProcessing(false);

              webApp.HapticFeedback?.notificationOccurred("error");
              setShowError(true);
              setShowCloseButton(false); // Сначала скрываем кнопку

              // Показываем кнопку "Закрити" через 3 секунды
              setTimeout(() => {
                setShowCloseButton(true);
              }, 3000);

              // Автоматически скрываем ошибку через 6 секунд
              setTimeout(() => {
                setShowError(false);
                setShowCloseButton(false); // Сбрасываем состояние кнопки
              }, 6000);

              console.error("Помилка активації:", error);
            }

            console.log("Відсканований QR-код:", scannedText);
          } else {
            webApp.HapticFeedback?.notificationOccurred("error");
          }
        }
      );
    } catch (error) {
      webApp.HapticFeedback?.notificationOccurred("error");
      console.error("Помилка сканування:", error);
    }
  };

  // Показываем лоадер пока загружаются данные
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-yellow-700 to-orange-600 fixed inset-0 flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-white" />
        <div className="text-white text-lg ml-4">Завантаження...</div>
      </div>
    );
  }

  // Если пользователь не найден в API - показываем диалог авторизации
  if (isUserNotFound) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-yellow-700 to-orange-600 fixed inset-0">
          <GlowEffect
            className="opacity-40"
            colors={["#17005bff", "#1d04dbff", "#0bf5f5ff", "#ef8b44ff"]}
            mode="breathe"
            blur="strongest"
            scale={1.1}
            duration={15}
          />
        </div>
        <AuthRequiredDialog open={true} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-yellow-700 to-orange-600 fixed inset-0">
      <GlowEffect
        className="opacity-40"
        colors={["#17005bff", "#1d04dbff", "#0bf5f5ff", "#ef8b44ff"]}
        mode="breathe"
        blur="strongest"
        scale={1.1}
        duration={15}
      />

      <div className="h-full overflow-y-auto pb-12">
        <AnimatedGroup
          className="max-w-md mx-auto px-3 py-8 space-y-3"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.05,
                },
              },
            },
            item: {
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.95,
                filter: "blur(4px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.4,
                },
              },
            },
          }}
        >
          {/* Info Card */}
          <div key="info-card">
            <InfoCard customerName={customerName} photoUrl={photoUrl} />
          </div>

          {/* Barcode Card с данными из API */}
          <div key="barcode-card">
            <BarcodeCard
              balance={userInfo?.balance || 0}
              freeCoffeeCount={userInfo?.freeCoffeeCount || 0}
              barcodeValue={userInfo?.barcode || ""}
              coffeeTillFree={userInfo?.coffeeTillFree || 0}
            />
          </div>

          <div key="FAQ">
            <FAQ />
          </div>

          {/* Promotions с данными из API */}
          <div key="promotions">
            <PromotionsCarousel promotions={promotions} />
          </div>

          {/* Rules Button */}
          <div key="rules-button">
            <RulesButton onClick={() => setShowRules(true)} />
          </div>

          {/* Footer */}
          <div key="footer" className="text-center py-4">
            <p className="font-mono text-xs text-white/50">v0.0.1</p>
          </div>
        </AnimatedGroup>
      </div>

      {/* All Dialogs */}
      <RulesDialog open={showRules} onOpenChange={setShowRules} />

      <ScanningDialogs
        showError={showError}
        setShowError={setShowError}
        isProcessing={isProcessing}
        scannedCode={scannedCode}
        spinningNumbers={spinningNumbers}
        showResult={showResult}
        setShowResult={setShowResult}
        finalNumber={finalNumber}
        showCloseButton={showCloseButton}
      />

      {/* Кнопка QR сканера */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.5,
        }}
      >
        <motion.img
          src={labubuFace}
          alt="Labubu"
          className="absolute w-16 h-16 -top-10 -right-4 z-40 "
          initial={{ scale: 0, rotate: 45 }}
          animate={{
            scale: 1,
            rotate: [9, 3, -3, 9],
            y: [0, -2, 2, 0],
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.7,
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        <motion.button
          onClick={() => {
            impactOccurred("medium");
            scanQR();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-20 border rounded-xl px-6 py-4 transition-all duration-300 flex items-center bg-orange-500/25 backdrop-blur-sm border-white/10 shadow-2xl shadow-black/30"
        >
          <span className="font-bold text-white">Знайдеш його?</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StoreApp;
