'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { fetchSession } from "../../components/login/client";
import type { UserType } from "./users";

type UserStructure = {
    user: UserType | null
}

const UserContext = createContext<UserStructure | undefined>(undefined)

export function UserProvider({children}){
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(()=>{
        const getUser = async() => {
            try{
                const user_data = await fetchSession()
                setUser(user_data)
            }
            catch (e){
                throw new Error("aNJIRRRR" + e)
            }
        }
        getUser()
    },[])

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export const UseUser = () => {
    const context = useContext(UserContext)
    if (!context) { throw new Error ("Something's not right with your code") }
    return context
}



