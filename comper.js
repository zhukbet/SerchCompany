'use strict'


class Comper{
    constructor(div){
        this.Allsymbols= window.location.search.replace(/\?Allsymol=/,"").split('&')
        this.div=document.querySelector("."+div)
        this.information_company=null
    }

addclass(_class){
    this[_class]=document.querySelector("."+_class)
}

paint_inform_company(data){
    console.group()
    this.information_company.innerHTML=data.map((item,index)=>{
        const price_company= item.profile.changesPercentage.includes("-")  
        ? "price_plus"
        :item.profile.changesPercentage.includes("-") ? "price_minus" : ''

        const chagesPercent_company=item.profile.changesPercentage.includes("+")  
        ? "price_plus"
        :item.profile.changesPercentage.includes("-") ? "price_minus" : ''
        return `
        <div class="global_inform">
        <div class="information_conteiner_company">
        <div class="img_company f">
         <button class="close_company" onclick="close_company(this,${index})">X</button>
        <img src="${item.profile.image}" onerror="eror_img(this)" alt="logo">
        </div>
        <div class="name_company f">${item.profile.companyName}</div>
        <div class="symbol_company f">${item.symbol}</div>
         <div class="price_global ${price_company} f"> ${item.profile.price}</div>
        <div class="chages_company f">${item.profile.changes}</div>
        <div class="chagesPercent_global ${chagesPercent_company} f">${item.profile.changesPercentage}</div>
        <div class="ceo_company f">${item.profile.ceo}</div>
        </div>
        </div>
        `





    })
    .join("")
    console.groupEnd()
}










promala(){
   
   Promise.all(this.Allsymbols.map(item=>api.get_corrent_symbol(item)))
    .then((data)=>{
       this.paint_inform_company(data)
    })
  
}
paint_comper_company(){

    this.div.innerHTML=`
    <button class="arrow">
    <a href="index.html">
    <img src="./arrow.png">
    </a>
    </button>
    <div class="left_option">
    <div class="img_company f">Img:</div>
    <div class="name_company f">Name:</div>
    <div class="symbol_company f">Symbol:</div>
    <div class="price_global f">Prices:</div>
    <div class="chages_company f">Chages:</div>
    <div class="chagesPercent_global f">ChangesPercent:</div>
    <div class="ceo_company f">CEO</div>
    </div> 
    <div class="information_company">
    
    
    </div>`
    this.addclass('information_company')
}

}

const comper=new Comper("company")
comper.paint_comper_company()
comper.promala()

function eror_img(img){
    img.src="https://metalistfitness.com.ua/img/no_image.png"
 }





 function close_company(this_b,symbol){
this_b.closest(".information_conteiner_company").classList.add("delate")


setTimeout(() => {
    comper.Allsymbols=comper.Allsymbols.map((item,index)=>{
    if(index===symbol){
        return ""
        
    }
    return item
})

const urlArr = comper.Allsymbols
.filter(item=>item)
.join("&")

history.pushState({},null,'?Allsymol=' + urlArr)



localStorage.setItem("company_inform_compare",JSON.stringify(comper.Allsymbols
    .filter(item=>item)))
    this_b.closest(".information_conteiner_company").remove()
}, 2000);



  }
  




