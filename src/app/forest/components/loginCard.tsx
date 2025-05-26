"use client";
import Input from "./input";
// import { supabase } from "../../../../lib/supabase";

import { useEffect, useState } from "react";
import { useActionState } from "react";

import Form from "./form";
import { login, signup } from "./login/actions";

const initialState = { error: null };

export default function LoginCard({ setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForm, setOpenForm] = useState(false);

  // complicated login function bruh idk
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [state_signup, formSignup, isPendingSU] = useActionState(
    signup,
    initialState
  );

  const handleSubmit_login = async (formData: FormData) => {
    await formAction(formData);
  };

  const handleSubmit_signup = async (formData: FormData) => {
    await formSignup(formData);
  };

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    setLoading(isPendingSU);
  }, [isPendingSU]);

  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");

  return (
    <>
      <div className="relative flex h-screen w-screen">
        {/* <div className="md:w-2/3 md:h-full w-full h-1/2" /> */}
        <form
          action={handleSubmit_login}
          className="relative flex mx-auto my-auto flex-col md:w-1/3 w-1/2 h-1/2 shadow-2xl bg-black/10 justify-center align-center p-14 z-10"
        >
          <h1 className="md:text-8xl text-6xl text-white/90 text-shadow-2xs text-shadow-black">FOR.EST</h1>
          <span className="text-black/90 text-2xl">
            Because people are too much.
          </span>
          <div className="flex flex-col gap-4 mt-8">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="youremail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Inline error message */}
          {state?.error && (
            <p className="text-red-200 text-sm mt-3">{state.error}</p>
          )}
          <div className="flex md:gap-8 gap-4 align-top justify-center">
            <button
              // formAction={formAction}
              className="text-white/90 md:text-2xl text-xl m-4 hover:text-forest-moss cursor-pointer transition-colors duration-300 hover:underline-offset-1 hover:underline"
            >
              Login
            </button>
            <span
              onClick={() => setOpenForm(true)}
              className="text-white/90 md:text-2xl text-xl m-4 hover:text-forest-moss cursor-pointer transition-colors duration-300 hover:underline-offset-1 hover:underline"
            >
              Register
            </span>
          </div>
        </form>
      </div>

      <Form
        isOpen={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        title="Register"
        action={handleSubmit_signup}
        // formAction={formSignup}
      >
        <div className="flex flex-col gap-4 items-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-forest-bark text-3xl">Register</h2>
          <span className="text-forest-bark text-lg mb-4">
            Create your account
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="email" placeholder="Email" id="email" name="email" />
            <Input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            <Input type="text" placeholder="Name" id="name" name="name" />
            <Input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
            />
          </div>
          {/* Inline error message */}
          {state_signup?.error && (
            <p className="text-red-200 text-sm mt-3">{state.error}</p>
          )}
          <button
            // formAction={formSignup}
            className="
              bg-forest-moss text-white cursor-pointer md:text-2xl mt-2
              text-xl p-3 rounded-full w-1/2 shadow-md hover:bg-forest-mist hover:text-forest-bark transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
