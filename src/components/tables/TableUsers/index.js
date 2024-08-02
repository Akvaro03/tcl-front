export default function TableUsers({ data, Colum }) {
    const getRoles = (roles) => {
        return roles ? roles : ""
    }
    return (
        <>
            <Colum data={data.name} width="30%" />
            <Colum data={getRoles(data.type)} width="30%" />
            <Colum data={data.email} width="30%" />
        </>
    )
}
