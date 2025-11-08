interface CardProps{
    id : number,
    title : string,
    client_id : number,
    opening_date : string,
    closing_date : string,
    model_id : number


}

export function Card({id, title, client_id, opening_date, closing_date, model_id,}: CardProps) {
    return (
        <div className="card">
            <h1>{title}</h1>
            <h1>{id}</h1>
            <h1>{client_id}</h1>
            <h1>{opening_date}</h1>
            <h1>{closing_date}</h1>
            <h1>{model_id}</h1>
        </div>
    );
}
