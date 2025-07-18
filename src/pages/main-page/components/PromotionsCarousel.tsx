import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

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

const PromotionsCarousel: React.FC<PromotionsCarouselProps> = ({ promotions }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long'
        });
    };

    const getPromotionTitle = (text: string) => {
        const words = text.split(' ');
        if (words.length > 8) {
            return words.slice(0, 8).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="space-y-3">
            <h2 className="font-semibold text-xl text-white px-2">Акції та пропозиції</h2>

            <div className="relative">
                <div
                    className="flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {promotions.map((promo) => {
                        const title = getPromotionTitle(promo.text);

                        return (
                            <Dialog key={promo.id}>
                                <DialogTrigger asChild>
                                    <div className="group relative flex-shrink-0 w-80 h-48 overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl snap-center bg-white/15 backdrop-blur-md border border-white/30">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={promo.image}
                                                alt="Акція"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex h-full flex-col justify-between p-5">
                                            {/* Top - Sparkles icon */}
                                            <div className="flex justify-end">
                                                <div className="bg-white/30 backdrop-blur-md rounded-full p-3 border border-white/50">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                            </div>

                                            {/* Bottom Content */}
                                            <div className="space-y-3">
                                                <h3 className="font-extrabold text-xl text-white leading-tight line-clamp-3">
                                                    {title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-semibold text-sm">
                                                        {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent className="max-w-sm mx-auto max-h-[85vh] overflow-hidden bg-white/15 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl">
                                    <div className="relative z-10 overflow-y-auto max-h-[85vh] custom-scrollbar">
                                        <DialogHeader className="space-y-4 pb-4">
                                            <div className="relative w-full h-52 overflow-hidden rounded-xl shadow-xl border border-white/40">
                                                <img
                                                    src={promo.image}
                                                    alt="Акція"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                                {/* Sparkles icon in image */}
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-white/40 backdrop-blur-md rounded-full p-3 border border-white/60">
                                                        <Sparkles className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <DialogTitle className="font-extrabold text-2xl text-white leading-tight">
                                                    Деталі акції
                                                </DialogTitle>

                                                <div className="bg-white/30 backdrop-blur-md rounded-lg p-4 border border-white/50">
                                                    <div className="flex items-center gap-2 text-white">
                                                        <Clock className="w-5 h-5" />
                                                        <span className="font-semibold text-base">
                                                            {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogHeader>

                                        <div className="space-y-6 pb-4">
                                            <div className="bg-white/25 backdrop-blur-md rounded-xl p-5 border border-white/50">
                                                <p className="font-semibold text-base leading-relaxed text-white">
                                                    {promo.text}
                                                </p>
                                            </div>

                                            {/* Return Button */}
                                            <div className="flex justify-center">
                                                <DialogClose asChild>
                                                    <Button
                                                        size="lg"
                                                        className="w-full bg-white/30 hover:bg-white/40 text-white border border-white/60 backdrop-blur-md font-semibold transition-all duration-300 hover:scale-[1.02]"
                                                    >
                                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                                        Повернутися
                                                    </Button>
                                                </DialogClose>
                                            </div>
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
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
        </div>
    );
};

export default PromotionsCarousel;