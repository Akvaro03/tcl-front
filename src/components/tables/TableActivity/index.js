export default function TableActivity({ data, Colum }) {
    return (
        <>
            <Colum data={data.name}  width="30%"/>
            <Colum data={data.score} width="30%"/>
            <Colum data={data.time}  width="30%"/>
        </>
    )
}