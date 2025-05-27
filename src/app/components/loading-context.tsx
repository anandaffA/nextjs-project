'use client'
import { useContext, createContext, useState, ReactNode } from "react";

type LoadingContextType = {
    isLoading: boolean,
    setLoading: (value: boolean)=>void
}

const LoadingContext = createContext<LoadingContextType|undefined>(undefined);

export function LoadingProvider({children}:{children:ReactNode}){
    const [isLoading, setLoading] = useState(false)
    return(
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => { 
    const context = useContext(LoadingContext)
    if (!context) {throw new Error('useLoading must be used within a LoadingProvider');}
    return context;
};

// export const useLoading = (): LoadingContextType => {
//   const context = useContext(LoadingContext);
//   if (!context) {
//     throw new Error('useLoading must be used within a LoadingProvider');
//   }
//   return context;
// };
