import {createRef, useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/alert'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
    const nameRef = createRef()
    const emailRef = createRef()
    const passswordRef = createRef()
    const passwordConfirmationRef = createRef()

    const [errors, setErrors] = useState([])
    const {register} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault()

        const datas = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passswordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }   
        register(datas, setErrors)
    }

    return (
        <>
            <h1 className='text-4xl font-black'>Crea tu Cuenta</h1>
            <p>Crea tu cuenta completando el formulario </p>
            <div className='bg-white shadow-md rounded-md mt-5 px-5 py-5'>
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errors ? errors.map((error, index) => <Alert key={index}>{error}</Alert>): null}
                    <div className='mb-4'>
                        <label
                            htmlFor="name"
                            className='text-slate-800'
                        >Nombre:</label>
                        <input
                            type="text"
                            id='name'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='name'
                            placeholder='Tu nombre'
                            ref={nameRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor="email"
                            className='text-slate-800'
                        >Email:</label>
                        <input
                            type="email"
                            id='email'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='email'
                            placeholder='Tu Correo Electronico'
                            ref={emailRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor="password"
                            className='text-slate-800'
                        >Contraseña:</label>
                        <input
                            type="password"
                            id='password'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='password'
                            placeholder='Tu Contraseña'
                            ref={passswordRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor="password_confirmation"
                            className='text-slate-800'
                        >Repetir Contraseña:</label>
                        <input
                            type="password"
                            id='password_confirmation'
                            className='mt-2 w-full p-3 bg-gray-50'
                            name='password_confirmation'
                            placeholder='Repetir Contraseña'
                            ref={passwordConfirmationRef}
                        />
                    </div>
                    <input
                        type="submit"
                        value='Crear Cuenta'
                        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                    />
                </form>
            </div>
            <nav className='mt-5'>
                <Link 
                    to='/auth/login'
                    className="text-indigo-400 font-medium"
                >
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}

export default Register
