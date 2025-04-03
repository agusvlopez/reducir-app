import { useState } from "react";
import warningIcon from './../covers/icons/warning-icon.png';
import { Link, useNavigate } from "react-router-dom";
import logo from '../covers/logo-horizontal.png';
import { useCreateAccountMutation } from "../features/fetchFirebase";
import Input from "../components/Base/Input";
import CustomButton from "../components/Base/CustomButton";

const favorites = [];
const achievements = [];
const carbon = 0;

export function Register() {
    const navigate = useNavigate();
    const [createAccount] = useCreateAccountMutation();
    const [validationMessage, setValidationMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('password_confirm');


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

        try {
            const result = await createAccount(account);
            localStorage.setItem('token', result.data.account.token);
            localStorage.setItem('email', result.data.account.email);
            localStorage.setItem('favorites', result.data.account.favorites);
            localStorage.setItem('achievements', result.data.account.achievements);
            localStorage.setItem('role', result.data.account.role);
            localStorage.setItem('_id', result.data.account._id);

            navigate("/bienvenida");
        } catch (error) {
            setValidationMessage("Error al registrar. Inténtalo de nuevo.");
        }
    }

    return (
        <>
            <div className="p-8 mx-auto min-h-screen backgroundTrama">
                <div className="container max-w-sm mx-auto backgroundWhite p-6 mt-2 rounded-[24px] shadow-sm">
                    <div className="p-2 pt-0">
                        <div className="flex justify-center mb-4">
                            <img src={logo} />
                        </div>

                    </div>
                    <h1 className="invisible h-0">Registrarse</h1>
                    {validationMessage && (
                        <div className="my-2 flex items-center justify-center text-red-500 text-xs">
                            <img src={warningIcon} className="mr-1 w-6 h-6" />
                            <span> {validationMessage}</span>
                        </div>
                    )}

                    <form action=""
                        method=""
                        onSubmit={(e) => handleRegister(e)}
                        className="flex flex-col gap-3"
                    >
                        <Input
                            label="Nombre"
                            inputName="name"
                            inputId="name"
                            inputPlaceholder="Ingresá tu nombre"
                        />
                        <Input
                            label="Email"
                            inputName="email"
                            inputId="email"
                            inputPlaceholder="Ingresá tu email"
                        />
                        <Input
                            label="Contraseña"
                            inputName="password"
                            inputType="password"
                            inputId="password"
                            inputPlaceholder="Ingresá tu contraseña"
                        />
                        <Input
                            label="Confirmar contraseña"
                            inputName="password_confirm"
                            inputType="password"
                            inputId="passwordConfirm"
                            inputPlaceholder="Confirmá tu contraseña"
                        />
                        <div className="flex justify-center mt-2">
                            <CustomButton
                                type="submit"
                                variant="filled"
                            >
                                Registrarse
                            </CustomButton>
                        </div>
                    </form>
                </div>
                <p className="text-center mt-6 text-sm text-white">
                    ¿Ya tenés una cuenta?
                    <Link className="pl-2 font-bold" to="/iniciar-sesion">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Register;