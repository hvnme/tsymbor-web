import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { HapticButton } from "@/components/ui/haptic-button";
import { useTelegram } from "@/hooks/useTelegram";

interface Promotion {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  text: string;
}

interface PromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  formatDate: (dateString: string) => string;
}

export function PromotionDialog({
  open,
  onOpenChange,
  promotion,
  formatDate,
}: PromotionDialogProps) {
  const { webApp } = useTelegram();

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

  if (!promotion) return null;

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
              layoutId={`promo-card-${promotion.id}`}
              className="bg-black/15 backdrop-blur-md border border-white/5 rounded-xl w-full max-w-md pointer-events-auto flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              transition={{
                type: "spring",
                bounce: 0.01,
                damping: 25,
                stiffness: 350,
              }}
            >
              <div className="relative flex-1 overflow-y-auto">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/15 to-transparent pointer-events-none z-10" />
                <div className="flex items-center justify-center p-3">
                  <motion.img
                    layoutId={`promo-image-${promotion.id}`}
                    src={promotion.image}
                    alt="Акція"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='16' fill='%23374151' text-anchor='middle' dy='.3em'%3EЗображення недоступне%3C/text%3E%3C/svg%3E";
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.01,
                      damping: 25,
                      stiffness: 350,
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/15 to-transparent pointer-events-none z-10" />
              </div>

              <div className="flex-shrink-0 p-3 space-y-4">
                <motion.h3
                  layoutId={`promo-title-${promotion.id}`}
                  className="text-md font-semibold text-white"
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    damping: 25,
                    stiffness: 350,
                  }}
                >
                  {promotion.text}
                </motion.h3>

                <motion.div
                  layoutId={`promo-date-${promotion.id}`}
                  className="flex items-center gap-3 text-white/90"
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    damping: 25,
                    stiffness: 350,
                  }}
                >
                  <Icon icon="solar:clock-circle-bold" className="w-5 h-5" />
                  <span className="font-medium">
                    {formatDate(promotion.startDate)} -{" "}
                    {formatDate(promotion.endDate)}
                  </span>
                </motion.div>

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
