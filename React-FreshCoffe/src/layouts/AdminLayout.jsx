import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

const AdminLayout = () => {
    useAuth({ middleware: 'admin' })

    return (
        <div className="md:flex">
            <AdminSidebar />
            <main className="flex-1 h-screen overflow-y-auto bg-gray-100 p-2">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
