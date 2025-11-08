import './App.css'
import {Card} from './components/card/card';
import {useTicketData} from "./hooks/useTicketData.ts";

function App() {

const { data } = useTicketData();

  return (
    <>
        <h1>Ta funfa</h1>
      <div className="container">
          {data?.map(ticketData => <Card id={ticketData.id}
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
