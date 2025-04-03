import logo from './../covers/logo-horizontal.png';
import { Link } from "react-router-dom";
import Heading from "../components/Base/Heading";

export function Welcome() {

    return (
        <div className="container p-8 mx-auto min-h-screen max-w-fit backgroundTramaWhite bg-[#f4f4f4]">
            <div className="backgroundWhite mt-2 rounded-2xl shadow-md min-w-md container mx-auto max-w-2xl p-8 flex flex-col gap-3">
                <div className="flex justify-center w-full p-2">
                    <img src={logo} alt="Logo de Reducir" />
                </div>
                <Heading
                    tag="h1"
                    size="h6"
                    align="center"
                    className="text-center pb-2 text-lg font-semibold"
                >
                    ¡Bienvenido/a!
                </Heading>

                <p className="mt-2 pb-2 border-b-2 border-gray-300"><strong>Reducir</strong> fue diseñada para ayudarte a <strong>cambiar tus hábitos,</strong> para reducir tu impacto ambiental y así también, <strong>reducir tu huella de carbono</strong>.</p>

                <p>Entonces, para <strong>medir tu huella de carbono</strong>, te invitamos a realizar un <span className="font-bold">test con 3 simples preguntas</span> acerca del transporte, energía y comida por única vez.</p>

                <div className="flex justify-center mt-2 textDarkGreen font-semibold">
                    <Link to="/test">
                        Iniciar test <span className="arrowRightGreen ml-1 -mb-[1px]"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
}






