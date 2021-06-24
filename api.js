const check_response = response=>  response.ok
? response.json()
: Promise.reject(response)



const api = {
    get_arr_symbol: (value,count)=> fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=${count}&exchange=NASDAQ`)
    .then(check_response),
    get_corrent_symbol:(symbol)=>fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
    .then(check_response),
    get_fetch_historiPrice:(symbol)=>fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
    .then(check_response)
};

