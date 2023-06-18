import { formatMoney } from "../helpers"
import useKiosk from "../hooks/useKiosk"
import SummaryProduct from "./SummaryProduct"


const Summary = () => {
  const { order, total, handleSubmitNewOrder } = useKiosk()
  const testOrder = () => order.length === 0  //true o false si existe un pedido

  const handleSubmit = e => {
    e.preventDefault()

    handleSubmitNewOrder()
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-2xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">
        Aqui podrás ver el resumen y totales de tu pedido
      </p>
      <div className="py-10">
        {order.length === 0 ? (
          <p className="text-center text-xl">
            No hay elementos en tu pedido aún
          </p>
        ) : (
          order.map(product => (
            <SummaryProduct
              key={product.id}
              product={product}
            />
          ))
        )}
        <p className="text-xl mt-10">
          Total: {''}
          {formatMoney(total)}
        </p>
        <form 
          className="w-full"
          onSubmit={handleSubmit}
        >
          <div className="mt-5">
            <input
              type="submit"
              className={`${testOrder() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full `}
              value='Confirmar Pedido'
              disabled={testOrder()}
            />
          </div>
        </form>
      </div>
    </aside>
  )
}

export default Summary
