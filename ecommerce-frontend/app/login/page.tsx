"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                 },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json()
                setError(errorData.message)
                return;
            }

            const { token } = await response.json();
            localStorage.setItem('token', token); 
             router.push('/'); 

        } catch (error: any) {
             setError(error.message || "Error during login");
        }
    };

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
                <h1 className="text-2xl font-bold mb-4">Login</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-lg">
                   <div className="mb-4">
                       <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
                       <input
                           type="text"
                           id="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                   </div>
                   <div className="mb-4">
                       <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                       <input
                           type="password"
                           id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                           />
                   </div>
                   {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark focus:outline-none">Login</button>
               </form>
           </main>
           <footer className="bg-gray-800 text-white p-4 text-center mt-8">
               <p> © {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</p>
           </footer>
       </div>
    );
};

export default LoginPage;