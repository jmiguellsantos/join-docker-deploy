import React from 'react';
import { useForm } from 'react-hook-form';

interface CategoriaFormProps {
    onSubmit: (data: { nome: string; descricao: string }) => void;
    initialValues?: { nome: string; descricao: string };
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({ onSubmit, initialValues }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
         defaultValues: initialValues || { nome: '', descricao: '' },
    });

    const handleFormSubmit = (data: { nome: string; descricao: string }) => {
        onSubmit(data);
         reset();
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Nome</label>
                <input type="text" className="border rounded px-3 py-2 w-full" {...register('nome', { required: true })}/>
                 {errors.nome && <span className="text-red-500">O nome é obrigatório</span>}
            </div>
            <div>
               <label className="block text-gray-700 font-semibold">Descrição</label>
                <textarea className="border rounded px-3 py-2 w-full" {...register('descricao')} />
            </div>
       </form>
    );
};

export default CategoriaForm;