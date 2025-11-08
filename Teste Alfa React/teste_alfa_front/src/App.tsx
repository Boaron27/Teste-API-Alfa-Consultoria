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
                                        client_id={ticketData.client_id}
                                        opening_date={ticketData.opening_date}
                                        closing_date={ticketData.closing_date}
                                        model_id={ticketData.model_id} />)}

      </div>
    </>
  )
}

export default App
