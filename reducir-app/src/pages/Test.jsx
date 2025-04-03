import "../index.css";
import TestForm from "../components/Test/TestForm";
import Heading from "../components/Base/Heading";

export function Test() {

    return (
        <>
            <div className="backgroundDarkGreen shadow-md">
                <div className="container p-6 mx-auto text-white">
                    <Heading
                        tag="h1"
                        size="h6"
                        color="white"
                        className="mb-2">Test para medir tu huella de carbono</Heading>
                </div>
                <TestForm />
            </div>
        </>
    )


}