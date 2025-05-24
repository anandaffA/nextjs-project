"use client";
import Input from "./input";
// import { supabase } from "../../../../lib/supabase";

import { useState } from "react";
import { useActionState } from "react";

import Form from "./form";
import { login, signup } from "./login/actions";

const initialState = { error: null };

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [state, formAction] = useActionState(login, initialState);
  const [state_signup, formSignup] = useActionState(signup, initialState);

  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");

  return (
    <>
      <div className="relative flex flex-col md:flex-row h-screen w-screen">
        <div className="md:w-2/3 md:h-full w-full h-1/2" />
        <form
          action={formAction}
          className="relative flex flex-1 flex-col md:w-1/3 md:h-full w-full h-1/2 justify-items align-center p-8 z-10 bg-forest-tint"
        >
          <h1 className="md:text-8xl text-4xl text-forest-bark">FOR.EST</h1>
          <span className="text-forest-bark text-lg">
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
            <p className="text-red-800 text-sm mt-3">{state.error}</p>
          )}
          <div className="flex md:gap-8 gap-4 align-top justify-center">
            <button
              formAction={formAction}
              className="text-forest-bark md:text-2xl text-xl m-4 hover:text-forest-moss cursor-pointer transition-colors duration-300 hover:underline-offset-1 hover:underline"
            >
              Login
            </button>
            <span
              onClick={() => setOpenForm(true)}
              className="text-forest-bark md:text-2xl text-xl m-4 hover:text-forest-moss cursor-pointer transition-colors duration-300 hover:underline-offset-1 hover:underline"
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
        formAction={formSignup}
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
            <p className="text-red-800 text-sm mt-3">{state.error}</p>
          )}
          <button
            formAction={formSignup}
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
