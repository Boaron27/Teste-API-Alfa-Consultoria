import { Button } from "@/components/ui/button"
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts"
import { useState, useMemo } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input.tsx";


const MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
]

type Ticket = {
    id: number;
    title: string;
    client_id: string;
    open_date: string;
    close_date: string;
    module_id: string;
};

export function TicketTable({ data }: { data: Ticket[] }) {
    const [mesSelecionado, setMesSelecionado] = useState<string>("")
    const [newTickets, setNewTickets] = useState<Ticket[]>([])
    const [openDialog, setOpenDialog] = useState(false)

    const dataFiltrada = useMemo(() => {
        const combined = [...data, ...newTickets]
        if (!mesSelecionado) return combined

        const indiceMes = MESES.indexOf(mesSelecionado) + 1

        return combined.filter((ticket) => {
            const mesAbertura = ticket.open_date ? parseInt(ticket.open_date.split("-")[1]) : null
            const mesFechamento = ticket.close_date
                ? parseInt(ticket.close_date.split("-")[1])
                : null

            return mesAbertura === indiceMes || mesFechamento === indiceMes
        })
    }, [data, mesSelecionado, newTickets])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)

        const novoChamado = {
            title: (fd.get("title") as string) || "",
            fk_id_client: (fd.get("client_id") as string) || "",
            fk_id_module: (fd.get("module_id") as string) || "",
            opening_date: (fd.get("open_date") as string) || new Date().toISOString().split("T")[0],
            closing_date: (fd.get("close_date") as string) || new Date().toISOString().split("T")[0],
        }

        try {
            const res = await fetch("http://localhost:8080/ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoChamado),
            })

            if (!res.ok) throw new Error("Erro ao criar chamado")

            const saved: Ticket = await res.json()
            setNewTickets((prev) => [...prev, saved])

            form.reset()
            setOpenDialog(false)
        } catch (err) {
            console.error(err)
            alert("Erro ao salvar o chamado. Verifique o console.")
        }
    }

    return (
        <div className="space-y-6 p-6 max-w-10xl mx-auto">
            <div className="flex items-center justify-between">
                <form
                    className="flex items-center gap-2"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h3>Chamados do mês de:</h3>
                    <select
                        name="mes"
                        value={mesSelecionado}
                        onChange={(e) => setMesSelecionado(e.target.value)}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value="">Todos</option>
                        {MESES.map((m) => (
                            <option key={m} value={m}>
                                {m[0].toUpperCase() + m.slice(1)}
                            </option>
                        ))}
                    </select>
                </form>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" style={{ backgroundColor: "white" }}>
                            + Novo Chamado
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar novo Chamado</DialogTitle>
                            <DialogDescription>
                                Adicionar um novo chamado na tabela.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="title" className="text-sm font-medium">
                                            Título
                                        </label>
                                        <Input id="title" name="title" placeholder="Digite o título do chamado" />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="client_id" className="text-sm font-medium">
                                            Cliente
                                        </label>
                                        <Input
                                            id="client_id"
                                            name="client_id"
                                            placeholder="ID ou nome do cliente"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="module_id" className="text-sm font-medium">
                                            Módulo
                                        </label>
                                        <Input
                                            id="module_id"
                                            name="module_id"
                                            placeholder="ID do módulo relacionado"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="open_date" className="text-sm font-medium">
                                            Data de Abertura
                                        </label>
                                        <Input id="open_date" name="open_date" type="date" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="close_date" className="text-sm font-medium">
                                            Data de Encerramento
                                        </label>
                                        <Input id="close_date" name="close_date" type="date" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose style={{ backgroundColor: "white" }} asChild>
                                    <Button variant="outline" style={{ backgroundColor: "white" }}>
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button type="submit" onClick={() => window.location.reload()} >Criar</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg shadow-sm relative w-full">
                <div className="max-h-[420px] overflow-y-auto overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-gray-800">
                        <thead className="sticky top-0 z-10 bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-3 py-2 text-center w-20">Código</th>
                            <th className="border border-gray-300 px-3 py-2">Título</th>
                            <th className="border border-gray-300 px-3 py-2 text-center w-40">Cliente</th>
                            <th className="border border-gray-300 px-3 py-2 text-center w-36">Data Abertura</th>
                            <th className="border border-gray-300 px-3 py-2 text-center w-36">Data Encerramento</th>
                            <th className="border border-gray-300 px-3 py-2 text-center w-32">Módulo</th>
                        </tr>
                        </thead>

                        <tbody>
                        {dataFiltrada.length > 0 ? (
                            dataFiltrada.map((ticket, i) => (
                                <tr
                                    key={ticket.id}
                                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                                >
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {ticket.id}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 truncate">
                                        {ticket.title}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {ticket.client_id}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {ticket.open_date}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {ticket.close_date}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">
                                        {ticket.module_id}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    Nenhum chamado encontrado para o mês selecionado.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}




const COLORS = ["#1D154D", "#3D2E8C", "#6E57F5", "#A594F9", "#C2B8FF"]

type ChartPieGenericProps<T> = {
    data: T[]
    groupBy: keyof T
    title?: string
}

export function ChartPieGeneric<T extends object>({
                                                                       data,
                                                                       groupBy,
                                                                       title = "Distribuição",
                                                                   }: ChartPieGenericProps<T>) {
    if (!data || data.length === 0) {
        return <p>Nenhum dado disponível.</p>
    }

    const grouped = data.reduce((acc, item) => {
        const key = String(item[groupBy] ?? "Desconhecido")
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const chartData = Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
    }))

    const total = chartData.reduce((acc, cur) => acc + cur.value, 0)

    return (
        <div
            style={{
                display: "grid",
                flexDirection: "column",
                alignItems: "start",
                gap: "1rem",
            }}
        >

            <h3 style={{ margin: 0, textAlign: "center", fontWeight: "bold" }}>{title}</h3>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                }}
            >
                <div style={{ width: 300, height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        minWidth: "180px",
                    }}
                >
                    {chartData.map((entry, index) => (
                        <div
                            key={entry.name}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: "50%",
                                }}
                            />
                            <span style={{ flex: 1 }}>{entry.name}</span>
                            <strong>{entry.value}</strong>
                            <span style={{ color: "#888" }}>
                ({((entry.value / total) * 100).toFixed(1)}%)
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



