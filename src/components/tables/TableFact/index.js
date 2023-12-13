import formatDateM from "../../../hooks/formatDateM";

export default function TableFact({ data, Colum, dataHover, recharge }) {
    const expired = data.datePay === null && new Date(data.dateExpiration).getTime() < Date.now() ? true : false
    return (
        <>
            <Colum data={data.id} width="15%" />
            <Colum data={formatDateM(data.dateCreated)} width="9%" />
            <Colum data={formatDateM(data.dateExpiration)} width="20%" />
            <Colum color={expired ? "#e50b0b" : "black"} data={data.datePay === null ? "No se Cobró" : formatDateM(data.datePay)} width="15%" />
            <Colum data={data.OTFact.join(", ")} width="35%" />
        </>
    )
}