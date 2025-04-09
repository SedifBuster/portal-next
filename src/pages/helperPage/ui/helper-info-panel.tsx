'use client'


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/shared/ui/accordion"
import {BiLogoTelegram} from "react-icons/bi"
import { HiQrCode } from "react-icons/hi2"

export function HelperInfoPanel() {

    return (
            <Accordion type="single" collapsible className="w-full">

                <AccordionItem value="item-1">
                    <AccordionTrigger>Telegram Bot <BiLogoTelegram /></AccordionTrigger>
                    <AccordionContent>
                        Еще у нас есть телеграмм бот.<HiQrCode 
                            className="
                                h-10
                                w-10
                                shrink-0
                                cursor-pointer
                                text-blue-500
                                "
                                /> С помощью него заявку можно отправить с телефона.  
                        <div
                            className="
                            text-blue-500
                            pt-2
                            pb-2
                            underline
                            cursor-pointer
                            inline-block
                            pl-1
                            "
                        > Посмотреть инструкцию можно тут.</div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
    )
}