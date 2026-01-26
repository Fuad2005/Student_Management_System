"use client";

import { checkAuth } from "@/utils/functions";
import React from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()

  React.useEffect(() => {
      const init = async () => {
        const { authenticated } = await checkAuth();
        if (!authenticated) {
            router.push('/auth/login');
        } else {
            // setLoading(false);
        }
      };
      init();
    }, [router]);
  

  return (
    <div className="p-4 sm:ml-64">hello</div>
  );
}
