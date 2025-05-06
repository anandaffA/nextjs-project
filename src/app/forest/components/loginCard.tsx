'use client'
import Input from "./input"
import { supabase } from "../../../../lib/supabase"
import { useState } from "react"

export default function LoginCard(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login_(){
    const {data, error} = await supabase.auth.signInWithPassword({
      email, password
    })

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("yay! check your console.log")
      console.log(data)
    }
  }

  return(
      <div className="relative flex flex-col md:flex-row h-screen w-screen">
      <div className="md:w-2/3 md:h-full w-full h-1/2"/>
      <div className="relative flex flex-1 flex-col md:w-1/3 md:h-full w-full h-1/2 justify-items align-center p-8 z-10 bg-forest-tint">
        <h1 className="md:text-8xl text-4xl text-forest-bark">FOR.EST</h1>
        <span className="text-forest-bark text-lg">Because people are too much.</span>
        <div className="flex flex-col gap-4 mt-8">
          <Input type="email" placeholder="youremail@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="flex md:gap-8 gap-4 align-top justify-center">
          <button className="text-forest-bark md:text-2xl text-xl m-4" onClick={login_}>Login</button>
          <button className="text-forest-bark md:text-2xl text-xl m-4">Register</button>
        </div>
      </div>
    </div>
  )
}