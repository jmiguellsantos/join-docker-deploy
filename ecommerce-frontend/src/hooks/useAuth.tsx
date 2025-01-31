import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            router.push('/login');
            return;
        }

        setIsAuthenticated(true);
    }, [router]);

    return isAuthenticated;
};

export default useAuth;