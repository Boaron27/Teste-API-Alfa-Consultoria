import { PieChart } from '@mui/x-charts/PieChart';
import { useTicketData } from '../hooks/useTicketData';

export function BasicPie() {
    const {data: tickets, isLoading, isError} = useTicketData();

    if (isLoading) return <p>Carregando gráfico...</p>;
    if (isError) return <p>Erro ao carregar dados do gráfico</p>;
    if (!tickets || tickets.length === 0) return <p>Nenhum ticket encontrado.</p>;

    // Agrupa por client_id e conta quantos tickets cada um tem
    const grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.client_id] = (acc[ticket.client_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Transforma o objeto em array para o gráfico
    const chartData = Object.entries(grouped).map(([client, count], index) => ({
        id: index,
        value: count,
        label: `Cliente ${client}`,
    }));

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-fit">
            <h2 className="text-lg font-semibold mb-2">Tickets por Cliente</h2>
            <PieChart
                series={[
                    {
                        data: chartData,
                    },
                ]}
                width={400}
                height={300}
            />
        </div>
    );
}

