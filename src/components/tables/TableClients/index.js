export default function TableClients({ data, Colum }) {
    return (
        <>
            <Colum data={data.id} width="10%" />
            <Colum data={data.KeyUnique} width="30%" />
            <Colum data={data.Name} width="60%" />
        </>
    )
}
