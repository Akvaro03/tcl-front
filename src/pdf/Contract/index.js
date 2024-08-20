import { useEffect, useState } from "react";
import getIp from "../../hooks/getIp";

function ContractPDF({ contractName }) {
    const [Contract, setContract] = useState()
    console.log(contractName)
    useEffect(() => {
        const getContract = async () => {
            const response = await fetch(`${getIp()}:4000/getContract`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Name: JSON.parse(contractName).url })
            });

            if (!response.ok) {
                throw new Error('Error al obtener la imagen del contrato');
            }

            const imageData = await response.blob();
            const imageSrc = URL.createObjectURL(imageData);
            setContract(imageSrc);
        }
        getContract()
    }, [contractName])

    return (
        Contract && <img src={Contract} alt='company logo' style={{ height: "100vh" }} />
    );
}

export default ContractPDF;