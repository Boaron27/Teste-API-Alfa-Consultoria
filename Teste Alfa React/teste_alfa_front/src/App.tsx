import './App.css'

import {useTicketData} from "./hooks/useTicketData.ts";
import {TicketTable} from "@/components/card/Ticketcard.tsx";
import {ChartPieGeneric} from "@/components/card/Ticketcard.tsx";
import {useState} from "react";

function App() {

const {data: data} = useTicketData();
    const [mesSelecionado] = useState<string>(() => {
        const params = new URLSearchParams(window.location.search)
        return params.get("mes") || ""
    })

    return (
    <>

        {data && data.length > 0 && (
            <div
                style={{display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", justifyItems: "center", width: "100vw",gap: "4rem",}}>

                <ChartPieGeneric
                    data={data}
                    groupBy="fk_id_client"
                    mesSelecionado={mesSelecionado}
                    title={data && data.length > 0 ? "Chamados Por Cliente" : ""}

                />

                <ChartPieGeneric
                    data={data}
                    groupBy="fk_id_module"
                    mesSelecionado={mesSelecionado}
                    title={data && data.length > 0 ? "Chamados Por Módulo" : ""}
                />
            </div>
        )}

        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                margin: 0,
                padding: "0 2rem",
            }}
        >
            <div style={{ width: "100%" }}>
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
