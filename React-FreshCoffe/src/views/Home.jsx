import Product from '../components/Product'
import { products as data } from '../data/products'
import useKiosk from '../hooks/useKiosk'


const Home = () => {
  const {categoryCurrent} = useKiosk()

  const product = data.filter(product => product.category_id === categoryCurrent.id)

  return (
    <>
      <h1 className='text-4xl font-black'>{categoryCurrent.name}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación.</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {product.map(product => (
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
