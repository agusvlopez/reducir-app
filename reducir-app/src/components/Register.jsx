import React, { useState, useRef } from "react";
import warningIcon from './../covers/icons/warning-icon.png';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import NavbarWeb from "./NavbarWeb";
import { useAuth } from "../context/AuthContext";
import logo from '../covers/logo-horizontal.png';
import { useCreateAccountMutation } from "../features/fetchFirebase";

export function Register() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [createAccount] = useCreateAccountMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [rol, setRol] = useState("");
    const [carbon, setCarbon] = useState(0);
    const [validationMessage, setValidationMessage] = useState("");
    //console.log(emailRegister, passwordRegister, "Estados del formulario en registro");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password || !passwordConfirm) {
            setValidationMessage("Todos los campos son obligatorios.");
            return;
        }

        if (password !== passwordConfirm) {
            setValidationMessage("Las contraseñas no coinciden.");
            return;
        }
        if (password.length < 6 || passwordConfirm < 6) {
            setValidationMessage("La contraseña debe tener como mínimo 6 caracteres.");
            return;
        }

        const account = { email, password, carbon, favorites, achievements };
        console.log("account", account);
        try {
            // Tu lógica de registro aquí...
            //await auth.register(emailRegister, passwordRegister, favorites, "usuario", carbon);
            const result = await createAccount(account);
            console.log("result", result);
            localStorage.setItem('token', result.data.account.token);
            localStorage.setItem('email', result.data.account.email);
            localStorage.setItem('favorites', result.data.account.favorites);
            localStorage.setItem('achievements', result.data.account.achievements);
            localStorage.setItem('role', result.data.account.role);
            localStorage.setItem('_id', result.data.account._id);

            navigate("/bienvenida");
        } catch (error) {
            setValidationMessage("Error al registrar. Inténtalo de nuevo.");
            console.log("error", error);
        }
        // auth.register(emailRegister, passwordRegister, favorites);
    }

    return (
        <>
            <div className="p-8 mx-auto min-h-screen backgroundTrama">
                <div className="container max-w-sm mx-auto backgroundWhite p-6 mt-2 rounded-[24px] shadow-sm">
                    <div className="p-2">
                        <div className="flex justify-center mb-4">
                            <img src={logo} />
                        </div>

                    </div>
                    <h1 className="text-2xl mt-1 mb-2 text-center">Registrarse</h1>
                    {validationMessage && (
                        <div className="mb-4 mt-4 flex items-center justify-center text-red-500">
                            <img src={warningIcon} className="mr-2 w-8 h-8" />
                            <span><span className="font-bold">¡Atención!</span> {validationMessage}</span>
                        </div>
                    )}

                    <form action=""
                        method=""
                        onSubmit={(e) => handleRegister(e)}
                    >
                        <div className="mb-3">
                            <label htmlFor="name" className="mb-2 text-sm">Nombre</label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                placeholder="Ingresá tu nombre"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="mb-2 text-sm">Email</label>
                            <input
                                onChange={handleEmailChange}
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Ingresá tu email"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="mb-2 text-sm">Contraseña</label>
                            <input
                                onChange={handlePasswordChange}
                                name="password"
                                type="password"
                                id="password"
                                placeholder="Ingresá tu contraseña"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="passwordConfirm" className="mb-2 text-sm">Confirmar contraseña</label>
                            <input
                                name="confirm_password"
                                onChange={handlePasswordConfirm}
                                type="password"
                                id="passwordConfirm"
                                placeholder="Confirmá tu contraseña"
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <Button type="submit" className="backgroundDarkGreen text-white"
                                value="registrarse">
                                Registrarse
                            </Button>
                        </div>
                    </form>
                    <div className="text-center mt-8">¿Ya tenés una cuenta?
                        <Link className="pl-2 textDarkGreen font-bold" to="/iniciar-sesion">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;