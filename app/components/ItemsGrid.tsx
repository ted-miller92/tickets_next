import ItemGridElement from "./ItemGridElement";

export default function ItemsGrid({items}:any) {
    return (
        <div className="flex flex-wrap gap-2 m-10">
            {items.map((item: any, i: any) => (
                    <ItemGridElement item={item} />
            ))}
        </div>
    )
}