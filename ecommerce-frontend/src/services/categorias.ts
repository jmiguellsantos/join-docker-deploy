import api from './api';

export const getCategorias = async () => {
    try{
        const response = await api.get('/categorias');
        return response.data;
    }catch(error: any){
       console.error("Erro ao buscar categorias:", error)
       throw error;
    }
};

export const createCategoria = async (categoria: { nome: string, descricao: string }) => {
  try{
     const response = await api.post('/categorias', categoria);
     return response.data;
   } catch(error: any) {
     console.error("Erro ao criar categoria:", error)
     throw error;
   }
};

export const updateCategoria = async (id: string, categoria: { nome: string, descricao: string }) => {
   try{
     const response = await api.put(`/categorias/${id}`, categoria);
     return response.data;
   } catch(error: any) {
       console.error("Erro ao atualizar categoria:", error)
        throw error;
   }
};

export const deleteCategoria = async (id: string) => {
  try{
      const response = await api.delete(`/categorias/${id}`);
      return response;
   } catch(error: any) {
      console.error("Erro ao deletar categoria:", error)
      throw error;
  }
};