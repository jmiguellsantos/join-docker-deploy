import api from './api';

export const getPedidos = async () => {
    try{
        const response = await api.get('/pedidos');
        return response.data;
     }catch (error: any) {
       console.error("Erro ao buscar pedidos:", error)
       throw error;
      }
};

export const createPedido = async (pedido: { dataCriacao: Date, status: string, usuario_id: string, produtos: string[] }) => {
    try{
        const response = await api.post('/pedidos', pedido);
        return response.data;
      } catch(error: any) {
          console.error("Erro ao criar pedido:", error)
         throw error;
      }
};

export const updatePedido = async (id: string, pedido: { dataCriacao: Date, status: string, usuario_id: string, produtos: string[] }) => {
    try{
        const response = await api.put(`/pedidos/${id}`, pedido);
        return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar pedido:", error)
      throw error;
    }
};

export const deletePedido = async (id: string) => {
    try{
        const response = await api.delete(`/pedidos/${id}`);
        return response;
    }catch (error: any) {
        console.error("Erro ao deletar pedido:", error)
        throw error;
      }
};