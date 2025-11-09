import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTelegram } from "@/hooks/useTelegram";
import { Icon } from "@iconify/react";
import { HapticButton } from "@/components/ui/haptic-button";

interface InfoCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  customerName: string;
  photoUrl?: string;
}

export function InfoCardDialog({
  open,
  onOpenChange,
  id,
  customerName,
  photoUrl,
}: InfoCardDialogProps) {
  const { webApp } = useTelegram();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Добрий день";
    return "Добрий вечір ";
  };

  const handleClose = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 pointer-events-none">
            <motion.div
              layoutId={`info-card-${id}`}
              className="bg-black/30 backdrop-blur-2xl border border-white/15 shadow-xl rounded-xl w-full max-w-2xl pointer-events-auto flex flex-col max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
              transition={{
                type: "spring",
                bounce: 0.01,
                damping: 25,
                stiffness: 350,
              }}
            >
              {/* Header */}
              <div className="bg-black/80 backdrop-blur-2xl border-b border-white/10 p-3 rounded-t-xl flex-shrink-0">
                <div className="flex items-center gap-3">
                  <motion.div
                    layoutId={`info-avatar-${id}`}
                    className="relative flex-shrink-0"
                  >
                    <div className="w-14 h-14 bg-black/20 rounded-xl flex items-center justify-center text-white text-xl shadow-inner border border-white/15 overflow-hidden">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={customerName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        customerName?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h2
                      layoutId={`info-greeting-${id}`}
                      className="font-bold text-lg text-white"
                    >
                      {getGreeting()}, {customerName || "Користувач"}!
                    </motion.h2>
                    <motion.p
                      layoutId={`info-description-${id}`}
                      className="text-white/70 text-sm"
                    >
                      Учасник програми лояльності
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 overflow-y-auto">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-10" />
                <div className="p-3 space-y-4 text-white/90 text-xs leading-relaxed">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Переваги програми лояльності Цімбор
                    </h3>
                    <p className="text-sm text-white/70">
                      Ваш крок до ще більших переваг від покупок
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:card-bold"
                          className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-blue-200 block mb-1">
                            Отримуй 0,5% на бонусний рахунок
                          </strong>
                          <span className="text-xs text-blue-200/80">
                            Від кожної покупки, здійсненої в ТМ "ЗІНА", "КЕФІР"
                            або "1MINUTE". За кожну вашу покупку ми нараховуємо
                            0,5% бонусних балів.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:cart-large-2-bold"
                          className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-purple-200 block mb-1">
                            Роби покупки від 1200 грн
                          </strong>
                          <span className="text-xs text-purple-200/80">
                            Та отримуй додатково +0,5%. Купуючи на суму від 1200
                            грн, ви отримуєте додаткові бонуси.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:users-group-rounded-bold"
                          className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-green-200 block mb-1">
                            Користуйся перевагами всією сім'єю
                          </strong>
                          <span className="text-xs text-green-200/80">
                            Просто назви номер телефону члена сім'ї, на якого
                            зареєстровано картку.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:tag-bold"
                          className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-orange-200 block mb-1">
                            Спеціальна акційна ціна
                          </strong>
                          <span className="text-xs text-orange-200/80">
                            Саме для власників Цімбора. Спеціальні ціни доступні
                            лише для вас.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:wallet-bold"
                          className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-yellow-200 block mb-1">
                            Послуга «Сейф»
                          </strong>
                          <span className="text-xs text-yellow-200/80">
                            Дрібну решту ми нараховуємо на картку, не треба
                            носити з собою дрібні монети!
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:card-bold"
                          className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-red-200 block mb-1">
                            Розрахунок бонусами
                          </strong>
                          <span className="text-xs text-red-200/80">
                            На касі накопиченими бонусами.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:letter-bold"
                          className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-cyan-200 block mb-1">
                            Спеціальні пропозиції
                          </strong>
                          <span className="text-xs text-cyan-200/80">
                            Та перші повідомлення про акції.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          icon="solar:chart-2-bold"
                          className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <strong className="text-base text-indigo-200 block mb-1">
                            Особистий кабінет
                          </strong>
                          <span className="text-xs text-indigo-200/80">
                            З історією покупок та використаних бонусів.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3 justify-center">
                      <Icon
                        icon="solar:confetti-bold"
                        className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5"
                      />
                      <div className="text-center">
                        <strong className="text-base text-orange-100 block mb-1">
                          Ласкаво просимо!
                        </strong>
                        <span className="text-xs text-orange-100/80">
                          Ви берете участь у програмі, яка робить ваші покупки
                          вигіднішими!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-10" />
              </div>

              {/* Close Button */}
              <div className="p-3 flex-shrink-0">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <HapticButton
                    hapticType="light"
                    onClick={handleClose}
                    className="h-12 w-full bg-black/20 hover:bg-black/30 text-white border border-white/10 backdrop-blur-md font-medium"
                  >
                    Повернутися
                  </HapticButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
