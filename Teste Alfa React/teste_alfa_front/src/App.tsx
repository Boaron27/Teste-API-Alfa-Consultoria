import './App.css'

import {useTicketData} from "./hooks/useTicketData.ts";
import {ChartPieClients, Ticketcard} from "@/components/card/Ticketcard.tsx";

function App() {

const { data } = useTicketData();

  return (
    <>
        {/* Gráfico de Pizza - Tickets por Cliente */}
        {data && data.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
                <ChartPieClients data={data.map(ticket => ({ client_id: String(ticket.fk_id_client) }))} />
            </div>
        )}

      <div className="container">
          {data?.map(ticketData => <Ticketcard id={ticketData.id}
                                               title={ticketData.title}
                                               client_id={ticketData.fk_id_client}
                                               open_date={ticketData.opening_date}
                                               close_date={ticketData.closing_date}
                                               module_id={ticketData.fk_id_client} />)}

      </div>
    </>
  )
}

export default App
