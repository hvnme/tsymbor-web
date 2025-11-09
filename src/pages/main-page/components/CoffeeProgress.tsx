import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

interface CoffeeProgressProps {
  coffeeTillFree: number;
  maxCoffee?: number;
}

const CoffeeProgress: React.FC<CoffeeProgressProps> = ({
  coffeeTillFree,
  maxCoffee = 10,
}) => {
  return (
    <Card className="bg-black/20 rounded-xl p-1 border border-white/15 text-center shadow-2xl transition-colors duration-300">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Icon icon="solar:cup-hot-bold" className="w-4 h-4 text-white" />
            <span className="font-semibold text-m text-white">
              До безкоштовної кави
            </span>
          </div>
          <Badge className="bg-black/20 text-white border-white/15 font-semibold">
            {10 - coffeeTillFree + 1} / {maxCoffee}
          </Badge>
        </div>

        <div className="space-y-1">
          <Progress
            value={(coffeeTillFree / maxCoffee) * 100}
            className="h-2 bg-white/40 [&>*]:bg-white rounded-full"
          />
          <p className=" text-sm text-white/70 text-center">
            Залишилось купити {10 - coffeeTillFree} кави
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoffeeProgress;
