import React from "react";
import { HapticButton } from "@/components/ui/haptic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "@/hooks/useTelegram";

interface Promotion {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  text: string;
}

interface PromotionsCarouselProps {
  promotions: Promotion[];
}

const PromotionsCarousel: React.FC<PromotionsCarouselProps> = ({
  promotions = [], // Default to an empty array if no promotions are provided
}) => {
  const { webApp } = useTelegram();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl text-white px-2">
        Акції та пропозиції
      </h2>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-hide snap-x snap-mandatory">
          {promotions.map((promo, index) => {
            const title = promo.text;

            return (
              <Dialog key={promo.id}>
                <DialogTrigger asChild>
                  <motion.div
                    className="flex-shrink-0 w-80 cursor-pointer snap-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      webApp?.HapticFeedback?.impactOccurred("light")
                    }
                  >
                    <Card className="bg-black/15 backdrop-blur-md border border-white/5 shadow-md overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={promo.image}
                          alt="Акція"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 " />
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-white mb-3  leading-tight">
                          {title}
                        </h3>

                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {formatDate(promo.startDate)} -{" "}
                            {formatDate(promo.endDate)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="bg-black/15 backdrop-blur-md border border-white/5  p-0">
                  <div className="h-full flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4">
                      <img
                        src={promo.image}
                        alt="Акція"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='16' fill='%23374151' text-anchor='middle' dy='.3em'%3EЗображення недоступне%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    <div className="flex-shrink-0 p-3 space-y-4">
                      <h3 className="text-md font-semibold text-white">
                        {promo.text}
                      </h3>

                      <div className="flex items-center gap-3 text-white/90">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">
                          {formatDate(promo.startDate)} -{" "}
                          {formatDate(promo.endDate)}
                        </span>
                      </div>

                      <DialogClose asChild>
                        <HapticButton
                          hapticType="light"
                          className="h-12 w-full bg-black/20 hover:bg-black/30 text-white border border-white/10 backdrop-blur-md font-medium -mb-2"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Повернутися
                        </HapticButton>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PromotionsCarousel;
