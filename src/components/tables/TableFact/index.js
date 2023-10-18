import formatDateM from "../../../hooks/formatDateM";

export default function TableFact({ data, Colum, dataHover, recharge }) {
    return (
        <>
            <Colum data={data.id} width="15%" />
            <Colum data={formatDateM(data.dateCreated)} width="9%" />
            <Colum data={formatDateM(data.dateExpiration)} width="20%" />
            <Colum data={data.datePay === null ? "No se Cobró" : formatDateM(data.datePay)} width="15%" />
        </>
    )
}