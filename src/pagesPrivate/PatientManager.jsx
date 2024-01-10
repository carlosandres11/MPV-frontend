import { useState } from "react"
import { Form, CardPatients } from "../components"

export const PatientManager = () => {

  const [hide, sethide] = useState(false);

  return (
    <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-5 mt-10 px-10 xl:px-28">

      <button className={`${ hide ? 'bg-zinc-100' : 'bg-zinc-900 text-zinc-500'} block mb-5 md:hidden w-full h-10  hover:opacity-95 transition text-lg font-bold rounded-xl`}
        onClick={() => sethide(!hide)}
      >{ hide ? 'Show Form' : 'Hide Form' }</button>

      <div className={`${ hide ? 'hidden' : 'block'}  xl:max-w-xl w-full ml-auto md:block no-select`}>
        <Form />
      </div>

      <CardPatients />
      
    </div>
  )
}