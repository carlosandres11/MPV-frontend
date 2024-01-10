import { Outlet,Link, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const LayoutPrivate= () => {
  const { auth, isLoading, logOut } = useAuth();

  if(isLoading) return "...Loading";

  return (
    <>

      <div>
        {auth?.name ? (
          <div className="w-full min-h-screen opacity-95 bg-black">

            <div className="flex flex-row w-full bg-zinc-950 h-20 border-b-4 border-zinc-900">

              <Link to="/admin"
                className="text-6xl pl-5 font-black text-gray-100 text-center pt-1 hover:opacity-95"
                >MPV</Link>

              <div className="inline ml-auto mt-7 pr-5">
                <Link 
                    className="md:inline hidden mr-3 px-5 py-2 bg-black rounded-xl font-extrabold text-base text-gray-100 text-center pt-1 hover:opacity-95"
                    onClick={logOut}
                    >Log Out</Link>

                <Link to="/admin/edit-profile"
                  className="mr-3 px-5 py-2 bg-black rounded-xl font-extrabold text-base text-gray-100 text-center pt-1 hover:opacity-95"
                  >Edit Profile</Link>

                <Link to="/admin/edit-password"
                  className="px-5 py-2 bg-black rounded-xl font-extrabold text-base text-gray-100 text-center pt-1 hover:opacity-95"
                  >Edit Password</Link>
              </div>
            </div>

          <Outlet />
        </div>

        ) : (
    
          <Navigate to="/" />
    
        )}
      </div>
  </>
  )
}

export default LayoutPrivate