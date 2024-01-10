import { createContext, useEffect, useState } from "react"
import { clienteAxios } from "../config/axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getAuth = async () => {
        const token = localStorage.getItem("token");
        if(!token) return setIsLoading(false);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        try {
          const { data } = await clienteAxios(`/veterinarians/profile`, config);
          setAuth(data);
        } catch (error) {
          console.log(error);
          setAuth({});
        }
        setIsLoading(false);
      } 
      getAuth()
    }, []);

    const saveProfile = async (datos) => {
      const token = localStorage.getItem("token");
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data } = await clienteAxios.put(`/veterinarians/edit-profile/${auth._id}`, datos, config);

        setAuth(data);
      } catch (error) {
        console.log(error);
      }
    } 
    
    const changePassword = async (password) => {
      const token = localStorage.getItem("token");
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios.put(`/veterinarians/change-password`, password, config);

        return{
          msg: data.msg,
          error: false,
        }
        
      } catch (error) {
        return{
          msg: error.response.data.msg,
          error: true,
        }
      }
    }

    const logOut = () => {
      setAuth({});
      localStorage.removeItem("token");
    }
    
  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            setIsLoading,
            isLoading,
            saveProfile,
            changePassword,
            logOut,
        }}
    >{children}</AuthContext.Provider>
  )
}

export default AuthContext;