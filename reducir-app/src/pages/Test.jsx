import "../index.css";
import TestForm from "./TestForm";

export function Test() {

    return (
        <>
        <div className="backgroundDarkGreen shadow-md">
            <div className="container p-6 mx-auto text-white">
                <h1 className="mb-2">Test para medir tu huella de carbono</h1>
            </div>
            <TestForm />
        </div>
        </>
    )


}