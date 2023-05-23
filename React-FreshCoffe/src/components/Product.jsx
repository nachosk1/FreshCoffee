import { formatMoney } from "../helpers";


const Product = ({ product }) => {
    const { name, price, image } = product;
    return (
        <div className='border p-3 shadow bg-white'>
            <img
                src={`/img/${image}.jpg`}
                alt={`imagen ${name}`}
                className='w-full' />
            <div>
                <h3 className='text-2xl font-bold'>{name}</h3>
                <p className='mt-5 font-black text-4xl text-amber-500'>{formatMoney(price)}</p>
                <button 
                    type="button" 
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default Product
