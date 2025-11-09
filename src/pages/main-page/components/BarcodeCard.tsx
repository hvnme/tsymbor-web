import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Tilt } from "@/components/ui/tilt";
import CoffeeProgress from "./CoffeeProgress";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import type { PromotionCounterDTO } from "@/api/tsymborApi";

interface BarcodeCardProps {
  balance: number;
  freeCoffeeCount: number;
  barcodeValue: string;
  coffeeTillFree: number;
  promotionCounters?: PromotionCounterDTO[];
}

const BarcodeCard: React.FC<BarcodeCardProps> = ({
  barcodeValue,
  balance,
  freeCoffeeCount,
  coffeeTillFree,
  promotionCounters = [],
}) => {
  const [barcodeLoaded, setBarcodeLoaded] = useState(false);
  const [normalizedValue, setNormalizedValue] = useState("");
  const { impactOccurred } = useHapticFeedback();

  useEffect(() => {
    if (barcodeValue) {
      const normalized = barcodeValue
        .replace(/\D/g, "")
        .padStart(12, "0")
        .slice(0, 12);
      setNormalizedValue(normalized);

      setTimeout(() => {
        setBarcodeLoaded(true);
      }, 200);
    } else {
      setBarcodeLoaded(false);
      setNormalizedValue("");
    }
  }, [barcodeValue]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <Tilt
        rotationFactor={10}
        isRevese={true}
        springOptions={{ stiffness: 200, damping: 30 }}
      >
        <Card className="bg-black/30 backdrop-blur-3xl border border-white/15 shadow-xl mx-3">
          <CardContent className="p-3">
            <div className="relative mb-4">
              <div className="relative z-10 bg-gradient-to-b from-gray-50 to-white/90 rounded-xl  overflow-hidden shadow-xl">
                {normalizedValue && barcodeLoaded ? (
                  <div className="flex justify-center items-center">
                    <Barcode
                      value={normalizedValue}
                      format="EAN13"
                      width={2.5}
                      height={80}
                      displayValue={false}
                      background="transparent"
                      lineColor="#1a1a1a"
                      margin={8}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-500 h-24">
                    <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    <span className="font-medium text-base">
                      Генерація EAN-13...
                    </span>
                  </div>
                )}
              </div>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-2 mb-3"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="bg-black/20 rounded-xl p-3 border border-white/15 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon
                    icon="solar:wallet-bold"
                    className="w-4 h-4 text-white/90"
                  />
                  <span className="text-sm text-white/50 font-medium">
                    Баланс
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white">
                  {balance?.toFixed(2) || "0.00"} ₴
                </div>
              </motion.div>

              <motion.div
                className="bg-black/20 rounded-xl p-3 border border-white/15 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon
                    icon="solar:cup-hot-bold"
                    className="w-4 h-4 text-white/90"
                  />
                  <span className="text-sm text-white/50 font-medium">
                    Кава
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white flex items-center justify-center gap-1">
                  <span>{freeCoffeeCount || 0}</span>
                  <span className="font-medium text-sm">шт</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Promo counters grid */}
            {promotionCounters.length > 0 && (
              <motion.div
                className="grid grid-cols-2 gap-2 mb-3"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {promotionCounters.map((counter, idx) => (
                  <motion.div
                    key={counter.nameCounter ?? idx}
                    className="bg-black/20 rounded-xl p-3 border border-white/15 text-center shadow-xl cursor-pointer"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onTap={() => impactOccurred("light")}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="text-xs text-white/50 font-medium mb-1 line-clamp-2">
                      {counter.nameCounter}
                    </div>
                    <div className="font-extrabold text-xl text-white flex items-center justify-center gap-1">
                      <span>{counter.valueCounter || 0}</span>
                      <span className="font-medium text-sm">шт</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CoffeeProgress coffeeTillFree={coffeeTillFree} />
            </motion.div>
          </CardContent>
        </Card>
      </Tilt>
    </div>
  );
};

export default BarcodeCard;
