// components/RulesButton.tsx
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "@/hooks/useTelegram";
import { motion } from "motion/react";

interface RulesButtonProps {
  onClick: () => void;
  id: string;
}

export function RulesButton({ onClick, id }: RulesButtonProps) {
  const { webApp } = useTelegram();

  const handleClick = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    onClick();
  };

  return (
    <motion.div
      layoutId={`rules-card-${id}`}
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
      <Card className="bg-black/30 backdrop-blur-3xl mx-3 border border-white/15 shadow-xl">
        <CardContent className="p-0">
          <div className="w-full p-3 flex items-center justify-between transition-colors rounded-lg">
            <div className="flex items-center space-x-3">
              <motion.div
                layoutId={`rules-icon-${id}`}
                className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="solar:document-text-bold"
                  className="w-5 h-5 text-orange-400"
                />
              </motion.div>
              <div className="text-left">
                <motion.h3
                  layoutId={`rules-title-${id}`}
                  className="font-semibold text-white text-lg"
                >
                  Правила програми
                </motion.h3>
                <motion.p
                  layoutId={`rules-description-${id}`}
                  className="text-white/70 text-sm"
                >
                  Дізнайтеся про умови участі
                </motion.p>
              </div>
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
