import { createContext, useState, useRef } from "react";
import { categories as categoriesDB } from '../data/categories'

const KioskContext = createContext()

const KioskProvider = ({ children }) => {
    const scrollRef = useRef(null);
    const [categories, SetCategories] = useState(categoriesDB)
    const [categoryCurrent, setCategoryCurrent] = useState(categories[0])
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState({})

    const handleClickCategory = id => {
        const category = categories.filter(category => category.id === id)[0]
        setCategoryCurrent(category)
        scrollRef.current.scrollTo(0, 0); // al hacer click a la categoria el scroll se va ir arriba
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    return (
        <KioskContext.Provider
            value={{
                categories,
                categoryCurrent,
                handleClickCategory,
                scrollRef,
                handleClickModal,
                modal,
                product,
                handleSetProduct
            }}
        >{children}</KioskContext.Provider>
    )
}

export {
    KioskProvider
}
export default KioskContext