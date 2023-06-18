import useSWR from 'swr'
import clientAxios from '../config/axios'
import Spinner from '../components/Spinner'
import { formatMoney } from '../helpers'
import useKiosk from '../hooks/useKiosk'

const Admin = () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clientAxios('/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 })
    const { handleClickCompleteOrder } = useKiosk()
    if (isLoading) return <Spinner />

    return (
        <div>
            <h1 className='text-4xl font-black'>Ordenes</h1>
            <p className='text-2xl my-10'>Administra las ordenes desde aqui</p>

            <div>
                {data.data.data.map(order => (
                    <div key={order.id} className='p-5 bg-white shadow space-y-2 border-b'>
                        <p className='text-xl font-bold text-slate-600'>
                            Contenido del Pedido:
                        </p>
                        {order.products.map(product => (
                            <div className='border-b border-b-slate-200 last-of-type:border-none py-4' key={product.id}>
                                <p className='text-sm'>ID: {product.id}</p>
                                <p>{product.name}</p>
                                <p>
                                    Cantidad: {''}
                                    <span className='font-bold'>{product.pivot.amount}</span>
                                </p>
                            </div>
                        ))}
                        <p className='text-lg font-bold text-slate-600'>
                            Cliente: {''}
                            <span className='font-normal'>{order.user.name}</span>
                        </p>
                        <p className='text-lg font-bold text-amber-500'>
                            Total a Pagar: {''}
                            <span className='font-normal text-slate-600'>{formatMoney(order.total)}</span>
                        </p>
                        <button
                            type="button"
                            className='bg-indigo-600 hover:bg-indigo-800 cursor-pointer px-5 py-2 rounded uppercase font-bold text-white text-center'
                            onClick={() => handleClickCompleteOrder(order.id)}
                        >Completar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin
