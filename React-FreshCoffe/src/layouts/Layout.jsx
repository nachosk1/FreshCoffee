import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Summary from "../components/Summary"
import useKiosk from '../hooks/useKiosk'

const Layout = () => {
  const {scrollRef, modal} = useKiosk()
  console.log(modal)
  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-2" ref={scrollRef}>
        <Outlet />
      </main>
      <Summary />
    </div>
  )
}

export default Layout
