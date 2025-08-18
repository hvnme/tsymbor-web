import { Card, CardContent } from "@/components/ui/card";
import { Tilt } from "@/components/ui/tilt";

interface InfoCardProps {
  customerName: string;
  photoUrl?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ customerName, photoUrl }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Добрий день";
    return "Добрий вечір ";
  };

  return (
    <Tilt
      rotationFactor={15}
      isRevese={true}
      springOptions={{ stiffness: 200, damping: 30 }}
    >
      <Card className="bg-black/12і backdrop-blur-md border shadow-inner border-white/5 shadow-xl  mt-18">
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-14 h-14 bg-black/20 rounded-xl flex items-center justify-center text-white  text-xl shadow-inner border border-white/5 overflow-hidden">
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
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-white">
                {getGreeting()}, {customerName || "Користувач"}!
              </h2>
              <p className="font-medium text-sm text-white/50 mt-0">
                Учасник програми лояльності
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tilt>
  );
};

export default InfoCard;
