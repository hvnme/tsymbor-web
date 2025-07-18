import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTelegram } from '@/hooks/useTelegram';
import { Scan, CheckCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BarcodeCard from '@/pages/main-page/components/BarcodeCard';
import PromotionsCarousel from '@/pages/main-page/components/PromotionsCarousel';
import InfoCard from '@/pages/main-page/components/InfoCard';
import { GlowEffect } from '@/components/ui/glow-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';

const StoreApp = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isScanning, setIsScanning] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [finalNumber, setFinalNumber] = useState<string>('');
    const [showResult, setShowResult] = useState(false);
    const [showError, setShowError] = useState(false);
    const [spinningNumbers, setSpinningNumbers] = useState<number[]>([0, 0, 0]);
    const coffeeTillFree = 7;

    const { user, webApp } = useTelegram();
    const customerName = user?.first_name || 'Користувач';
    const photoUrl = user?.photo_url;

    const scanQR = async () => {
        if (!webApp) {
            alert('Telegram WebApp недоступний');
            return;
        }

        setIsScanning(true);

        try {
            webApp.showScanQrPopup(
                { text: 'Відскануйте QR-код або штрих-код' },
                (scannedText) => {
                    setIsScanning(false);
                    if (scannedText) {
                        webApp.closeScanQrPopup();

                        if (!scannedText.startsWith('QR')) {
                            webApp.HapticFeedback?.notificationOccurred('error');
                            setShowError(true);

                            setTimeout(() => {
                                setShowError(false);
                            }, 3000);

                            return;
                        }

                        webApp.HapticFeedback?.notificationOccurred('success');

                        setScannedCode(scannedText);
                        setIsProcessing(true);

                        let vibrationCount = 0;
                        const interval = setInterval(() => {
                            setSpinningNumbers([
                                Math.floor(Math.random() * 10),
                                Math.floor(Math.random() * 10),
                                Math.floor(Math.random() * 10)
                            ]);

                            vibrationCount++;
                            if (vibrationCount <= 10) {
                                webApp.HapticFeedback?.impactOccurred('light');
                            } else if (vibrationCount <= 25) {
                                webApp.HapticFeedback?.impactOccurred('medium');
                            } else if (vibrationCount <= 35) {
                                webApp.HapticFeedback?.impactOccurred('heavy');
                            } else {
                                webApp.HapticFeedback?.impactOccurred('rigid');
                            }
                        }, 100);

                        const randomNumber = Math.floor(Math.random() * 900 + 100).toString();

                        setTimeout(() => {
                            clearInterval(interval);
                            webApp.HapticFeedback?.impactOccurred('heavy');
                            setTimeout(() => webApp.HapticFeedback?.notificationOccurred('success'), 200);

                            setIsProcessing(false);
                            setFinalNumber(randomNumber);
                            setShowResult(true);

                            setTimeout(() => {
                                setShowResult(false);
                                setScannedCode(null);
                                setFinalNumber('');
                            }, 3000);
                        }, 4000);

                        console.log('Відсканований QR/штрих-код:', scannedText);
                    } else {
                        webApp.HapticFeedback?.notificationOccurred('error');
                    }
                }
            );
        } catch (error) {
            setIsScanning(false);
            webApp.HapticFeedback?.notificationOccurred('error');
            console.error('Помилка сканування:', error);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const promotions = [
        {
            id: 1,
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop',
            text: 'Отримайте знижку 25% на всі молочні продукти в нашому магазині! Пропозиція включає молоко, йогурти, сири, масло та інші молочні вироби. Знижка діє з понеділка по неділю до кінця поточного тижня. Не пропустіть можливість заощадити на своїх улюблених продуктах!'
        },
        {
            id: 2,
            startDate: '2025-01-02',
            endDate: '2025-01-02',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
            text: 'Спеціальна пропозиція дня! При покупці товарів на суму від 200 гривень ви отримуєте безкоштовну каву на вибір. У нас є еспресо, американо, капучино та латте. Пропозиція діє тільки сьогодні, поспішайте скористатися цією чудовою можливістю!'
        },
        {
            id: 3,
            startDate: '2025-01-04',
            endDate: '2025-01-05',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
            text: 'У суботу та неділю ви отримуєте подвійні бонусні бали за всі покупки! Це означає, що ваші накопичення збільшуються вдвічі швидше. Бали можна використовувати для отримання знижок на майбутні покупки або обміняти на безкоштовні товари.'
        },
        {
            id: 4,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop',
            text: 'Спеціальна нічна акція! Після 22:00 всі готові страви, сендвічі та салати зі знижкою 30%. Ідеально для тих, хто працює допізна або просто хоче перекусити перед сном. Свіжі продукти за вигідною ціною!'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-yellow-700 to-orange-600 fixed inset-0">
            <GlowEffect
                className='opacity-40'
                colors={['#1E293B', '#7C3AED', '#F59E0B', '#EF4444']}
                mode='breathe'
                blur='strongest'
                scale={1.1}
                duration={10}
            />

            <div className="h-full overflow-y-auto pb-12">
                <AnimatedGroup
                    className="max-w-md mx-auto px-3 py-8 space-y-3"
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.05,
                                },
                            },
                        },
                        item: {
                            hidden: {
                                opacity: 0,
                                y: 20,
                                scale: 0.95,
                                filter: "blur(4px)"
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    duration: 0.4
                                }
                            }
                        },
                    }}
                >
                    {/* Info Card */}
                    <div key="info-card">
                        <InfoCard
                            customerName={customerName}
                            photoUrl={photoUrl}
                        />
                    </div>

                    {/* Barcode Card */}
                    <div key="barcode-card">
                        <BarcodeCard
                            balance={1320.50}
                            freeCoffeeCount={13}
                            barcodeValue='9990882081222'
                            coffeeTillFree={coffeeTillFree}
                        />
                    </div>

                    {/* Promotions */}
                    <div key="promotions">
                        <PromotionsCarousel promotions={promotions} />
                    </div>

                    {/* Footer */}
                    <div key="footer" className="text-center py-4">
                        <p className="font-mono text-xs text-white/50">
                            v0.0.1 by @Yeh_tk
                        </p>
                    </div>
                </AnimatedGroup>
            </div>

            {/* Dialog для ошибки */}
            <Dialog open={showError} onOpenChange={setShowError}>
                <DialogContent>
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
                                    delay: 0.1
                                }}
                            >
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                            Помилка сканування
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div
                        className="text-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-lg text-muted-foreground">
                            Неможливо отримати інформацію з цього коду
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="text-red-700 text-sm">
                                Будь ласка, відскануйте QR-код магазину
                            </div>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Dialog для обработки кода */}
            <Dialog open={isProcessing} onOpenChange={() => { }}>
                <DialogContent className="bg-black/15 backdrop-blur-sm border border-white/5 shadow-2xl shadow-black/30">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            <motion.div
                                className="flex justify-center mb-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                            >
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                    <Scan className="w-8 h-8 text-white" />
                                </div>
                            </motion.div>
                            Обробка коду
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div
                        className="text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <motion.div
                            className="p-4 bg-slate-50 rounded-lg border"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-sm text-muted-foreground mb-2">Відсканований код:</div>
                            <div className="font-mono font-bold text-lg">
                                {scannedCode}
                            </div>
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-lg font-medium">
                                Генерація номера...
                            </div>
                            <div className="flex justify-center space-x-3">
                                {spinningNumbers.map((digit, i) => (
                                    <motion.div
                                        key={`${i}-${digit}`}
                                        initial={{ scale: 0.8, opacity: 0.7 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.1 }}
                                        className="w-12 h-16 bg-slate-100 border-2 border-slate-200 rounded-lg flex items-center justify-center font-mono font-bold text-2xl"
                                    >
                                        {digit}
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4, ease: "easeOut" }}
                                    className="h-full bg-blue-500 rounded-full"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Dialog для результата */}
            <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent className="sm:max-w-md bg-white/0 backdrop-blur-md border border-white/5 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            <motion.div
                                className="flex justify-center mb-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15
                                }}
                            >
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                            Вітаємо!
                        </DialogTitle>
                    </DialogHeader>
                    <motion.div
                        className="text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <motion.div
                            className="text-lg font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Ваш виграшний номер:
                        </motion.div>
                        <div className="flex justify-center space-x-2">
                            {finalNumber.split('').map((digit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                        delay: i * 0.2
                                    }}
                                    className="w-12 h-16 bg-primary/10 border-2 border-primary/20 rounded-lg flex items-center justify-center font-mono font-bold text-2xl"
                                >
                                    {digit}
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            className="p-3 bg-green-50 rounded-lg border border-green-200"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="text-green-700 text-sm font-medium">
                                ✓ Номер успішно збережено
                            </div>
                        </motion.div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Кнопка QR сканера */}
            <motion.div
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: 0.5
                }}
            >
                <motion.img
                    src="/src/assets/labubu-face.svg"
                    alt="Labubu"
                    className="absolute w-12 h-12 -top-8 -right-4 z-30 filter drop-shadow-lg"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{
                        scale: 1,
                        rotate: [9, 3, -3, 9],
                        y: [0, -2, 2, 0]
                    }}
                    transition={{
                        scale: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                            delay: 0.7
                        },
                        rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                />

                <motion.button
                    onClick={scanQR}
                    disabled={isScanning}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-20 border rounded-xl px-4 py-2 transition-all duration-300 flex items-center bg-orange-500/25 backdrop-blur-sm border-white/10 shadow-2xl shadow-black/30"
                >
                    <span className="font-semibold text-white">
                        {isScanning ? 'Сканую...' : 'Знайдеш його?'}
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default StoreApp;