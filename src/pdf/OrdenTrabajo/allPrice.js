import formatMoney from "../../hooks/formatMoney";

const AllPrices = ({ Description }) => {
    let sumPrices = Description.map(data => Number(data.import)).reduce((prev, a) => prev + a, 0)
    return (
        <p>{formatMoney.format(sumPrices)}</p>
    )
}
export default AllPrices;