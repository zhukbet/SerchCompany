class Fastline{

paintStockLine(elem,arr){

    elem.innerHTML=arr
    .filter(item=>item.profile)
    .map(item=>{
       return `<div class="corrent_symbol">
        <p>${item.symbol}</p>
        <p class="line_price">(${item.profile?.price})</p>
        </div>`

    })
    .join("")

}


}


