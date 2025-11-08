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
