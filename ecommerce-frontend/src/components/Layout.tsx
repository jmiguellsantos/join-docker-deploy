import React from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/categorias">Categorias</Link>
                    </li>
                    <li>
                        <Link href="/produtos">Produtos</Link>
                    </li>
                    <li>
                        <Link href="/pedidos">Pedidos</Link>
                    </li>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
            <footer>
                <p>© {new Date().getFullYear()} Ecommerce</p>
            </footer>
        </div>
    );
};

export default Layout;