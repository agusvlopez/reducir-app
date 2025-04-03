import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import warningIcon from "../covers/icons/warning-icon.png";
import logo from '../covers/logo-horizontal.png';
import { useCreateSessionMutation } from "../features/fetchFirebase";
import Input from "../components/Base/Input";
import CustomButton from "../components/Base/CustomButton";

export function Login() {
    const navigate = useNavigate();
    const [createSession, { isLoading, error }] = useCreateSessionMutation();

    const [validationMessage, setValidationMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            setValidationMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            const result = await createSession({ email, password }).unwrap();

            localStorage.setItem('token', result.session.token);
            localStorage.setItem('email', result.session.account.email);
            localStorage.setItem('carbon', result.session.account.carbon);
            localStorage.setItem('favorites', result.session.account.favorites);
            localStorage.setItem('achievements', result.session.account.achievements);
            localStorage.setItem('role', result.session.account.role);
            localStorage.setItem('_id', result.session.account._id);
            navigate(`/perfil/${result.session.account._id}`);
        } catch (err) {
            setValidationMessage("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    return (
        <>
            <div className="p-8 mx-auto min-h-screen backgroundTrama">
                <div className="container max-w-sm mx-auto backgroundWhite p-6 rounded-[24px] shadow-sm flex flex-col gap-3">

                    <div className="flex justify-center p-1">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1 className="text-lg text-center text-[#383838]">¡Bienvenido/a de vuelta!</h1>

                    {validationMessage && (
                        <div className="mb-4 flex items-center justify-center text-red-500 text-xs">
                            <img src={warningIcon} className="mr-1 w-6 h-6" alt="Warning Icon" />
                            <span>{validationMessage}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 flex items-center justify-center text-red-500">
                            <span>Error al iniciar sesión. Verifica tus credenciales.</span>
                        </div>
                    )}
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-3"
                    >
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
                        <Link className="text-center text-sm">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <div className="flex justify-center mt-1">
                            <CustomButton
                                type="submit"
                                variant="white">
                                {isLoading ? "Cargando..." : "Iniciar sesión"}
                            </CustomButton>
                        </div>
                    </form>
                    <div>
                        <p className="text-center mt-9 text-sm">¿Aún no tenés una cuenta?</p>
                        <span className="flex justify-center mt-1">
                            <Link to="/registrarse" className="textDarkGreen font-semibold">
                                Registrarse
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;