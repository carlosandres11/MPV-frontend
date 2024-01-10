import { usePatients } from "../hooks/usePatients"

export const CardPatient = ({patient}) => {

  const { name, owner, email, telephone, date, symptoms, _id } = patient;

  const { editPatient, deletePatient, setPatientCard, setModeEdit, setModeDelete, setClickDelete, clickDelete, modeEdit, filterEdit, setFilterDelete, patients } = usePatients();

  const formatDate = (dateString) => {
    const fecha = new Date(dateString);

    fecha.setDate(fecha.getDate() + 1);

    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);

    return `${day} / ${month} / ${year}`
  }

  const fnModeEdit = (patient) => {
    setModeEdit(true);
    editPatient(patient);
  }

  const fnDeletePatient = (pat) => {
    
    setModeDelete(true);
    setPatientCard(pat);

    if(modeEdit){
      
      const filter = filterEdit.filter(pati => (
        pati._id !== pat._id
      ));
      setFilterDelete(filter);

      setTimeout(() => {
        const question = confirm("All form data will be deleted");
        
        if(question){
          setModeEdit(false);
          setClickDelete(!clickDelete);
          
          const filter = patients.filter(pati => (pati._id !== pat._id));
          setFilterDelete(filter);

          setTimeout(() => {
            deletePatient(pat._id);  
          }, 100);
  
        } else {
          setModeDelete(false);
        }
      }, 300);

    } else {
      const filter = patients.filter(pati => (pati._id !== pat._id));
      setFilterDelete(filter);

      setTimeout(() => {
        deletePatient(pat._id);  
      }, 500);
    }
  }

  return (
    <div className="min-w-full bg-black px-2 py-4 rounded-2xl h-min">

            <div className="px-2 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-yellow-500">Name :</label>
              <p className="inline text-zinc-400 text-sm"> {name}</p>
            </div>

            <div className="block mt-1 px-2 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-orange-500">Owner :</label>
              <p className="inline text-zinc-400 text-sm"> {owner}</p>
            </div>

            <div className="block mt-1 px-2 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-red-600">Email :</label>
              <p className="inline text-zinc-400 text-sm"> {email}</p>
            </div>

            <div className="block mt-1 px-2 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-indigo-600">Telephone :</label>
              <p className="inline text-zinc-400 text-sm"> {telephone}</p>
            </div>

            <div className="block mt-1 px-2 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-sky-400">Date :</label>
              <p className="inline text-zinc-400 text-sm"> {formatDate(date)}</p>
            </div>

            <div className="block mt-1 px-2 pb-1 bg-zinc-950 rounded-lg">
              <label htmlFor="" className="inline text-zinc-600 hover:text-emerald-500">Symptoms :</label>
              <p className="inline text-zinc-400 text-sm"> {symptoms}</p>
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex justify-center w-1/2 mt-3 h-7 bg-gray-100 hover:bg-orange-500 rounded-xl cursor-pointer transition">
                <input type="submit" 
                  value="Edit"
                  className="w-auto h-auto cursor-pointer text-sm font-black text-zinc-900"
                  onClick={() => fnModeEdit({name,owner,email,telephone,date,symptoms, _id})}
                />
                
              </div>
              <div className="flex justify-center w-1/2 mt-3 h-7 bg-gray-100 hover:bg-red-600 rounded-xl cursor-pointer transition">
              <input type="submit" 
                value="Delete"
                className="w-auto h-auto cursor-pointer text-sm font-black text-zinc-900"
                onClick={() => fnDeletePatient({name,owner,email,telephone,date,symptoms, _id})}
              />
              
              </div>
            </div>
            
          </div>
  )
}
