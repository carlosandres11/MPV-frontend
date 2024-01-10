import { useState } from "react"

import { Alerta } from "../components";
import { useAuth } from "../hooks/useAuth";

export const EditPassword = () => {

  const [password, setPassword] = useState({
    pwd_current: "",
    pwd_new: "",
  });
  const [alerta, setAlerta] = useState({});

  const { changePassword } = useAuth();

  const onChagePassword = async (e) => {
    e.preventDefault();

    if([password.pwd_current, password.pwd_new].includes("")){
      return setAlerta({msg: "Your password is required", error: true});
    }

    if(password.pwd_new.length < 6){
      return setAlerta({msg: "Your new password must be at least 6 characters", error: true});
    }

    const result = await changePassword(password);

    setAlerta(result);

    setPassword({
      pwd_current: "",
      pwd_new: "",
    });
  }

  const { msg } = alerta || {};
  
  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">
      
    <h2
      className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
    >Change Your <span className="text-sky-400">Password</span></h2>

    <div className="w-full mt-10 max-w-md">
      <form action=""
        className="w-full h-auto pt-5 pb-10 px-5 rounded-3xl bg-zinc-950 mb-5"
        onSubmit={onChagePassword}
        >
        <label htmlFor=""
          className="text-xl block text-zinc-400 font-semibold pl-4"
          >Current password</label>
        <input type="password"
          placeholder="Enter your current password" 
          className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-yellow-500 placeholder-zinc-800 bg-black rounded-xl transition"
          name="pwd_current"
          value={password.pwd_current}
          onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}
          />

        <label htmlFor=""
          className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
          >New password</label>
        <input type="password"
          placeholder="Enter your new password" 
          className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-yellow-500 placeholder-zinc-800 bg-black rounded-xl transition"
          name="pwd_new"
          value={password.pwd_new}
          onChange={(e) => setPassword({...password, [e.target.name]: e.target.value})}
          />

          <div className="flex justify-center w-1/2 mt-5 h-10 bg-gray-100 hover:bg-red-600 rounded-2xl cursor-pointer transition">
            <input type="submit" 
              value="Confirm"
              className="w-auto h-auto cursor-pointer text-xl font-black text-zinc-900"
            />
          </div>

      </form>

      { msg && 
        <Alerta alerta={alerta} />
      }

    </div>
  </div>
  )
}
