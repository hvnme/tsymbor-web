import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Coffee } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import CoffeeProgress from "./CoffeeProgress";
import { GlowEffect } from "@/components/ui/glow-effect";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface BarcodeCardProps {
  balance: number;
  freeCoffeeCount: number;
  vtmAmount: number;
  labubuAmount: number;
  barcodeValue: string;
  coffeeTillFree: number;
}

const BarcodeCard: React.FC<BarcodeCardProps> = ({
  barcodeValue,
  balance,
  vtmAmount,
  labubuAmount,
  freeCoffeeCount,
  coffeeTillFree,
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
        <Card className="bg-black/15 backdrop-blur-md border border-white/5 shadow-xl ">
          <CardContent className="p-3">
            <div className="relative mb-4">
              <GlowEffect
                className="rounded-xl"
                colors={["#1E293B", "#7C3AED", "#F59E0B", "#EF4444"]}
                mode="colorShift"
                blur="strong"
                duration={7}
              />

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
              {/* Баланс */}
              <motion.div
                className="bg-black/10 rounded-xl p-3 border border-white/5 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-white/90" />
                  <span className="text-sm text-white/40 font-medium">
                    Баланс
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white">
                  {balance?.toFixed(2) || "0.00"} ₴
                </div>
              </motion.div>

              {/* Безкоштовна кава */}
              <motion.div
                className="bg-black/10 rounded-xl p-3 border border-white/5 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coffee className="w-4 h-4 text-white/90" />
                  <span className="text-sm text-white/40 font-medium">
                    Кава
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white flex items-center justify-center gap-1">
                  <span>{freeCoffeeCount || 0}</span>
                  <span className="font-medium text-sm">шт</span>
                </div>
              </motion.div>

              {/* vtm */}
              <motion.div
                className="bg-black/10 rounded-xl p-3 border border-white/5 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-white/90" />
                  <span className="text-sm text-white/40 font-medium">
                    Акція "Lays"
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white">
                  <span>{vtmAmount || 0}</span>
                  <span className="font-medium text-sm">чеків</span>
                </div>
              </motion.div>

              {/* labubu */}
              <motion.div
                className="bg-black/10 rounded-xl p-3 border border-white/5 text-center shadow-xl cursor-pointer"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => impactOccurred("light")}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coffee className="w-4 h-4 text-white/90" />
                  <span className="text-sm text-white/40 font-medium">
                    Акція "Labubu"
                  </span>
                </div>
                <div className="font-extrabold text-xl text-white flex items-center justify-center gap-1">
                  <span>{labubuAmount || 0}</span>
                  <span className="font-medium text-sm">шансів</span>
                </div>
              </motion.div>
            </motion.div>

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
