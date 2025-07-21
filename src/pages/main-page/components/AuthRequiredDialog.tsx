import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTelegram } from "@/hooks/useTelegram";

interface AuthRequiredDialogProps {
  open: boolean;
}

export function AuthRequiredDialog({ open }: AuthRequiredDialogProps) {
  const { webApp } = useTelegram();

  const handleRefresh = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
    window.location.reload();
  };

  const handleOpenBot = () => {
    webApp?.HapticFeedback?.impactOccurred("medium");
    window.open("https://t.me/tsymbor_bot", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="bg-black/15 backdrop-blur-md border border-white/15 shadow-xl  mx-auto">
        <div className="text-center space-y-6 p-4">
          <div className="space-y-2">
            <h2 className="font-bold text-xl text-white">
              Потрібна авторизація!
            </h2>
            <p className="text-white/70 text-sm">
              Користувач не знайдений в системі. Необхідно зареєструватись через
              офіційний Telegram бот
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
              <p className="text-xs text-orange-200">
                💡 <strong>Як зареєструватись:</strong>
                <br />
                1. Перейдіть в офіційний бот
                <br />
                2. Зареєструйтесь в програмі лояльності
                <br />
                3. Поверніться сюди та оновіть сторінку
              </p>
            </div>

            <button
              onClick={handleOpenBot}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-white font-semibold text-sm"
            >
              Відкрити Telegram бот
            </button>

            <button
              onClick={handleRefresh}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg text-white font-semibold text-sm"
            >
              Оновити сторінку
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
