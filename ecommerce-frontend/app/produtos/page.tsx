// app/produtos/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { getProdutos, createProduto, updateProduto, deleteProduto } from "@/services/produtos";
import Image from 'next/image';
import FormModal from "@/components/forms/FormModal";
import ProdutoForm from "@/components/forms/ProdutoForm";

const ProdutosPage: React.FC = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
     const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedProduto, setSelectedProduto] = useState<any>(null)

     useEffect(() => {
       const fetchProdutos = async () => {
         try{
            const produtosData = await getProdutos();
            setProdutos(produtosData);
           } catch (error: any) {
            setError(error.message)
           } finally {
             setLoading(false)
           }
      };

      fetchProdutos();
    }, [])

     const handleCreateProduto = async (data: { nome: string, descricao: string, preco: number, categoria_id: string }) => {
        setLoading(true);
      try{
          await createProduto(data)
          fetchProdutos()
           setIsModalOpen(false)
           setIsEdit(false)
        setSelectedProduto(null)
       } catch (error:any) {
           setError(error.message)
        }finally {
          setLoading(false);
        }
    }

      const handleUpdateProduto = async (data: { nome: string, descricao: string, preco: number, categoria_id: string }) => {
         setLoading(true);
        if(!selectedProduto) return;
      try{
          await updateProduto(selectedProduto.id, data)
          fetchProdutos()
           setIsModalOpen(false)
           setIsEdit(false)
          setSelectedProduto(null)
      } catch (error:any) {
          setError(error.message)
      }finally {
          setLoading(false);
       }
    }

    const handleDeleteProduto = async (id:string) => {
         setLoading(true);
       try{
            await deleteProduto(id)
             fetchProdutos();
         } catch(error: any){
            setError(error.message)
          } finally {
            setLoading(false)
         }
     }

   const handleEditClick = (produto:any) => {
    setSelectedProduto(produto)
    setIsModalOpen(true)
    setIsEdit(true)
   }

 const fetchProdutos = async () => {
      try {
          const produtosData = await getProdutos();
          setProdutos(produtosData);
        } catch (error: any) {
          setError(error.message);
        } finally {
            setLoading(false);
        }
   };

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

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
                 <div className="flex justify-between items-center mb-4">
                     <h1 className="text-2xl font-bold">Lista de Produtos</h1>
                        <button
                             className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark focus:outline-none"
                             onClick={() => {setIsModalOpen(true); setIsEdit(false); setSelectedProduto(null)}}>Criar Produto
                         </button>
                 </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtos.map((produto: any) => (
                    <div key={produto.id} className="bg-white rounded shadow p-4">
                         <p><strong className="block mb-1">Nome:</strong> {produto.nome}</p>
                          <p><strong className="block mb-1">Descrição:</strong> {produto.descricao}</p>
                          <p><strong className="block mb-1">Preço:</strong> R${produto.preco}</p>
                           <p><strong className="block mb-1">Categoria:</strong> {produto.categoria.nome}</p>
                           <div>
                              <button
                                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none mr-2"
                                  onClick={() => handleEditClick(produto)}
                                >Editar</button>
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none"
                                    onClick={() => handleDeleteProduto(produto.id)}
                                  >Deletar</button>
                            </div>
                      </div>
                 ))}
             </div>
          </main>
             <footer className="bg-gray-800 text-white p-4 text-center mt-8">
                <p> © {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</p>
            </footer>
            <FormModal
                 isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEdit ? "Editar Produto" : "Criar Produto"}
                 onSubmit={() => {}}
                 >
                <ProdutoForm onSubmit={isEdit ? handleUpdateProduto : handleCreateProduto}  initialValues={selectedProduto}/>
            </FormModal>
        </div>
    );
};

export default ProdutosPage;