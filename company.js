
const symbol =window.location.search.replace(/\?symbol\=/,"");
class SerchResult{
    constructor(serch_result){
        this.serch_result=serch_result
        this.spiner=new Spiner()
        this.img_company=null
        this.Chart = new BigChart()
    }

get_information(){
  
    this.spiner.paint_div(this.serch_result).spiner_delate()
    api.get_corrent_symbol(symbol)
     .then(data=>{
         this.paint_serch_result(data)
     })
     .then(()=>{
         this.erorImg()
     })
     .finally(()=>{
        this.spiner.spiner_add()
     
     })
}

paint_serch_result(data){
   
    let style_price = data.profile.changesPercentage.includes("+")
    ? "price_plus"
    :data.profile.changesPercentage.includes("-") ? "price_minus" : ''

////////?
    this.serch_result.innerHTML=`<a class="current_result_company" href="${data.profile.website}?symbol=${data.symbol}">
    <img src="${data.profile.image}" alt="logo" class="img_company">
    <p>${data.symbol}</p>
    <p>${data.profile.companyName}</p>
    </a>
    <div class="stock_price">
    Stock price: $${data.profile.price} 
    <span class="price_color ${style_price}"> ${data.profile.changesPercentage}</span>
    </div>
    <div class="description_info">
    ${data.profile.description}
    <select class="big_select">
    <option  value="line">line</option>
    <option  value="bar">bar</option>
    <option value="radar">radar</option>
    </select>
    </div>
    <a href="index.html" class="back_history">
    <img src="./arrow.png">
    </a>
    `
  this.all_event()
  this.select_get_line()
}




select_local_application(line){
 
 localStorage.setItem("type_line",JSON.stringify(line))
 
}



select_get_line(){

  for(let i=0; i<3; i++){

if(JSON.parse(localStorage.getItem("type_line"))===document.querySelector(".big_select")[i].value) {

    document.querySelector(".big_select")[i].selected = true
}
  }

}

all_event(){
   this.addSelect() 
   this.even_select()
   this.Chart.get_historiPrice_big()
}
addSelect(){
this.img_company=document.querySelector(".img_company")
}
even_select(){
document.querySelector(".big_select").addEventListener("change",e=>{
    this.Chart.chart_paint_big(e.target.value)
    this.select_local_application(e.target.value)
    console.log(e);
})
}


erorImg(){
    this.img_company.onerror =e=>{
        this.img_company.src="https://metalistfitness.com.ua/img/no_image.png"
    }
}
}









const result= new SerchResult(document.querySelector(".serch_result"))
result.get_information()
