import api from './api';

export const getProdutos = async () => {
    try {
        const response = await api.get('/produtos');
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar produtos:", error)
        throw error;
    }
};

export const createProduto = async (produto: { nome: string, descricao: string, preco: number, categoria_id: string }) => {
    try {
        const response = await api.post('/produtos', produto);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao criar produto:", error);
        throw error;
    }
};

export const updateProduto = async (id: string, produto: { nome: string, descricao: string, preco: number, categoria_id: string }) => {
    try {
        const response = await api.put(`/produtos/${id}`, produto);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
    }
};

export const deleteProduto = async (id: string) => {
    try {
        const response = await api.delete(`/produtos/${id}`);
        return response;
    } catch (error: any) {
        console.error("Erro ao deletar produto:", error);
        throw error;
    }
};