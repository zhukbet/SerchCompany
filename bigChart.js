class BigChart{
    constructor(){
        this.data=[]
        this.time=[]
        this.type=""
    }

    get_historiPrice_big(){
        return api.get_fetch_historiPrice(symbol)
        .then(data=>{
            this.data= data.historical.map(item=>item.close).reverse();
            this.time=data.historical.map(item=>item.date).reverse()
           
            this.chart_paint_big(JSON.parse(localStorage.getItem("type_line")))
            return data
            
        })
    }
    
    
    chart_paint_big(type = this.type,data = this.data,time = this.time){
        
        
        
        
        
        const ctx = document.getElementById('bigChart').getContext('2d');
        new Chart(ctx, {
            
       type: type,
       data: {
           labels:time,
           datasets: [{

       data,
       backgroundColor: 
       
       'rgba(55, 06, 86, .2)',
       
       borderColor: 
       'rgba(5, 99, 132, 1)',
       
       
       borderWidth: 1,
       
   }]
},
options: {
   elements: {
     line: {
       borderWidth: 3
     }
   },
   legend: {
    display: false
  }
 },
   
}


);
}
}
