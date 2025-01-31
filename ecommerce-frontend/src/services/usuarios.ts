  // src/services/usuarios.ts
  import api from './api';

  export const getUsuarios = async () => {
      try{
          const response = await api.get('/usuarios');
          return response.data;
       } catch (error: any) {
         console.error("Erro ao buscar usuarios:", error)
         throw error;
        }
  };

  export const createUsuario = async (usuario: {username:string, password:string, role: string}) => {
     try{
         const response = await api.post('/usuarios', usuario);
         return response.data;
     } catch(error: any) {
         console.error("Erro ao criar usuario:", error);
         throw error;
     }
  };

  export const updateUsuario = async (id: string, usuario: {username:string, password:string, role:string}) => {
     try{
         const response = await api.put(`/usuarios/${id}`, usuario);
         return response.data;
     }catch(error:any){
         console.error("Erro ao atualizar usuario:", error);
         throw error;
     }
  };
  export const deleteUsuario = async (id: string) => {
      try {
          const response = await api.delete(`/usuarios/${id}`);
          return response;
      } catch(error: any) {
          console.error("Erro ao deletar usuário:", error);
           throw error;
      }
  };