"use client"
import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {getUsuarios} from "@/services/usuarios";
interface PedidoFormProps {
    onSubmit: (data: { dataCriacao: Date, status: string, usuario_id: string, produtos: string[] }) => void;
    initialValues?: { dataCriacao: Date, status: string, usuario_id: string, produtos: string[]};
}

const PedidoForm: React.FC<PedidoFormProps> = ({ onSubmit, initialValues }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

     useEffect(() => {
        const fetchUsuarios = async () => {
            try{
                const usuariosData = await getUsuarios();
                 setUsuarios(usuariosData);
              } catch (error: any) {
                  setError(error.message);
              } finally {
                  setLoading(false)
              }
       };

        fetchUsuarios();
    }, [])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues || { dataCriacao: new Date(), status: '', usuario_id: '', produtos: []},
    });

     const handleFormSubmit = (data: { dataCriacao: Date, status: string, usuario_id: string, produtos: string[] }) => {
       onSubmit(data);
        reset();
    };


    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    return (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col space-y-4">
             <div>
                 <label htmlFor="dataCriacao" className="block text-gray-700 font-semibold">Data de Criação</label>
                 <input
                    type="datetime-local"
                     id="dataCriacao"
                    className="border rounded px-3 py-2 w-full"
                    {...register('dataCriacao', { required: true })}
                    />
                   {errors.dataCriacao && <span className="text-red-500">A data é obrigatória</span>}
             </div>
            <div>
               <label htmlFor="status" className="block text-gray-700 font-semibold">Status</label>
                <input
                     type="text"
                     id="status"
                    className="border rounded px-3 py-2 w-full"
                   {...register('status', { required: true })}
                     />
                  {errors.status && <span className="text-red-500">O status é obrigatório</span>}
            </div>
             <div>
               <label htmlFor="usuario" className="block text-gray-700 font-semibold">Usuario</label>
                 <select
                      id="usuario"
                    className="border rounded px-3 py-2 w-full"
                    {...register('usuario_id', { required: true })}
                     >
                     <option value="" disabled>Selecione um usuário</option>
                     {usuarios.map((usuario: any) => (
                      <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
                    ))}
                </select>
                 {errors.usuario_id && <span className="text-red-500">O usuário é obrigatório</span>}
             </div>
        </form>
    );
};

export default PedidoForm;