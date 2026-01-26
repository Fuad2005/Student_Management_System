"use client"

import React from 'react'
import axios from 'axios'
import { checkAuth, setAuthCookie } from '@/utils/functions'
import { useRouter } from 'next/navigation';



function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    React.useEffect(() => {
        const verify = async () => {
            const { authenticated } = await checkAuth();
            if (authenticated) {
                router.push('/');
            }
        };
        verify();
    }, [router]);


    const handleLogin = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login/', {
            'email': email,
            'password': password
        }).then(async res => {
            const token = res.data.jwt
            await setAuthCookie(token)
            router.push('/')
            
        }).catch(err => {
            console.log(err)
        })

        console.log(email, password)
    }, [email, password, router])


  return (
    <div className='min-h-screen flex flex-col gap-6 items-center justify-center p-4'>
        <h1 className='text-4xl font-bold'>Login To Dashboard</h1>
        <form className="max-w-sm w-full mx-auto" onSubmit={handleLogin}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-200">
                Your email
                </label>
                <input 
                type="email" 
                id="email" 
                className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                placeholder="example@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                />
            </div>
            
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-gray-900 dark:text-gray-200">
                Your password
                </label>
                <input 
                type="password" 
                id="password" 
                className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required 
                />
            </div>

            {/* <label htmlFor="remember" className="flex items-center mb-5">
                <input 
                id="remember" 
                type="checkbox" 
                className="w-4 h-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600" 
                required 
                />
                <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none">
                I agree with the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">terms and conditions</a>.
                </p>
            </label> */}

            <button 
                type="submit" 
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none w-full transition-colors"
            >
                Submit
            </button>
        </form>

    </div>
  )
}

export default Login