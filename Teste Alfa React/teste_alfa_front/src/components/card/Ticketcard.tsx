
//import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


interface CardProps{
    id : number,
    title : string,
    client_id : number,
    open_date : string,
    close_date : string,
    module_id : number


}

export function Ticketcard({id, title, client_id, open_date, close_date, module_id,}: CardProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Título</th>
                    <th className="px-4 py-2 border">Cliente</th>
                    <th className="px-4 py-2 border">Data de Abertura</th>
                    <th className="px-4 py-2 border">Data de Fechamento</th>
                    <th className="px-4 py-2 border">Módulo</th>
                </tr>
                </thead>
                <tbody>
                <tr className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{id}</td>
                    <td className="px-4 py-2 border">{title}</td>
                    <td className="px-4 py-2 border text-center">{client_id}</td>
                    <td className="px-4 py-2 border text-center">{open_date}</td>
                    <td className="px-4 py-2 border text-center">{close_date}</td>
                    <td className="px-4 py-2 border text-center">{module_id}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}



export function ChartPieClients({ data }: { data: Array<{ client_id: string }> }) {

    const grouped = data.reduce((acc, item) => {
        acc[item.client_id] = (acc[item.client_id] || 0) + 1
        return acc
    }, {} as Record<string, number>)


    const chartData = Object.entries(grouped).map(([client, total], i) => ({
        client,
        tickets: total,
        fill: `var(--chart-${(i % 5) + 1})`,
    }))

    const chartConfig = {
        tickets: { label: "Tickets" },
    } satisfies ChartConfig

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chamados por Cliente</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="tickets" nameKey="client" />
                    </PieChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">

                    Atualizado automaticamente
                </div>
                <div className="text-muted-foreground leading-none">
                    Mostrando total de tickets por cliente
                </div>
            </CardFooter>
        </Card>
    )
}

