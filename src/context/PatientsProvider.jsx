import { createContext, useEffect, useState } from "react"

import { clienteAxios } from "../config/axios";
import { useAuth } from "../hooks/useAuth";

const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});
  
    const [patientCard, setPatientCard] = useState({});
    const [filterEdit, setFilterEdit] = useState([]);
    const [filterDelete, setFilterDelete] = useState([]);


    const [modeEdit, setModeEdit] = useState(false);
    const [clickEdit, setClickEdit] = useState(false);
    const [modeDelete, setModeDelete] = useState(false);
    const [clickDelete, setClickDelete] = useState(false);

    const { auth } = useAuth()

    useEffect(() => {
        const getPatients = async () => {
            const token = localStorage.getItem("token");
            
            if(!token) return 
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios("/patients", config)
                setPatients(data)
            } catch (error) {
                console.log(error);
            }
        }
        getPatients()
    }, [auth]);

    const managePatient = async (patient) => {

        const token = localStorage.getItem("token");
        if(!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(patient.id){
            try {
                const { data } = await clienteAxios.put(`/patients/${patient.id}`,patient, config)
    
                const update = patients.map( pat => pat._id === data._id ? data : pat );

                setPatients(update);
                
                setModeEdit(false);
                setClickEdit(false);

            } catch (error) {
                console.log(error);
            }
        } else {
            const {id, ...pat} = patient
            try {
                const { data } = await clienteAxios.post(`/patients`, pat, config);
    
                setPatients([data, ...patients]);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const editPatient = (patient) => {
        setPatient(patient);
        
        const filter = patients.filter(pat => pat._id !== patient._id);
        setFilterEdit(filter);
    }
    
    const deletePatient = async (id) => {

        const question = confirm("Are you sure you want to delete this patient?")

        if(question){

            const token = localStorage.getItem("token");
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
            
            try {
                await clienteAxios.delete(`/patients/${id}`, config);

                const update = patients.filter(pat => pat._id !== id);

                setPatients(update);

                setModeDelete(false);
                setModeEdit(false);

                setClickDelete(!clickDelete);
            } catch (error) {
                console.log(error);
            }

          } else {
            setModeDelete(false);
            setModeEdit(false);
            setClickDelete(!clickDelete);
        }
    }

  return (
    <PatientsContext.Provider
        value={{
            patients,
            managePatient,
            editPatient,
            deletePatient,
            patient,
            setModeEdit,
            modeEdit,
            setClickEdit,
            clickEdit,
            setModeDelete,
            modeDelete,
            clickDelete,
            setClickDelete,
            patientCard,
            filterEdit,
            setPatientCard,
            setFilterEdit,
            setFilterDelete,
            filterDelete,
        }}
    >{children}</PatientsContext.Provider>
  )
}

export default PatientsContext