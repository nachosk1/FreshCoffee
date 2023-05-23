import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <main className="max-w-4xl m-auto flex flex-col md:flex-row items-center h-screen">
      <img src="../img/logo.svg" alt="image logotype" className="max-w-xs mt-4 md:mt-0"/>
      <div className="md:p-10 p-5 w-full mt-5 md:mt-0">
        <Outlet />
      </div>
      
    </main>
  )
}

export default AuthLayout
