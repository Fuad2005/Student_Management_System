"use client"

import React from 'react'
import Link from 'next/link';
import { checkAuth } from '@/utils/functions';


function Header() {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [darkIcon, setDarkIcon] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);

  const toggleTheme = React.useCallback(() => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      setDarkIcon(true)
    } else {
      setDarkIcon(false)
    }

  }, [])

  React.useEffect(() => {
          const verify = async () => {
              const { authenticated } = await checkAuth();
              if (authenticated) {
                  setIsAuth(true);
              } else {
                  setIsAuth(false);
              }
          };
          verify();
      }, []);

  return (
    <>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        type="button" 
        className="text-gray-900 dark:text-gray-400 bg-transparent box-border border border-transparent hover:bg-gray-200 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 font-medium leading-5 rounded-lg ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
        data-drawer-target="separator-sidebar" 
        data-drawer-toggle="separator-sidebar" 
        aria-controls="separator-sidebar" 
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
        </svg>
      </button>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900/20 dark:bg-black/60 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
          id="separator-sidebar" 
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} 
          aria-label="Sidebar"
        >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a] border-e border-gray-200 dark:border-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                  <Link href="/students" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>

                    <span className="ms-3">Students</span>
                  </Link>
              </li>
              <li>
                  <Link href="/teachers" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <span className="ms-3">Teachers</span>
                  </Link>
              </li>
              <li>
                  <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                    </svg>

                    <span className="ms-3">Groups</span>
                  </a>
              </li>
              <li>
                  <button type="button" className="flex items-center w-full justify-between px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/></svg>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
                  </button>
                  <ul id="dropdown-example" className="hidden py-2 space-y-2">
                        <li>
                          <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">Products</a>
                        </li>
                        <li>
                          <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">Billing</a>
                        </li>
                        <li>
                          <a href="#" className="pl-10 flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">Invoice</a>
                        </li>
                  </ul>
              </li>
              {/* <li>
                  <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                    <span className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300 text-xs font-medium px-1.5 py-0.5 rounded">Pro</span>
                  </a>
              </li> */}
              {/* <li>
                  <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"/></svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full">2</span>
                  </a>
              </li> */}
            </ul>
            
            <ul className="space-y-2 font-medium border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
              <li>
                  <a href="#" onClick={toggleTheme} className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                    {darkIcon ? 
                      <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                      </svg>
                    : 
                      <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
                      </svg>

                    }
                    

                    <span className="flex-1 ms-3 whitespace-nowrap">Theme</span>
                  </a>
              </li>
              {isAuth ? 
                <li>
                    <Link href="#" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                      <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                      </svg>


                      <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                    </Link>
                </li>
              : 
                <li>
                    <Link href="/auth/login" className="flex items-center px-2 py-1.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 group">
                      <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600 dark:group-hover:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                      </svg>

                      <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                    </Link>
                </li>
              }
            </ul>
        </div>
      </aside>
    </>

  )
}

export default Header