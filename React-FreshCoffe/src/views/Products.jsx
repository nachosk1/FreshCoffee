import useSWR from 'swr'
import clientAxios from '../config/axios'
import Product from '../components/Product'
import Spinner from '../components/Spinner'

const Products = () => {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clientAxios('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datas => datas.data)

  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 })

  if (isLoading) return <Spinner />
  return (
    <div>
      <h1 className='text-4xl font-black'>Productos</h1>
      <p className='text-2xl my-10'>Maneja la disponibilidad desde aqui.</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {data.data.map(product => (
          <Product
            key={product.image}
            product={product}
            buttonAvailable={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
