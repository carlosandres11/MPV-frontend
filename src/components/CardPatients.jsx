import { CardPatient } from "./CardPatient"
import { CardPatientEdit } from "./CardPatientEdit";
import { usePatients } from "../hooks/usePatients";
import { CardPatientDelete } from "./CardPatientDelete";

export const CardPatients = () => {

  const { modeEdit, modeDelete, patients, patient, patientCard, filterEdit, filterDelete } = usePatients()

  return (
    <div>

        <h2 className="text-3xl font-black text-zinc-100 text-center no-select">Card Patients</h2>

        <div className={`${patients.length ? 'grid-cols-2' : 'grid-cols-1'} grid gap-2 xl:pt-10 xl:gap-8 xl:px-12 px-5 py-5 mt-10 bg-zinc-950 rounded-3xl w-full max-h-screen overflow-y-auto`}>

          { modeEdit &&
            <CardPatientEdit 
              key={patient._id}
              patient={patient}
            />
          }

          { modeDelete &&
            <CardPatientDelete 
              key={patientCard._id}
              patient={patientCard}
            />
          }


          { modeEdit && !modeDelete &&
            filterEdit.map(pat => (
              <CardPatient key={pat._id}
                patient={pat}
              />
            ))
          }

          { modeDelete && !modeEdit &&
            filterDelete.map(pat => (
              <CardPatient key={pat._id}
                patient={pat} 
              />
            ))
          }

          { modeEdit && modeDelete && 
            filterDelete.map(pat => (
              <CardPatient key={pat._id}
                patient={pat}
              />
            ))
          }

          { !modeEdit && !modeDelete &&
            patients.map(pat => (
              <CardPatient 
                key={pat._id}
                patient={pat}
              />
            ))
          }


          { !patients.length && 
            <p className="text-base font-thin text-zinc-700 text-center"
            >No patients yet</p>
          }
        
          
        </div>
      </div>
  )
}
