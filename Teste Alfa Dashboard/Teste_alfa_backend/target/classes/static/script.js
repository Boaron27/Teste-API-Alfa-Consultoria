// Exemplo simples com fetch
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

fetch('http://localhost:8080/')
    .then(response => response.json()) // converte o retorno em JSON
    .then(data => {
        console.log("Usuários:", data);
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });

async function carregarUsuarios() {
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // limpa antes de preencher

    usuarios.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.nome} - ${u.email}`;
        lista.appendChild(li);
    });
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

function testeReact() {
    const root = ReactDOM.createRoot(document.getElementById("root"));

    function App() {
        // Mova a definição da variável para DENTRO do componente


        return (
            <div>
                <h1>Oi, React está funcionando!</h1>
                <p>Renderizado diretamente no navegador 😎</p>
                <h1>{Client.name}</h1>
            </div>
        );
    }

    root.render(<App />);
}