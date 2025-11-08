interface CardProps{
    id : number,
    title : string,
    client_id : number,
    open_date : string,
    close_date : string,
    module_id : number


}

export function Card({id, title, client_id, open_date, close_date, module_id,}: CardProps) {
    return (
        <div className="card">
            <h1>{title}</h1>
            <h1>{id}</h1>
            <h1>{client_id}</h1>
            <h1>{open_date}</h1>
            <h1>{close_date}</h1>
            <h1>{module_id}</h1>
        </div>
    );
}
