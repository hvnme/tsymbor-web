// components/RulesButton.tsx
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTelegram } from "@/hooks/useTelegram";

interface RulesButtonProps {
  onClick: () => void;
}

export function RulesButton({ onClick }: RulesButtonProps) {
  const { webApp } = useTelegram();

  const handleClick = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    onClick();
  };

  return (
    <Card className="bg-black/10 backdrop-blur-md border border-white/12 shadow-xl">
      <CardContent className="p-0">
        <button
          onClick={handleClick}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-lg">
                Правила програми
              </h3>
              <p className="text-white/70 text-sm">
                Дізнайтеся про умови участі
              </p>
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
        </button>
      </CardContent>
    </Card>
  );
}
