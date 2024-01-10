import { useEffect, useState } from "react"

import { useAuth } from "../hooks/useAuth";
import { Alerta } from "../components";

export const EditProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [web, setWeb] = useState("");
  const [alerta, setAlerta] = useState({});

  const { auth, saveProfile } = useAuth()

  useEffect(() => {
    setName(auth.name);
    setEmail(auth.email);
    setTelephone(auth.telephone);
    setWeb(auth.web);
  }, [auth]);

  const onSaveProfile = (e) => {
    e.preventDefault();

    if([name,email].includes("")){
      return setAlerta({msg: "Name and email spaces are required", error: true});
    }

    saveProfile({name,email,telephone,web});

    setAlerta({msg: "Profile correctly saved"})
  };

  const { msg } = alerta || {};

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:mt-28 items-center md:gap-5 mt-10 px-10 no-select">
      <h2
      className="text-3xl xl:pl-32 md:text-6xl font-black text-gray-100 text-center"
      >Edit Your <span className="text-green-400">Profile</span></h2>

      <div className="w-full mt-10 max-w-md">
        <form action=""
          className="w-full h-auto pt-5 pb-10 px-5 rounded-3xl bg-zinc-950 mb-5"
          onSubmit={onSaveProfile}
          >
          <label htmlFor=""
            className="text-xl block text-zinc-400 font-semibold pl-4"
            >Name</label>
          <input type="text"
            placeholder="Enter the pet's name" 
            className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-pink-500 placeholder-zinc-800 bg-black rounded-xl transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Email</label>
          <input type="email"
          placeholder="Enter your email address" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 bg-black rounded-xl placeholder-zinc-800 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Telephone</label>
          <input type="text"
          placeholder="Enter your phone number" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 bg-black rounded-xl placeholder-zinc-800 transition"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Web</label>
          <input type="text"
          placeholder="Enter your website" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 bg-black rounded-xl placeholder-zinc-800 transition"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
            />

            <div className="flex justify-center w-1/2 mt-5 h-10 bg-gray-100 hover:bg-pink-500 rounded-2xl cursor-pointer transition">
              <input type="submit" 
                value="Save profile"
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
