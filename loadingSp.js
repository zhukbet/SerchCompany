




class Spiner{
    constructor(){
        this.HTMLloading = '<img class="spiner spiner_close" src="./1_9EBHIOzhE1XfMYoKz1JcsQ.gif">'
        this.img=null
    }
paint_div(elem_H){
elem_H.innerHTML+=this.HTMLloading
this.img=document.querySelector(".spiner")
return this
};
spiner_add(){
this.img.classList.add("spiner_close")
};
spiner_delate(){
    this.img.classList.remove("spiner_close")
}

}

