import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { clienteAxios } from "../config/axios";
import { Alerta } from "../components"


export const ForForgotPassword = () => {

  const [password, setPassword] = useState({
    pwd_new: "",
    pwd_confirmed: "",
  })
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedPost, setConfirmedPost] = useState(false);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const getForgotPassword = async () => {

      try {
        const { data } = await clienteAxios(`/veterinarians/forgot-password/${token}`)
        
        setConfirmed(true);
        // console.log(data);
      } catch (error) {
        console.log(error);
        setConfirmed(false);
      }

    }
    getForgotPassword()
  }, []);

  const onForgotPasswordNew = async (e) => {
    e.preventDefault();

    if(password.pwd_new === ""){
      return setAlerta({ msg: "Both spaces are important", error: true });
    }

    if(password.pwd_new !== password.pwd_confirmed){
      return setAlerta({ msg: "Your password do not match", error: true });
    }

    if(password.pwd_new.length < 6){
      return setAlerta({ msg: "Your new password must be at least 6 characters long", error: true});
    }
    
    let passwordd = password.pwd_new;

    try {
      const { data } = await clienteAxios.post(`/veterinarians/forgot-password/${token}`, {passwordd})
      
      setAlerta(data);

      setPassword({
        pwd_new: "",
        pwd_confirmed: "",
      })

      setConfirmedPost(true);

    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true});
      setConfirmedPost(false);
    }

  } 
  
  const { msg } = alerta || {};

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">

          {confirmed === true ? (
            <h2
              className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
            >You can now update your<span className="text-green-400"> password</span></h2>
            ) : (
            <h2
              className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
            >You cannot update your <span className="text-red-600">password</span></h2>
          )}

          <div className="w-full mt-10 max-w-md">

            <form action=""
              className="w-full h-auto mb-5 pt-5 pb-5 px-5 rounded-3xl bg-zinc-950"
              onSubmit={onForgotPasswordNew}
              >
                {confirmed === true ? (
                  <>
                    <label htmlFor=""
                    className="text-xl block text-zinc-400 font-semibold pl-4"
                    >New password</label>
                    <input type="password"
                    placeholder="Enter your new password" 
                    className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-sky-400 placeholder-zinc-800 bg-black rounded-xl transition"
                    name="pwd_new"
                    value={password.pwd_new}
                        onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}
                    />

                    <label htmlFor=""
                    className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
                    >Confirm password</label>
                    <input type="password"
                    placeholder="Confirm your new password" 
                    className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-sky-400 placeholder-zinc-800 bg-black rounded-xl transition"
                    name="pwd_confirmed"
                    value={password.pwd_confirmed}
                    onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}
                    />

                    <div className="flex justify-center w-1/2 mt-5 mb-5 h-10 bg-gray-100 hover:bg-green-400 rounded-2xl cursor-pointer transition">
                      <input type="submit" 
                        value="Confirm"
                        className="w-auto h-auto cursor-pointer text-xl font-black text-zinc-900"
                        
                      />
                    </div>
                  </>

                ) : (

                  <div className="flex justify-center">
                    <Link to="/sign-up"
                      className="text-zinc-500 hover:opacity-90 transition"
                    >Sign Up</Link>
                  </div>

                )}

                {confirmedPost &&
                  <div className="flex justify-center mt-7 mb-5">
                    <Link to="/"
                      className="text-zinc-500 hover:opacity-90 transition"
                    >Log In</Link>
                </div>
                }
              
            </form>

              {msg &&
                <Alerta alerta={alerta}/>
              }

          </div>

    </div>
  )
}
