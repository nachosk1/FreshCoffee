import React from 'react'

const Category = ({ categories }) => {
    const { name, id, icon } = categories;
    return (
        <div className='flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer'>
            <img
                src={`/img/icono_${icon}.svg`}
                alt={`imagen icono ${name}`}
                className='w-12'
            />
            <p className='text-lg font-bold cursor-pointer truncate'>{name}</p>
        </div>
    )
}

export default Category
