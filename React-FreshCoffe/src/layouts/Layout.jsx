import { Outlet } from "react-router-dom"
import Modal from "react-modal"
import useKiosk from '../hooks/useKiosk'
import Sidebar from "../components/Sidebar"
import Summary from "../components/Summary"
import ModalProduct from "../components/ModalProduct"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from "../hooks/useAuth"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')

const Layout = () => {

  const {user, error} = useAuth({middleware: 'auth'})
  const { scrollRef, modal } = useKiosk()

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-2" ref={scrollRef}>
          <Outlet />
        </main>
        <Summary />
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProduct />
      </Modal>

      <ToastContainer />
    </>
  )
}

export default Layout
