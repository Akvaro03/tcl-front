export default function TableType({ data, Colum }) {
    return (
        <>
            <Colum data={data.nameType} width="20%" />
            <Colum data={data.abbreviation} width="20%" />
            <Colum data={JSON.parse(data.activities).map(data => data.name).join(", ")} width="40%" />
        </>
    )
}
