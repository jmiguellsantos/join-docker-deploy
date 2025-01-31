// app/pedidos/page.tsx
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    }
]


const PedidosPage: React.FC = () => {
    return (
        <div>
            <h1>Lista de Pedidos</h1>
            <ul>
                {pedidosMock.map((pedido) => (
                    <li key={pedido.id}>
                        <strong>ID:</strong> {pedido.id}
                        <br />
                        <strong>Data de Criação:</strong> {format(new Date(pedido.dataCriacao), 'dd/MM/yyyy HH:mm')}
                        <br />
                        <strong>Status:</strong> {pedido.status}
                        <br />
                        <strong>Usuário:</strong> {pedido.usuario}
                        <br />
                        <strong>Produtos:</strong>
                        <ul>
                            {pedido.produtos.map((produto) => (
                                <li key={produto.id}>
                                    {produto.nome} - Quantidade: {produto.quantidade}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PedidosPage;