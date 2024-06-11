import Style from "./itemCard.module.css"

function ItemCard({ tittle, children, isTittle, isSpace }) {
    if (isSpace) return (
        <div className={Style.spaceItemCard}>
            <div className={Style.spaceTittleItem}></div>
            <div className={Style.spaceContentItem}></div>
        </div>
    )

    return (
        <div className={Style.itemCard}>
            <div className={isTittle ? Style.tittleItem : Style.subTittleItem}>{tittle}</div>
            <div className={Style.contentItem}>{children}</div>
        </div>
    );
}

export default ItemCard;