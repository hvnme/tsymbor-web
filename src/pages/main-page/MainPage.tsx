import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTelegram } from "@/hooks/useTelegram";
import BarcodeCard from "@/pages/main-page/components/BarcodeCard";
import PromotionsCarousel from "@/pages/main-page/components/PromotionsCarousel";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { RulesDialog } from "./components/RulesDialog";
import { RulesButton } from "./components/RulesButton";
import { InfoCardButton } from "./components/InfoCardButton";
import { InfoCardDialog } from "./components/InfoCardDialog";
import { AuthRequiredDialog } from "./components/AuthRequiredDialog";
import { PromotionDialog } from "./components/PromotionDialog";
import { tsymborApi } from "@/api/tsymborApi";
import type {
  UserDto,
  PromotionDTO,
  PromotionCounterDTO,
} from "@/api/tsymborApi";
import LiquidEther from "@/components/LiquidEther";
import AnimatedContent from "@/components/AnimatedContent";

const StoreApp = () => {
  const rulesId = useId();
  const infoCardId = useId();
  const [showRules, setShowRules] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionDTO | null>(null);
  const [userInfo, setUserInfo] = useState<UserDto | null>(null);
  const [promotions, setPromotions] = useState<PromotionDTO[]>([]);
  const [promotionCounters, setPromotionCounters] = useState<
    PromotionCounterDTO[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserNotFound, setIsUserNotFound] = useState(false);

  const { user, webApp, isReady, topInset, bottomInset } = useTelegram();
  const customerName = user?.first_name || "Користувач";
  const photoUrl = user?.photo_url;
  const chatId = user?.id;

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
        const [userResponse, promotionsResponse, countersResponse] =
          await Promise.all([
            tsymborApi.getUserInfo(Number(chatId)),
            tsymborApi.getActivePromotions(),
            tsymborApi.getActivePromotionCounters(),
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
        setPromotionCounters(countersResponse);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setIsUserNotFound(true);
      } finally {
        // Задержка для отработки анимации выхода
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    loadData();
  }, [chatId, isReady]);

  const handlePromotionClick = (promotion: PromotionDTO) => {
    setSelectedPromotion(promotion);
    setShowPromotion(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <>
      {/* Background Layer - Единый для всех состояний */}
      <div className="fixed inset-0 bg-blue-800">
        <LiquidEther
          isViscous={true}
          viscous={isLoading ? 100 : 40}
          autoDemo={true}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="min-h-screen fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))",
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: 180,
                filter: "drop-shadow(0 0px 0px rgba(0, 0, 0, 0)) blur(10px)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
            >
              <motion.img
                src="/logo.png"
                alt="Loading..."
                className="w-32 h-32 object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 10px rgba(255,255,255,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(0 0 40px rgba(255,255,255,0.2)) drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Auth Required Dialog */}
      {isUserNotFound && !isLoading && <AuthRequiredDialog open={true} />}

      {/* Main Content */}
      {!isLoading && !isUserNotFound && (
        <div
          className="relative min-h-screen overflow-y-auto"
          style={{
            paddingTop: `${topInset}px`,
            paddingBottom: `${Math.max(bottomInset, 48)}px`,
          }}
        >
          <AnimatedContent
            distance={80}
            direction="vertical"
            duration={0.6}
            ease="power3.out"
            initialOpacity={0}
            scale={0.97}
            delay={0.2}
          >
            <AnimatedGroup
              className="max-w-md mx-auto space-y-3"
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
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
                      stiffness: 350,
                      damping: 25,
                      duration: 0.1,
                    },
                  },
                },
              }}
            >
              {/* Info Card */}
              <div key="info-card">
                <InfoCardButton
                  onClick={() => setShowInfoCard(true)}
                  id={infoCardId}
                  customerName={customerName}
                  photoUrl={photoUrl}
                />
              </div>

              {/* Barcode Card с данными из API */}
              <div key="barcode-card">
                <BarcodeCard
                  balance={userInfo?.balance || 0}
                  freeCoffeeCount={userInfo?.freeCoffeeCount || 0}
                  barcodeValue={userInfo?.barcode || ""}
                  coffeeTillFree={userInfo?.coffeeTillFree || 0}
                  promotionCounters={promotionCounters}
                />
              </div>

              {/* Promotions с данными из API */}
              <div key="promotions">
                <PromotionsCarousel
                  promotions={[...promotions].reverse()}
                  onPromotionClick={handlePromotionClick}
                />
              </div>

              {/* Rules Button */}
              <div key="rules-button">
                <RulesButton onClick={() => setShowRules(true)} id={rulesId} />
              </div>

              {/* Footer */}
              <div key="footer" className="text-center py-4">
                <p className="font-mono text-xs text-white/50">v0.0.1</p>
              </div>
            </AnimatedGroup>
          </AnimatedContent>
        </div>
      )}

      {/* Dialogs */}
      <RulesDialog open={showRules} onOpenChange={setShowRules} id={rulesId} />

      <InfoCardDialog
        open={showInfoCard}
        onOpenChange={setShowInfoCard}
        id={infoCardId}
        customerName={customerName}
        photoUrl={photoUrl}
      />

      <PromotionDialog
        open={showPromotion}
        onOpenChange={setShowPromotion}
        promotion={selectedPromotion}
        formatDate={formatDate}
      />
    </>
  );
};

export default StoreApp;
