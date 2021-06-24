'use strict'
let num = 0

class SerchForm{ 
    constructor(form){
        this.form=form
        this.main_input=null
        this.serch=null
        this.serch_result=null
        this.current_result=null
        this.inform=null
        this.spiner=new Spiner()
        this.arrImgEROR=[]
        this.fastline=new Fastline()
        this.stock_line=null
         this.current_value_input=""
        this.first_click_input = true
        this.current_information=[]
        this.comper_conteiner=null
        this.company_inform_compare = []
        this.input_number=null
        this.limit=null
    }

  
paint(){
   
   
    this.form.innerHTML=
    
    `<div class="stock_line_container">
    <div class="stock_line"> </div>
    </div>
    <div class="comper_conteiner_big"> 
    <input class="input_number" placeholder="limit" min="1" max="99" value="${this.chek_top_limit_number()}" type="number">
    <div class="comper_conteiner">
    </div>
    </div>
    
    <div class="header">
    <input type="text"  class="main_input">
    <button class="serch">serch</button>
    </div>
    <div class="containe_search_result">
    <div class="current_result"></div>
    <div class="conteinerSmall_serch_result">
    <div class="serch_result"></div>
    </div>
    </div>
    <div class="inform">
    </div>
    <div class="limit"></div>
    ` 
   
    this.spiner.paint_div(this.form)
    this.addSelector("main_input","serch","serch_result","current_result","inform","stock_line","comper_conteiner",'input_number',"limit")
    
}
paint_result(data,html_elem){
    // если приходит не массив данных то функция перестает работать.
    if(!data[0]) return
    let results=html_elem.className==="current_result"
    ?"current":""
    html_elem.innerHTML=data
    .map(item=>{
        return `<a class="current_actions ${results}" href="./company.html?symbol=${item.symbol}">
        <p>${item.name }&nbsp</p>
        <p>&nbsp${item.symbol}</p>
        </a>
        `
    })
    .join("<hr>")
    
}

limit_fun(){
    this.limit.innerHTML=`<div class="eror_limit">Your limit is - ${this.input_number.value},
    if you wonna change your limit, pls write here: <input class="change_value" type="number" value="${this.input_number.value}">
   <button class="close_limit">X</button>
    </div>
    
    `
    this.addSelector('change_value',"close_limit");
    this.even_limit_input()
    this.even_close_limit()

}

local_limit_number(){
    localStorage.setItem("number_limit",JSON.stringify(this.input_number.value))
}
local_get_limit(){
  return  JSON.parse(localStorage.getItem('number_limit'))
}


chek_top_limit_number(){
if(this.local_get_limit()) {
 return this.local_get_limit()
}else if(3<this.company_inform_compare.length){
   
      return  this.company_inform_compare.length
      
        }else{
         return   3
        }
    
         
}


even_close_limit(){
    this.close_limit.addEventListener("click",e=>{
        this.limit.innerHTML=''
     
    })
}
even_limit_input(){
   this.change_value.addEventListener("input",e=>{
   this.check_limit(e.target)
 
   this.input_number.value=this.change_value.value
   this.local_limit_number()

   })
}


check_limit(input_number){
    if(input_number.value<1){
        input_number.value=1
          
        }
        if(input_number.value>99){
            input_number.value=99

        }

        if(this.company_inform_compare.length>input_number.value){
           input_number.value=this.company_inform_compare.length
        }

}
input_lim()
{

    this.input_number.addEventListener("input",e=>{
        this.check_limit(this.input_number)
        this.local_limit_number()
    })
}
paint_serch_promise(data){
 this.fastline.paintStockLine(this.stock_line, data)
   //this.fastline.stock_line.innerHTML = 12
    // на 14 строчке создаем пустой массив, дальше этот массив очищаем
    this.arrImgEROR = [];   
    this.current_information=data
    .filter(item=>item.profile)
   
    if(this.current_information.length===0){
        this.information()
    }
  
    this.serch_result.innerHTML = 
    this.current_information
    .map((item,index)=>{      
        this.arrImgEROR.push(item.symbol)
    
     
        // if(!this.company_inform_compare.includes(item.symbol)){
        //    `<button class="button_comper" disabled onclick="plus_company(${index},this)"> ` 
        // }
        // let compare = `<button class="button_comper" disabled onclick="plus_company(${index},this)"> ` 
        // if(!this.company_inform_compare.includes(item.symbol)){
        //     compare=`<button class="button_comper" onclick="plus_company(${index},this)"> `
        // }

        const compare = `<button class="button_comper"  onclick="plus_company(${index},this)"
        ${this.company_inform_compare.includes(item.symbol) 
            ? 'disabled' 
            : ''}
        >+</button>` 

        const style_price= item.profile.changesPercentage.includes("+")  
         ? "price_plus"
         :item.profile.changesPercentage.includes("-") ? "price_minus" : ''
         const a = `${item.profile.website!==""
            ?`<a class="href_text"  href="${item.profile.website}">${item.profile.companyName}</a>`
            :`<p class="href_text">${item.profile.companyName}</p>`}`
            
         return  `<div class="all_current_promise">
            <a href="company.html?symbol=${item.symbol}">
               <img src="${item.profile.image}" alt="logo" class="${item.symbol}"></a>
               ${a}
         <div class="price_color">
          <span>${item.profile.price}</span>
        <span class="${style_price}"> ${item.profile.changesPercentage} </span>
        </div>
        <div class="button_company_div">
        <button class="button_company" onclick="addEvent(${index},this)">Company</button>
        ${compare}
      
        </div>
         </div>
        
        ` 
    })
    
  .join("<hr>")



}

takeInput(){

    this.main_input.value=window.location.search.replace(/\?query=/,'')
    
    if(this.main_input.value.trim()){       
        this.bigButtonevent()
    }

  
}
addSelector(...select_){
    
        
        for(const arr of select_){
            this[arr]=document.querySelector("."+arr)   
        }
    }
    all_event(){
       this.paint_get_local()
        this.event_input()
        this.event_button()
        this.input_lim()
    }
    event_input(){
        this.main_input.addEventListener("input",e=>{

           let my_this=this

            if(e.target.value.trim()){
                
               let lim=300
           const interval=setInterval(time,100)
           const value = e.target.value
           
           function time(){
            lim -= 100
            if(value !== e.target.value){
                return clearInterval(interval) 
   
            }
                
                if(lim <= 0){
                
                    history.pushState({},null,'?query=' + e.target.value)
                  
                  
                    my_this.get_fetch_input(interval)
                } 
           
           } 
            }else{
                this.current_result.innerHTML=""
                history.pushState({},null,'?')
                
            }
            
        })
        
    }

    get_fetch_input(interval){
       
      
       
        this.spiner.spiner_delate()
     
       
        api.get_arr_symbol(this.main_input.value,10)
        .then(data=>{
            console.log(data)
            this.main_input.value && this.paint_result(data,this.current_result)
        })
        .finally(()=>{this.spiner.spiner_add()})  
        clearInterval(interval)
    }


    event_button(){
        this.serch.addEventListener("click",e=>{ 
        this.current_result.innerHTML=""
        if(this.main_input.value.trim()){
            
            this.bigButtonevent()
        }
        
     
    })



}
bigButtonevent(){
    
    
    api.get_arr_symbol(this.main_input.value,20)
    
    .then(data=>{
        if(data.length){
            
            /// что б сделать 20 запросов на адресс мы используем метод map и с помощу мапа мы комипруем (фитч запрос) api сколько элементов у массива, передаем prommise алл которые делает запросы на сервак
            
            if(this.current_value_input!==this.main_input.value){
                
                this.first_click_input && (this.current_value_input = this.main_input.value, this.first_click_input = false)
                this.current_value_input=this.main_input.value
                this.spiner.spiner_delate()
                Promise.all(data.map(item=>api.get_corrent_symbol(item.symbol)))
           .then(data=>{
               this.paint_serch_promise(data)
               console.log(data);
           })
        .then(()=>{
            this.img_eror()
            
        }) 
    .finally(()=>{
       
        this.spiner.spiner_add()
    //    window.history.pushState({},null,'?')

        })
   
           
    }   
           }else{
               this.information()
           }
    

      }
        )
       
}


img_eror(){
    this.arrImgEROR.forEach(item=>{
        const img=document.querySelector("."+item);
        img.onerror=e=>{
            img.src="https://metalistfitness.com.ua/img/no_image.png"
        }
    })
}

add_active_company(symbol){
    if(!this.company_inform_compare.includes(symbol)){
 this.company_inform_compare.push(symbol)
 this.comper_conteiner.innerHTML+=` <div class="company_paragraf">
 <p class="company_paragraf_hover"> 
 <button onclick="delate_company_par(this)" value="${symbol}"> Delate</button>
 </p> 
 ${symbol}</div>`
    }


this.localStorage()
this.button_comper()
 
}
button_comper(){
    // if(!document.querySelector(".button_big_comper")===null){
    //     this.comper_conteiner.innerHTML+=`<button onclick=></button>`
    // }
    
  document.querySelector(".button_big_comper")?.remove()
    ///if(!this.comper_conteiner.innerHTML.includes("button")){

         this.comper_conteiner.innerHTML+=`
   <button 
   class="button_big_comper"
   onclick="document.location='compear.html?Allsymol=${this.company_inform_compare.join('&')}'"
   >
   Compare
   </button>`
    //} 
//     else {
//         console.log(
//             this.company_inform_compare.join('&')
//         );
//     document.querySelector(".button_big_comper").onclick=`document.location="compear.html?Allsymol=${this.company_inform_compare.join('&')}"`
// console.log(
//     document.querySelector(".button_big_comper").onclick
// );
    // }
}


localStorage(){
    localStorage.setItem("company_inform_compare",JSON.stringify(this.company_inform_compare) )
    
}
paint_get_local(){



    this.comper_conteiner.innerHTML+=this.company_inform_compare.map((item,index)=>`
    <div class="company_paragraf">
    <p class="company_paragraf_hover"> 
    <button onclick="delate_company_par(this)" value="${item}"> Delate</button>
    </p> 
    ${item}</div>`)
    .join(" ")
    this.button_comper()
    }
    
    information(){
    this.inform.innerHTML=`<div class="inform_div">
    Not Found  
    <button class="inform_close">X</button>
    </div>`
    document.querySelector(".inform_close").addEventListener("click",e=>{
     this.inform.innerHTML=""
    })

}
getLocal(){

    let a = JSON.parse(localStorage.getItem('company_inform_compare'))
   if(!a)return 
   this.company_inform_compare=a
   


}



}


const form=new SerchForm(document.querySelector(".form"))
form.getLocal()
form["paint"]()
form.all_event()
form.takeInput()




// const active_company=form.current_information.map(item=>item.profile.isActivelyTrading)
function addEvent(index,this_current_button) {
    const newFail=document.createElement("div")
    

const bigProfile= form.current_information[index].profile



    if(bigProfile.isActivelyTrading){
      if( !document.querySelector('.company_include')){
        document.body.appendChild(newFail)
          newFail.classList.add('company_include')
 
        newFail.innerHTML=`
        <div class="main_conteiner_profile">
       
        <div class="conteiner_profile">
        <div class="conteiner_profile_logNu">

        <img src="${bigProfile.image}" onerror="myFunctionA(this)" alt="logo">
       <div class="url_and_nubmer">
        
       ${bigProfile.website
        ?`<a href="${bigProfile.website}">${bigProfile.website}</a>`
        :`No website`
        }
        ${bigProfile.zip
        ?`<p>+${bigProfile.zip}</p>`
        :``
        }
        </div>
        </div>

       <button class="newFail_button">X</button>
        <div class="conteiner_profile_description">
        <p class="profile_description">${bigProfile.description}</p>
        </div>
        </div> 
        </div>
        `
        
        document.querySelector(".newFail_button").addEventListener('click',e=>{
            newFail.remove()
        })
        
    }
    
    
    
}else{
    document.body.appendChild(newFail)
          newFail.classList.add('company_lost')
          this_current_button.disabled=true
          newFail.innerHTML="Company is not defind"
          setTimeout(() => {
              this_current_button.disabled=false
              newFail.remove()
        }, 5000);
        
    }
    
}

function myFunctionA(img){
   img.src="https://metalistfitness.com.ua/img/no_image.png"
}


function plus_company(index, company_button){
if(form.input_number.value<form.company_inform_compare.length+1){
    return form.limit_fun()
}
 
company_button.disabled=true
const active_company=form.current_information[index].symbol
form.add_active_company(active_company)
}





function delate_company_par(paragraf){
    paragraf.closest(".company_paragraf").remove()
form.company_inform_compare=form.company_inform_compare.filter(item=>item!==paragraf.value)

form.localStorage()
form.button_comper()
}
