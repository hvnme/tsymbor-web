import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useTelegram } from "@/hooks/useTelegram";

export function FAQ() {
  const { webApp } = useTelegram();

  const handleAccordionClick = () => {
    webApp?.HapticFeedback?.impactOccurred("light");
  };
  return (
    <div className="space-y-1">
      <h2 className="font-semibold text-xl text-white px-2">Часті запитання</h2>
      <Card className="bg-black/10 backdrop-blur-md border border-white/12 shadow-xl">
        <CardContent className="p-3">
          <Accordion className="flex w-full flex-col">
            <AccordionItem value="first" className="py-3">
              <AccordionTrigger className="w-full">
                <div
                  className="flex items-center"
                  onClick={handleAccordionClick}
                >
                  <ChevronRight className="h-5 w-5 duration-200 group-data-expanded:rotate-90 text-white" />
                  <div className="ml-2 text-white font-semibold text-lg">
                    Що дає картка Цімбора?
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border bg-black/30 border-rounded-xl border-white/12 rounded-2xl text-white font-strong mb-2">
                <div className="pl-3 pr-3 py-3 space-y-3">
                  <p>
                    <strong>💳 Отримуй 0,5% на бонусний рахунок</strong> від
                    кожної покупки, здійсненої в ТМ "ЗІНА", "КЕФІР" або
                    "1MINUTE". За кожну вашу покупку ми нараховуємо 0,5%
                    бонусних балів.
                  </p>

                  <p>
                    <strong>🛒 Роби покупки від 1200 грн</strong> та отримуй
                    додатково +0,5%. Купуючи на суму від 1200 грн, ви отримуєте
                    додаткові бонуси.
                  </p>

                  <p>
                    <strong>👨‍👩‍👧‍👦 Користуйся перевагами всією сім'єю:</strong>{" "}
                    просто назви номер телефону члена сім'ї, на якого
                    зареєстровано картку.
                  </p>

                  <p>
                    <strong>🏷️ Спеціальна акційна ціна</strong> саме для
                    власників Цімбора. Спеціальні ціни доступні лише для вас.
                  </p>

                  <p>
                    <strong>💰 Послуга «Сейф»:</strong> дрібну решту ми
                    нараховуємо на картку, не треба носити з собою дрібні
                    монети!
                  </p>

                  <p>
                    <strong>💳 Розрахунок бонусами</strong> на касі накопиченими
                    бонусами.
                  </p>

                  <p>
                    <strong>📬 Спеціальні пропозиції</strong> та{" "}
                    <strong>🛍️ перші повідомлення про акції.</strong>
                  </p>

                  <p>
                    <strong>📈 Особистий кабінет</strong> з історією покупок та
                    використаних бонусів.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="second" className="py-3">
              <AccordionTrigger className="w-full">
                <div
                  className="flex items-center"
                  onClick={handleAccordionClick}
                >
                  <ChevronRight className="h-5 w-5 duration-200 group-data-expanded:rotate-90 text-white" />
                  <div className="ml-2 text-white font-semibold text-lg">
                    Як скористатися штрих-кодом?
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-3 pr-3 border bg-black/20 border-rounded-xl border-white/12 rounded-2xl text-white font-strong mt-2">
                <div className="py-3 space-y-4">
                  <p>
                    <strong>🔍 Пред'явіть Штрих-Код при Оплаті</strong>
                    <br />
                    Щоб скористатися перевагами нашої системи через штрих-код,
                    просто пред'явіть його нашому касиру під час оплати.
                  </p>

                  <p>
                    <strong>🛒 Застосування Знижок та Бонусів</strong>
                    <br />
                    Після сканування штрих-коду будь-які належні вам знижки чи
                    бонуси будуть автоматично застосовані до вашої покупки. Це
                    зручний спосіб використання ваших переваг без потреби
                    запам'ятовувати коди або вносити додаткову інформацію.
                  </p>

                  <p>
                    <strong>👍 Швидко та Зручно</strong>
                    <br />
                    Цей метод дозволяє зробити процес покупки швидшим та
                    зручнішим, мінімізуючи час, проведений у черзі, та
                    покращуючи ваш загальний досвід відвідування нашого
                    магазину.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
