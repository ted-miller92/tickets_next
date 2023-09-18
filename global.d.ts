

type Item = {
    item_name: string
    price: number
    mods: string
}

type Ticket = {
    cust_name: string
    date: string
    time: string
    ticket_items: Array<Item>
    promo_code?: string
    active: boolean
}
