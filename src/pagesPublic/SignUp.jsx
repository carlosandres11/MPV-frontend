import { useState } from "react"
import { Link } from "react-router-dom"

import { Alerta } from "../components/"
import { clienteAxios } from "../config/axios";

export const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const onSignUp = async (e) => {
    e.preventDefault();

    if([name,email,password,cPassword].includes("")){
      return setAlerta({ msg: "All the spaces are important", error:true });
    }

    if(password.length < 6){
      return setAlerta({ msg: "The password must be at least 6 characters long", error: true });
    }

    if(password !== cPassword){
      return setAlerta({ msg: "The passwords are different", error: true });
    }

    try {

      const { data } = await clienteAxios.post("/veterinarians/sign-up", {name,email,password});

      setAlerta({ msg: data.msg });

      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");

    } catch (error) {
      console.log(error);

      setAlerta({ msg: error.response.data.msg, error: true });
    }

  }

  const { msg } = alerta || {};

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">
      <h2
        className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
      >Sign up <span className="text-green-400">and start managing patients</span></h2>

      <div className="w-full mt-10 max-w-md">
        <form action=""
          className="w-full h-auto pt-5 pb-10 px-5 rounded-3xl bg-zinc-950 mb-5"
          onSubmit={onSignUp}
          >
          <label htmlFor=""
            className="text-xl block text-zinc-400 font-semibold pl-4"
            >Name</label>
          <input type="text"
            placeholder="Enter your name" 
            className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-pink-500 placeholder-zinc-800 bg-black rounded-xl transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Email</label>
          <input type="email"
          placeholder="Enter your email" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-yellow-500 bg-black rounded-xl placeholder-zinc-800 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Password</label>
          <input type="password"
          placeholder="Enter your password" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 bg-black rounded-xl placeholder-zinc-800 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Confirm password</label>
          <input type="password"
          placeholder="Confirm your password" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 bg-black rounded-xl placeholder-zinc-800 transition"
            value={cPassword}
            onChange={(e) => setCpassword(e.target.value)}
            />

            <div className="flex justify-center w-1/2 mt-5 h-10 bg-gray-100 hover:bg-pink-500 rounded-2xl cursor-pointer transition">
              <input type="submit" 
                value="Sign Up"
                className="w-auto h-auto cursor-pointer text-xl font-black text-zinc-900"
              />
            </div>

            <div className="flex gap-5 justify-center mt-8">
              <Link to="/"
                className="text-zinc-500 hover:opacity-90 transition"
              >Log In</Link>

              <span className="text-zinc-800 no-select">|</span>

              <Link to="/forgot-password"
                className="text-zinc-500 hover:opacity-90 transition"
              >Forgot your password?</Link>
            </div>
        </form>

        { msg && 
          <Alerta alerta={ alerta }/>
        }

      </div>
    </div>
  )
}
