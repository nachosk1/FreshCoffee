import useSWR from 'swr'
import Product from '../components/Product'
import useKiosk from '../hooks/useKiosk'
import clientAxios from '../config/axios'
import Spinner from '../components/Spinner'

const Home = () => {
  const { categoryCurrent } = useKiosk()

  //Consulta SWR
  const fetcher = () => clientAxios('/api/products').then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/products', fetcher)
  if(isLoading) return <Spinner />

  const products = data.data.filter(product => product.category_id === categoryCurrent.id)

  return (
    <>
      <h1 className='text-4xl font-black'>{categoryCurrent.name}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación.</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {products.map(product => (
          <Product
            key={product.image}
            product={product}
          />
        ))}
      </div>
    </>
  )
}

export default Home
