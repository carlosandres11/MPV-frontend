import { useState } from "react";
import { Link } from "react-router-dom";

import { clienteAxios } from "../config/axios";
import { Alerta } from "../components/";

export const ForgotPassword = () => {
  
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const onForgotPassword = async (e) => {
    e.preventDefault();

    if(email === ""){
      return setAlerta({ msg: "Your email is important", error: true });
    }

    try {
      const { data } = await clienteAxios.post("/veterinarians/forgot-password", {email});

      setAlerta({msg: data.msg});

      setEmail("");
    } catch (error) {
      // console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }

  }

  const { msg } = alerta || {};

    return (
        <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">
          <h2
            className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
          >If you forgot your password <span className="text-sky-400">enter your email</span></h2>
    
          <div className="w-full mt-10 max-w-md">
            <form action=""
              className="w-full mb-5 h-auto pt-5 pb-10 px-5 rounded-3xl bg-zinc-950"
              onSubmit={onForgotPassword}
              >
              <label htmlFor=""
                className="text-xl block text-zinc-400 font-semibold pl-4"
                >Email</label>
              <input type="email"
                placeholder="Enter your email" 
                className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-yellow-500 placeholder-zinc-800 bg-black rounded-xl transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
    
                <div className="flex justify-center w-1/2 mt-5 h-10 bg-gray-100 hover:bg-sky-400 rounded-2xl cursor-pointer transition">
                  <input type="submit" 
                    value="Confirm"
                    className="w-auto h-auto cursor-pointer text-xl font-black text-zinc-900"
                  />
                </div>
    
                <div className="flex gap-5 justify-center mt-8">
                  <Link to="/"
                    className="text-zinc-500 hover:opacity-90 transition"
                  >Log In</Link>
    
                  <span className="text-zinc-800 no-select">|</span>
    
                  <Link to="/sign-up"
                    className="text-zinc-500 hover:opacity-90 transition"
                  >Sign Up</Link>
                </div>
            </form>

            { msg &&
              <Alerta alerta={alerta} />
            }

          </div>
        </div>
      )
}
