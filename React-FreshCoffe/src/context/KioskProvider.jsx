import { createContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import clientAxios from '../config/axios'

const KioskContext = createContext()

const KioskProvider = ({ children }) => {
    const scrollRef = useRef(null);
    const [categories, SetCategories] = useState([])
    const [categoryCurrent, setCategoryCurrent] = useState({})
    const [modal, setModal] = useState(false)
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)

    // cada vez que el pedido cambie va a calcular el total
    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.amount) + total, 0)
        setTotal(newTotal)
    }, [order])

    const getCategory = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clientAxios('/api/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            SetCategories(data.data)
            setCategoryCurrent(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])



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

    const handleAddOrder = ({ category_id, ...product }) => {

        if (order.some(orderState => orderState.id === product.id)) {
            // si esta en el pedido
            const orderUpdate = order.map(orderState => orderState.id === product.id ? product : orderState)
            toast.success('Guardado Correctamente')
            setOrder(orderUpdate)
        } else {
            setOrder([...order, product])  //de esta forma se puede agregar la informacion dentro de un arreglo sin que se convierta en un un objeto
            toast.success('Agregado al pedido')
        }
    }

    const handleEditAmount = id => {
        const productUpdate = order.filter(product => product.id === id)[0]
        setProduct(productUpdate)
        setModal(!modal)
    }

    const handleDeleteProductOrder = id => {
        const orderUpdate = order.filter(product => product.id !== id)
        setOrder(orderUpdate)
        toast.success('Eliminado del Pedido')
    }

    const handleSubmitNewOrder = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clientAxios.post('/api/orders', {
                total,
                products: order.map(product => {
                    return {
                        id: product.id,
                        amount: product.amount
                    }
                })
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(data.message);
            setTimeout(() => {
                setOrder([])
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClickCompleteOrder = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clientAxios.put(`/api/orders/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickOutOfStock  = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clientAxios.put(`/api/products/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
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
                handleSetProduct,
                order,
                handleAddOrder,
                handleEditAmount,
                handleDeleteProductOrder,
                total,
                handleSubmitNewOrder,
                handleClickCompleteOrder,
                handleClickOutOfStock
            }}
        >{children}</KioskContext.Provider>
    )
}

export {
    KioskProvider
}
export default KioskContext