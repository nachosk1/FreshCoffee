
import useKiosk from '../hooks/useKiosk';

const Category = ({ categories }) => {
    const {handleClickCategory, categoryCurrent} = useKiosk()
    const { name, id, icon } = categories;

    return (
        <button className={`${categoryCurrent.id === id ? 'bg-amber-400' : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`} type='button' onClick={() => handleClickCategory(id)}>
            <img
                src={`/img/icono_${icon}.svg`}
                alt={`imagen icono ${name}`}
                className='w-12'
            />
            <p className='text-lg font-bold cursor-pointer truncate'>
                {name}
            </p>
        </button>
    )
}

export default Category
