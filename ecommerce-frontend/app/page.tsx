// app/page.tsx
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

const pedidosMock = [
    {
        id: '1',
        dataCriacao: new Date(),
        status: 'Em andamento',
        usuario: 'user1',
        produtos: [
            { id: '1', nome: 'Notebook', descricao: 'Notebook i7', preco: 5000.00, quantidade: 1 },
            { id: '2', nome: 'A Culpa é das Estrelas', descricao: 'Livro de ficção', preco: 30.00, quantidade: 2 },
        ],
    },
    {
        id: '2',
        dataCriacao: new Date(),
        status: 'Concluído',
        usuario: 'user2',
        produtos: [
            { id: '3', nome: 'Camiseta', descricao: 'Camiseta Branca', preco: 50.00, quantidade: 3 },
        ],
    },
    {
        id: '3',
        dataCriacao: new Date(),
        status: 'Em andamento',
        usuario: 'user3',
        produtos: [
            { id: '4', nome: 'Mouse', descricao: 'Mouse sem fio', preco: 50.00, quantidade: 1 },
            { id: '5', nome: 'O Senhor dos Anéis', descricao: 'Livro de fantasia', preco: 50.00, quantidade: 1 },
        ],
    },
    {
        id: '4',
        dataCriacao: new Date(),
        status: 'Concluído',
        usuario: 'user4',
        produtos: [
            { id: '6', nome: 'Calça', descricao: 'Calça Jeans', preco: 80.00, quantidade: 1 },
        ],
    },
    {
        id: '5',
        dataCriacao: new Date(),
        status: 'Em andamento',
        usuario: 'user5',
        produtos: [
            { id: '7', nome: 'Teclado', descricao: 'Teclado Mecânico', preco: 150.00, quantidade: 1 }
        ],
    }
]

const HomePage: React.FC = () => {
    return (
         <div className="bg-gray-100 min-h-screen">
             <header className="bg-primary p-4 text-white">
                 <div className="container mx-auto flex items-center justify-between">
                     <div className="flex items-center">
                        <Image src="/join_ti_logo.jpg" alt="Logo da loja" width={40} height={40} className="mr-2"/>
                         <h1 className="text-2xl font-bold text-black">Minha Loja</h1>
                     </div>
                     <input
                         type="text"
                         placeholder="Buscar produtos..."
                         className="bg-white text-black px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-white"
                     />
                  </div>
            </header>
            <main className="container mx-auto mt-8 p-4">
                <h2 className="text-2xl font-semibold mb-4">Últimos Pedidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pedidosMock.slice(0, 6).map((pedido) => (
                        <div key={pedido.id} className="bg-white rounded shadow p-4">
                            <p><strong className="block mb-1">ID:</strong> {pedido.id}</p>
                            <p><strong className="block mb-1">Data de Criação:</strong> {format(new Date(pedido.dataCriacao), 'dd/MM/yyyy HH:mm')}</p>
                            <p><strong className="block mb-1">Status:</strong> {pedido.status}</p>
                            <p><strong className="block mb-1">Usuário:</strong> {pedido.usuario}</p>
                            <strong className="block mb-1">Produtos:</strong>
                            <ul className="list-disc ml-5">
                                {pedido.produtos.map((produto) => (
                                    <li key={produto.id} className="text-sm">
                                        {produto.nome} - Quantidade: {produto.quantidade}
                                    </li>
                                ))}
                             </ul>
                        </div>
                     ))}
                </div>
             </main>
            <footer className="bg-gray-800 text-white p-4 text-center mt-8">
                <p> © {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</p>
            </footer>
         </div>
    );
};

export default HomePage;