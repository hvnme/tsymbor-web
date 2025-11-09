import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "@/hooks/useTelegram";
import { motion } from "framer-motion";

interface Promotion {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  text: string;
}

interface PromotionCardProps {
  promotion: Promotion;
  onClick: () => void;
  index: number;
  formatDate: (dateString: string) => string;
}

export function PromotionCard({
  promotion,
  onClick,
  index,
  formatDate,
}: PromotionCardProps) {
  const { webApp } = useTelegram();

  const handleClick = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    onClick();
  };

  return (
    <motion.div
      className="flex-shrink-0 w-80 cursor-pointer snap-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
    >
      <motion.div
        layoutId={`promo-card-${promotion.id}`}
        transition={{
          type: "spring",
          bounce: 0.01,
          damping: 35,
          stiffness: 350,
        }}
      >
        <Card className="bg-black/30 backdrop-blur-3xl border border-white/5 shadow-md overflow-hidden">
          <div className="relative overflow-hidden">
            <motion.img
              layoutId={`promo-image-${promotion.id}`}
              src={promotion.image}
              alt="Акція"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
          </div>

          <CardContent className="p-3">
            <motion.h3
              layoutId={`promo-title-${promotion.id}`}
              className="font-semibold text-lg text-white mb-3 leading-tight"
            >
              {promotion.text}
            </motion.h3>

            <motion.div
              layoutId={`promo-date-${promotion.id}`}
              className="flex items-center gap-2 text-white/70"
            >
              <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatDate(promotion.startDate)} -{" "}
                {formatDate(promotion.endDate)}
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
