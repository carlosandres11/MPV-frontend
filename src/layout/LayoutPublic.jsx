import { Outlet,Link } from "react-router-dom"

const LayoutPublic = () => {
  return (
    <div className="w-full min-h-screen opacity-95 bg-black">
        <div className="w-full bg-zinc-950 h-20 border-b-4 border-zinc-900">
        <Link to="/"
            className="block text-6xl font-black text-gray-100 text-center pt-1 hover:opacity-95"
          >MPV</Link>
        </div>
        <Outlet />
    </div>
  )
}

export default LayoutPublic