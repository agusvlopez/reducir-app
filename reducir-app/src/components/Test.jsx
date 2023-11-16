import "../index.css";
import TestForm from "../pages/backOffice/TestForm";

export function Test() {

    return (
        <>
        <div className="backgroundDarkGreen shadow-md">
            <div className="p-4 text-white">
                <h1>Test</h1>
            </div>
            <TestForm />
        </div>
        </>
    )


}