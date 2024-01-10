import { useContext } from "react"
import PatientsContext from "../context/PatientsProvider"

export const usePatients = () => {
    return useContext(PatientsContext)
}
