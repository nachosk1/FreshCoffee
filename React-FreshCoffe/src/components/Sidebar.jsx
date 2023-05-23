import { categories } from '../data/categories'
import Category from './Category'

const Sidebar = () => {
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    src="img/logo.svg" 
                    alt="Image Logo" 
                    className="w-40"
                />
            </div>
            <div className='mt-10'>
                {categories.map(categories => (
                    <Category 
                        categories={categories}
                        key={categories.id}
                    />
                ))}
            </div>
            <div className='my-5 px-5'>
                <button 
                    type='button'
                    className='text-center bg-red-500 w-full p-3 font-bold text-white truncate hover:bg-red-600'
                >
                    Cancelar Orden
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
