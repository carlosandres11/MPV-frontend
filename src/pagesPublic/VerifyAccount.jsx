import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { clienteAxios } from "../config/axios";
import { Alerta } from "../components";

export const VerifyAccount = () => {

    const [confirmed, setConfirmed] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
      const getConfirmAccount = async () => {
        try {
            await clienteAxios(`/veterinarians/confirm-account/${token}`)
            setConfirmed(true);
        } catch (error) {
          console.log(error);
        }
      }
      getConfirmAccount()
    }, [])
    
  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">

        { confirmed === true ? (
            <h2
                className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
              >Your account has already been <span className="text-yellow-400">successfully confirmed</span></h2>
        ) : (
            <h2
                className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
              >This link does not already work or <span className="text-red-600">it has already confirmed your account</span></h2>
        )}

            
        <div className="w-full mt-10 max-w-md">
            <div className="w-full mb-5 h-auto pt-5 pb-5 px-5 rounded-3xl bg-zinc-950">

                { confirmed === true ? (
                    <div className="flex justify-center">
                        <Link to="/"
                        className="text-zinc-500 hover:opacity-90 transition"
                        >Log In</Link>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Link to="/sign-up"
                        className="text-zinc-500 hover:opacity-90 transition"
                        >Sign Up</Link>
                    </div>
                )}

            </div>
            { confirmed === true ? (
                <Alerta alerta={{msg: "Your account was successfully confirmed", error: false}} />
            ) :(
                <Alerta alerta={{msg: "This veterinarian does not exists", error: true}} />
            )}
        </div>
    </div>
  )
}
