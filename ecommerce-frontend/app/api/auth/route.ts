// app/api/auth/route.ts
import { NextResponse, NextRequest } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             },
             body: JSON.stringify({ username, password })
       });
    
       if (!response.ok) {
            const errorData = await response.json();
           return NextResponse.json({ message: errorData.message || "Error ao tentar Logar no sistema Join" }, { status: response.status });
       }

       const { token } = await response.json();
       return NextResponse.json({ token });


    } catch (error) {
        console.error("Error ao tentar Logar no sistema Join", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}