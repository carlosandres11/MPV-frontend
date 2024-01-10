import { usePatients } from "../hooks/usePatients";

export const CardPatientEdit = ({patient}) => {

  const { name, owner, email, telephone, date, symptoms, _id } = patient;

  const formatDate = (dateString) => {
    const fecha = new Date(dateString);

    fecha.setDate(fecha.getDate() + 1);

    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);

    return `${day} / ${month} / ${year}`
  }

  const { setClickEdit, deletePatient, setModeDelete, setModeEdit, setPatientCard, patients, setFilterDelete } = usePatients();

  const fnClickDelete = (pat) => {
    setModeDelete(true);
    setModeEdit(false);

    setPatientCard(pat);

    const filter = patients.filter(pati => pati._id !== pat._id);
    setFilterDelete(filter);

    setTimeout(() => {
      deletePatient(pat._id);
    }, 500);
  }

  return (
    <div className="min-w-full bg-orange-600 bg-opacity-90 px-2 py-4 rounded-2xl h-min">

            <div className="px-2 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-yellow-500">Name :</label>
              <p className="inline text-orange-200 text-sm"> {name}</p>
            </div>

            <div className="block mt-1 px-2 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-orange-500">Owner :</label>
              <p className="inline text-orange-200 text-sm"> {owner}</p>
            </div>

            <div className="block mt-1 px-2 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-red-500">Email :</label>
              <p className="inline text-orange-200 text-sm"> {email}</p>
            </div>

            <div className="block mt-1 px-2 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-indigo-600">Telephone :</label>
              <p className="inline text-orange-200 text-sm"> {telephone}</p>
            </div>

            <div className="block mt-1 px-2 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-sky-400">Date :</label>
              <p className="inline text-orange-200 text-sm"> {formatDate(date)}</p>
            </div>

            <div className="block mt-1 px-2 pb-1 bg-orange-700 rounded-lg">
              <label htmlFor="" className="inline text-orange-950 hover:text-emerald-500">Symptoms :</label>
              <p className="inline text-orange-200 text-sm"> {symptoms}</p>
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex justify-center w-1/2 mt-3 h-7 bg-orange-500 rounded-xl cursor-pointer transition">
                <input type="submit" 
                  value="Edit"
                  className="w-auto h-auto cursor-pointer text-sm font-black text-zinc-900"
                  onClick={() => setClickEdit(true)}
                />
                
              </div>
              <div className="flex justify-center w-1/2 mt-3 h-7 bg-gray-100 hover:bg-red-600 rounded-xl cursor-pointer transition">
              <input type="submit" 
                value="Delete"
                className="w-auto h-auto cursor-pointer text-sm font-black text-zinc-900"
                onClick={() => fnClickDelete({name,owner,email,telephone,date,symptoms,_id})}
              />
              
              </div>
            </div>
            
          </div>
  )
}
