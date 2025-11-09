import React from "react";
import { PromotionCard } from "./PromotionCard";

interface Promotion {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  text: string;
}

interface PromotionsCarouselProps {
  promotions: Promotion[];
  onPromotionClick: (promotion: Promotion) => void;
}

const PromotionsCarousel: React.FC<PromotionsCarouselProps> = ({
  promotions = [],
  onPromotionClick,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-2">
      <h2 className="font-semibold px-3 text-xl text-white">
        Акції та пропозиції
      </h2>

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto px-3 scrollbar-hide snap-x snap-mandatory">
          {promotions.map((promo, index) => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              onClick={() => onPromotionClick(promo)}
              index={index}
              formatDate={formatDate}
            />
          ))}
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
