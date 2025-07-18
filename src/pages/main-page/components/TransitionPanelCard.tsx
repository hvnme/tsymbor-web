import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export function AccordionVariant() {
    return (

        <Card className="bg-black/10 backdrop-blur-md border border-white/12 shadow-xl">
            <CardContent className="p-3">
                <Accordion
                    className='flex w-full flex-col'
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    variants={{
                        expanded: {
                            opacity: 1,
                            scale: 1,
                        },
                        collapsed: {
                            opacity: 0,
                            scale: 0.7,
                        },
                    }}
                >
                    <AccordionItem value='getting-started' className='py-1'>
                        <AccordionTrigger className='w-full '>
                            <div className='flex items-center'>
                                <ChevronRight className='h-4 w-4  duration-200 group-data-expanded:rotate-90 text-white' />
                                <div className='ml-4  text-xl font-medium text-gray-600 leading-relaxed'>
                                    Твої переваги
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className=' border-rounded-xl border-white/12 rounded-2xl text-white text-sm'>
                            <p className='pl-6 pr-2 origin-left border bg-black/10 border-rounded-xl border-white/12 rounded-2xl text-white text-sm'>
                                Kick off your experience by setting up Motion-Primitives. This
                                section covers the basics of installation and how to add animations
                                to your projects. You’ll get familiar with the initial setup and the
                                core features quickly.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='origin-left' className='py-3'>
                        <AccordionTrigger className='w-full '>
                            <div className='flex items-center'>
                                <ChevronRight className='h-6 w-6  duration-200 group-data-expanded:rotate-90 text-white' />
                                <div className='ml-2  text-white font-semibold text-lg'>
                                    Твої переваги
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='origin-left border bg-black/10 border-rounded-xl border-white/12 rounded-2xl text-white font-strong'>
                            <p className='pl-6 pr-2'>
                                Kick off your experience by setting up Motion-Primitives. This
                                section covers the basics of installation and how to add animations
                                to your projects. You’ll get familiar with the initial setup and the
                                core features quickly.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='community-support' className='py-2'>
                        <AccordionTrigger className='w-full py-0.5 text-left '>
                            <div className='flex items-center'>
                                <ChevronRight className='h-4 w-4 transition-transform duration-200 group-data-expanded:rotate-90' />
                                <div className='ml-2 '>
                                    How do I engage with the community?
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='origin-left'>
                            <p className='pl-6 pr-2'>
                                Connect with the Motion-Primitives community for support and
                                collaboration. Learn how to contribute, share knowledge, and access
                                helpful resources. Stay updated on new updates and collective
                                insights.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>

        </Card>
    );
}
