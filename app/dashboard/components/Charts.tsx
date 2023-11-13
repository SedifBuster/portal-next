"use client"

import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Department } from "./TableDash"
//@ts-ignore
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent';

interface ChartsProps {
    data: Department[]
}


const CustomTooltip = (props: any) => {
    // we don't need to check payload[0] as there's a better prop for this purpose
    if (!props.active) return null
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    if(props.type === 'Line') {
        const newPayload = [
            {
                name: 'План (чел)',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[0].value,
                // you can also add "unit" here if you need it
                color: 'rgba(75, 192, 192, 1)',
            },
            {
                name: 'передано в оплату в ФОМС (шт)',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[1].value,
                // you can also add "unit" here if you need it
                color: 'rgba(255, 206, 86, 1)',
            },
            {
                name: 'Выбыло, накопительным (чел)',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[2].value,
                // you can also add "unit" here if you need it
                color: 'rgba(144, 219, 244, 1)',
            },
        ];
        // we render the default, but with our overridden payload
        return <DefaultTooltipContent {...props} payload={newPayload} />;

    } else if(props.type === 'Chart') {

        const newPayload = [
            {
                name: 'План (руб)',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[0].value,
                // you can also add "unit" here if you need it
                color: 'rgba(75, 192, 192, 1)',
            },
            {
                name: 'Передано оплату в ФОМС (руб) по КСГ ',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[1].value,
                // you can also add "unit" here if you need it
                color: 'rgba(255, 206, 86, 1)',
            },
            {
                name: 'Выбывшие к оплате',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[2].value,
                // you can also add "unit" here if you need it
                color: 'rgba(144, 219, 244, 1)',
            },
        ];
        // we render the default, but with our overridden payload
        return <DefaultTooltipContent {...props} payload={newPayload} />;

    }
}

export function Charts({ data }: ChartsProps) {
    return (<>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="department"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Legend verticalAlign="top" height={36} iconType="line" payload={[
                    {
                        value: 'План (руб)',
                        type: 'rect',
                        id: 'planRub',
                        color: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        value: 'Передано оплату в ФОМС (руб.) по КСГ',
                        type: 'rect',
                        id: 'transRub',
                        color: 'rgba(255, 206, 86, 1)'
                    },
                    {
                        value: 'Выбывшие к оплате',
                        type: 'rect',
                        id: 'disTax',
                        color: 'rgba(144, 219, 244, 1)'
                    },
                ]}
                />
                <Tooltip content={<CustomTooltip type={"Chart"} />} />
                <Bar dataKey="planRub" fill='rgba(75, 192, 192, 1)' radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
                <Bar dataKey="transRub" fill='rgba(255, 206, 86, 1)' radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
                <Bar dataKey="disTax" fill='rgba(144, 219, 244, 1)' radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
            </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis
                    dataKey="department"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Legend verticalAlign="top" height={36} iconType="line" payload={[
                    {
                        value: 'План (чел)',
                        type: 'line',
                        id: 'planHuman',
                        color: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        value: 'Передано оплату в ФОМС (шт.)',
                        type: 'line',
                        id: 'transHuman',
                        color: 'rgba(255, 206, 86, 1)'
                    },
                    {
                        value: 'Выбыло, накопительным (чел)',
                        type: 'line',
                        id: 'disCome',
                        color: 'rgba(144, 219, 244, 1)'
                    },
                ]}
                />
                <Tooltip content={<CustomTooltip type={"Line"} />} />
                <Line type="monotone" dataKey="planHuman" stroke='rgba(75, 192, 192, 1)' label={{ position: 'top', fontSize: 10 }} />
                <Line type="monotone" dataKey="transHuman" stroke='rgba(255, 206, 86, 1)' label={{ position: 'top', fontSize: 10 }} />
                <Line type="monotone" dataKey="disCome" stroke='rgba(144, 219, 244, 1)' label={{ position: 'top', fontSize: 10 }} />
            </LineChart>
        </ResponsiveContainer>
    </>
    )
}