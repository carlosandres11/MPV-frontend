import { useEffect, useState } from "react"

import { Alerta } from "../components/"
import { usePatients } from "../hooks/usePatients";

export const Form = () => {

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({});

  const { managePatient, patient, clickEdit, clickDelete, setClickDelete, modeEdit } = usePatients()

  const onManagePatient = async (e) => {
    e.preventDefault();

    if([name,owner,email,telephone,date,symptoms].includes("")){
      setAlerta({msg: "All the spaces are important", error: true});
      return setTimeout(() => {
        setAlerta({});
      }, 2000);
    }

   await managePatient({name,owner,email,telephone,date,symptoms,id});

   setClickDelete(!clickDelete);

  }

  useEffect(() => {
    if(patient?.name){
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setTelephone(patient.telephone);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
      setId(patient._id);
    }
  }, [patient]);

useEffect(() => {
  const clickSavePatient = async () => {
    if(clickEdit){

      const question = confirm("Are you sure you want to save this patient right now?")

      if(question){
        await managePatient({name,owner,email,telephone,date,symptoms,id});

        setClickDelete(!clickDelete);
        
      }
    }
  }
  clickSavePatient();
}, [clickEdit]);


useEffect(() => {
  setName("");
  setOwner("");
  setEmail("");
  setTelephone("");
  setDate("");
  setSymptoms("");
  setId("");
}, [clickDelete])
  

  const { msg } = alerta || {};

  return (
    <>
      <h2
      className="text-3xl font-black text-gray-100 text-center"
      >Patient Form<span className="text-green-400"></span></h2>

      <div className="w-full mt-10 mb-10">
        <form action=""
          className="w-full h-auto pt-5 pb-10 px-5 rounded-3xl bg-zinc-950 mb-5"
          onSubmit={onManagePatient}
          >
          <label htmlFor=""
            className="text-xl block text-zinc-400 font-semibold pl-4"
            >Name</label>
          <input type="text"
            placeholder="Enter the pet's name" 
            className="w-full mt-2 h-10 px-5 text-zinc-500 hover:text-yellow-500 placeholder-zinc-800 bg-black rounded-xl transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Owner</label>
          <input type="text"
          placeholder="Enter the owner's name" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-orange-500 bg-black rounded-xl placeholder-zinc-800 transition"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Email</label>
          <input type="email"
          placeholder="Enter the email address" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-red-600 bg-black rounded-xl placeholder-zinc-800 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Telephone</label>
          <input type="text"
          placeholder="Enter the phone number" 
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-indigo-600 bg-black rounded-xl placeholder-zinc-800 transition"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Date</label>
          <input type="date"
            className="w-full mt-2 h-10 px-5 text-zinc-400 hover:text-sky-400 divide-red-100 bg-zinc-900 rounded-xl "
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />

          <label htmlFor=""
            className="text-xl mt-4 block text-zinc-400 font-semibold pl-4"
            >Symptoms</label>
          <textarea type="text"
          placeholder="Enter the pet's symptoms" 
            className="w-full mt-2 h-10 py-2 px-5 text-zinc-400 hover:text-emerald-500 bg-black rounded-xl placeholder-zinc-800 transition"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            ></textarea>
            

            <div className={`${modeEdit ? 'hover:bg-green-500' : 'hover:bg-pink-500'} flex justify-center w-1/2 mt-5 h-10 bg-gray-100  rounded-2xl cursor-pointer transition`}>
              <input type="submit" 
                value={`${modeEdit ? 'Save Patient' : 'Add Patient'}`}
                className="w-auto h-auto cursor-pointer text-xl font-black text-zinc-900"
              />
            </div>

        </form>

        { msg && 
          <Alerta alerta={alerta}/>
        }

      </div>
    </>
  )
}
