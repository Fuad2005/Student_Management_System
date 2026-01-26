'use server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'



export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, 
  })
}



export async function checkAuth() {
    const cookieStore = await cookies()
    const token = cookieStore.get('jwt')?.value

    if (!token) return { authenticated: false };

    try {
        const decoded: any = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        
        if (isExpired) {
            cookieStore.delete('jwt');
            return { authenticated: false };
        }
        
        return { authenticated: true };
    } catch (err) {
        console.log(err)
        return { authenticated: false };
    }
}