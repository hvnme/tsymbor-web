import { motion } from "framer-motion";
import { Scan, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScanningDialogsProps {
  showError: boolean;
  setShowError: (show: boolean) => void;
  isProcessing: boolean;
  scannedCode: string | null;
  spinningNumbers: number[];
  showResult: boolean;
  setShowResult: (show: boolean) => void;
  finalNumber: string;
  showCloseButton: boolean;
}

export function ScanningDialogs({
  showError,
  setShowError,
  isProcessing,
  scannedCode = "ABC123XYZ789",
  spinningNumbers = [1, 2, 3, 4, 5, 6],
  showResult,
  setShowResult,
  finalNumber = "123456",
  showCloseButton = false,
}: ScanningDialogsProps) {
  // Проверяем, является ли номер выигрышным
  const isWinning = finalNumber === "27";

  return (
    <>
      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="bg-black/15 backdrop-blur-md border border-white/5 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <div className="w-16 h-16 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </motion.div>
              <span className="text-white font-semibold">Помилка</span>
            </DialogTitle>
          </DialogHeader>
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-white/80">
              QR-код уже використовувся або недійсний
            </div>
            <div className="bg-black/10 rounded-xl p-4 border border-white/5">
              <div className="text-white/90 text-sm">
                Спробуйте знайти інший QR-код Лабубу
              </div>
            </div>

            {/* Кнопка "Закрити" с задержкой появления */}
            {showCloseButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.5,
                }}
                className="mt-4"
              >
                <button
                  onClick={() => setShowError(false)}
                  className="w-full py-3 px-4 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md border border-red-400/30 rounded-lg text-white font-semibold text-sm transition-all duration-200"
                >
                  Закрити
                </button>
              </motion.div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Processing Dialog */}
      <Dialog open={isProcessing} onOpenChange={() => {}}>
        <DialogContent className="bg-black/15 backdrop-blur-md border border-white/5 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Scan className="w-8 h-8 text-blue-400" />
                  </motion.div>
                </div>
              </motion.div>
              <span className="text-white font-semibold">Обробка коду</span>
            </DialogTitle>
          </DialogHeader>
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="bg-black/10 rounded-xl p-4 border border-white/5"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-sm text-white/60 mb-2">
                Відсканований код:
              </div>
              <div className="font-mono font-bold text-lg text-white">
                {scannedCode}
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-lg font-medium text-white">
                Генерація номера...
              </div>
              <div className="flex justify-center space-x-2">
                {spinningNumbers.map((digit, i) => (
                  <motion.div
                    key={`${i}-${digit}`}
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className="w-10 h-12 bg-black/10 border border-white/10 rounded-lg flex items-center justify-center font-mono font-bold text-xl text-white"
                  >
                    <motion.span
                      key={digit}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {digit}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  className="h-full bg-blue-400 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-black/15 backdrop-blur-md border border-white/5 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              >
                <div
                  className={`w-16 h-16 backdrop-blur-sm rounded-full flex items-center justify-center ${
                    isWinning
                      ? "bg-green-500/20 border border-green-400/30"
                      : "bg-orange-500/20 border border-orange-400/30"
                  }`}
                >
                  {isWinning ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-orange-400" />
                  )}
                </div>
              </motion.div>
              <span className="text-white font-semibold">
                {isWinning ? "Перемога!" : "Упс..."}
              </span>
            </DialogTitle>
          </DialogHeader>
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Показываем номер */}
            <motion.div
              className="text-lg font-medium text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Твій номер:
            </motion.div>
            <div className="flex justify-center space-x-2">
              {finalNumber.split("").map((digit, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: i * 0.2,
                  }}
                  className="w-10 h-12 bg-black/10 border border-white/10 rounded-lg flex items-center justify-center font-mono font-bold text-xl text-white"
                >
                  {digit}
                </motion.div>
              ))}
            </div>

            {/* Сообщение о результате */}
            <motion.div
              className={`rounded-xl p-4 border ${
                isWinning
                  ? "bg-green-500/10 border-green-400/20"
                  : "bg-orange-500/10 border-orange-400/20"
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div
                className={`text-sm font-medium ${
                  isWinning ? "text-green-400" : "text-orange-400"
                }`}
              >
                {isWinning ? (
                  <>
                    🎉 Вітаємо! Ти виграв Лабубу! <br />
                    Новий пухнастий друг вже чекає на тебе! 🧸✨
                  </>
                ) : (
                  <>
                    😢 Упс… Лабубу поки що не твій. <br />
                    Але він вірить у тебе — спробуй ще раз! 💫
                  </>
                )}
              </div>
            </motion.div>

            {/* Кнопка "Закрити" с задержкой появления */}
            {showCloseButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.5,
                }}
                className="mt-6"
              >
                <button
                  onClick={() => setShowResult(false)}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white font-semibold text-sm transition-all duration-200"
                >
                  Закрити
                </button>
              </motion.div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
