import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "@/hooks/useTelegram";
import { motion } from "motion/react";

interface InfoCardButtonProps {
  onClick: () => void;
  id: string;
  customerName: string;
  photoUrl?: string;
}

export function InfoCardButton({
  onClick,
  id,
  customerName,
  photoUrl,
}: InfoCardButtonProps) {
  const { webApp } = useTelegram();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Добрий день";
    return "Добрий вечір ";
  };

  const handleClick = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    onClick();
  };

  return (
    <motion.div
      layoutId={`info-card-${id}`}
      onClick={handleClick}
      className="cursor-pointer"
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        bounce: 0.01,
        damping: 35,
        stiffness: 350,
      }}
    >
      <Card className="bg-black/20 mx-3 backdrop-blur-md border shadow-inner border-white/15 shadow-2xl">
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <motion.div layoutId={`info-avatar-${id}`} className="relative">
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
                className="font-semibold text-lg text-white"
              >
                {getGreeting()}, {customerName || "Користувач"}!
              </motion.h2>
              <motion.p
                layoutId={`info-description-${id}`}
                className="font-medium text-sm text-white/60 mt-0"
              >
                Учасник програми лояльності
              </motion.p>
            </div>
            <div className="text-white/50">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
