export default function TableActivityWorkers({ data, Colum }) {
    return (
        <>
            <Colum data={data.OT}  width="15%"/>
            <Colum data={data.activity} width="15%"/>
            <Colum data={data.state}  width="15%"/>
            <Colum data={data.button}  width="40%"/>
        </>
    )
}