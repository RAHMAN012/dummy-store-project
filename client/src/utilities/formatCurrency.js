const currencyFMT = new Intl.NumberFormat("en-NG", {
 currency: "NGN",
 style:"currency",
//  maximumFractionDigits:0
})
export function formatCurrency(price){
    return currencyFMT.format(price)
}