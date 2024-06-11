import Style from "./itemCard.module.css"

function ItemCard({ tittle, children, isTittle, isSpace, isFirst, isLast}) {
    if (isSpace) return (
        <div className={Style.spaceItemCard}>
            <div className={Style.spaceTittleItem}></div>
            <div className={Style.spaceContentItem}></div>
        </div>
    )
    const styles = `${Style.itemCard} ${isFirst ? Style.isFirst : isLast && Style.isLast}`
    return (
        <div className={styles}>
            <div className={isTittle ? Style.tittleItem : Style.subTittleItem}>{tittle}</div>
            <div className={Style.contentItem}>{children}</div>
        </div>
    );
}

export default ItemCard;