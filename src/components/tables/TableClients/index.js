export default function TableClients({ data, Colum }) {
    return (
        <>
            <Colum data={data.idEditable} width="10%" />
            <Colum data={data.KeyUnique} width="20%" />
            <Colum data={data.Name} width="30%" />
            <Colum data={data.location} width="50%" />
        </>
    )
}
