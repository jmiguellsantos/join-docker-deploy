// src/components/forms/ProdutoForm.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCategorias } from "@/services/categorias";

interface ProdutoFormProps {
    onSubmit: (data: { nome: string; descricao: string; preco: number; categoria_id: string }) => void;
    initialValues?: { nome: string; descricao: string; preco: number; categoria_id: string };
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({ onSubmit, initialValues }) => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCategorias = async () => {
          try {
            const categoriasData = await getCategorias()
            setCategorias(categoriasData)
          } catch (error: any) {
            setError(error.message)
           } finally {
              setLoading(false)
          }
        }

        fetchCategorias()
    }, [])


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
         defaultValues: initialValues || { nome: '', descricao: '', preco: 0, categoria_id: '' },
    });

     const handleFormSubmit = (data: { nome: string; descricao: string, preco: number, categoria_id: string }) => {
        onSubmit(data);
          reset();
    };

     if (loading) {
        return <p>Loading...</p>
      }

     if(error) {
       return <p>Error: {error}</p>
    }

    return (
         <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col space-y-4">
           <div>
             <label htmlFor="nome" className="block text-gray-700 font-semibold">Nome</label>
                <input
                  type="text"
                  id="nome"
                  className="border rounded px-3 py-2 w-full"
                  {...register('nome', { required: true })} />
                {errors.nome && <span className="text-red-500">O nome é obrigatório</span>}
            </div>
            <div>
                <label htmlFor="descricao" className="block text-gray-700 font-semibold">Descrição</label>
                <textarea
                    id="descricao"
                    className="border rounded px-3 py-2 w-full"
                    {...register('descricao')} />
            </div>
             <div>
                  <label htmlFor="preco" className="block text-gray-700 font-semibold">Preço</label>
                  <input
                    type="number"
                    id="preco"
                    step="0.01"
                    className="border rounded px-3 py-2 w-full"
                    {...register('preco', { required: true, valueAsNumber: true })} />
                   {errors.preco && <span className="text-red-500">O preço é obrigatório</span>}
            </div>
           <div>
               <label htmlFor="categoria" className="block text-gray-700 font-semibold">Categoria</label>
               <select
                 id="categoria"
                 className="border rounded px-3 py-2 w-full"
                {...register('categoria_id', { required: true })}
                >
                  <option value="" disabled>Selecione uma categoria</option>
                     {categorias.map((categoria: any) => (
                       <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                      ))}
                </select>
                 {errors.categoria_id && <span className="text-red-500">A categoria é obrigatória</span>}
            </div>
        </form>
    );
};

export default ProdutoForm;