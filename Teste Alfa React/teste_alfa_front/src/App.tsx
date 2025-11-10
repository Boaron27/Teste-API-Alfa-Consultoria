import './App.css'

import {useTicketData} from "./hooks/useTicketData.ts";
import {TicketTable} from "@/components/card/Ticketcard.tsx";
import {ChartPieGeneric} from "@/components/card/Ticketcard.tsx";

function App() {

const {data: data} = useTicketData();

    return (
    <>

        {data && data.length > 0 && (
            <div
                style={{display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", justifyItems: "center", width: "100vw",gap: "4rem",}}>

                <ChartPieGeneric
                    data={data}
                    groupBy="fk_id_client"
                    title="Chamados Por Cliente"
                />

                <ChartPieGeneric
                    data={data}
                    groupBy="fk_id_module"
                    title="Chamados Por Módulo"
                />
            </div>
        )}

        <div
            style={{
                display: "flex",
                justifyContent: "flex-start", // garante que o conteúdo vai pra esquerda
                width: "100%",
                margin: 0,
                padding: "0 2rem",
            }}
        >
            <div style={{ width: "100%", maxWidth: "1200px" }}>
                <TicketTable
                    data={
                        data?.map((ticket) => ({
                            id: ticket.id,
                            title: ticket.title,
                            client_id: String(ticket.fk_id_client),
                            open_date: ticket.opening_date,
                            close_date: ticket.closing_date,
                            module_id: String(ticket.fk_id_module),
                        })) ?? []
                    }
                />
            </div>
        </div>

    </>
  )
}

export default App
