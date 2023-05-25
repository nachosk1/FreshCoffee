import { Outlet } from "react-router-dom"
import Modal from "react-modal"
import useKiosk from '../hooks/useKiosk'
import Sidebar from "../components/Sidebar"
import Summary from "../components/Summary"
import ModalProduct from "../components/ModalProduct"

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
  const { scrollRef, modal, handleClickModal, product } = useKiosk()
  console.log(product)
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
    </>
  )
}

export default Layout
