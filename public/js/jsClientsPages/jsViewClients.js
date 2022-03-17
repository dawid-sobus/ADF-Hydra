var search_input = document.querySelector("#search_input")

search_input.addEventListener("keyup", function(e){
    var search_item = e.target.value.toLowerCase()
    
    var span_items_adress = document.querySelectorAll(`.adress span`)
    var span_items_clientName = document.querySelectorAll(`.clientName span`)
    var span_items_clientLastName = document.querySelectorAll(`.clientLastName span`)

    for(var i=0; i<span_items_clientName.length; i++){
        if((span_items_adress[i].textContent.toLowerCase().indexOf(search_item)&&span_items_clientName[i].textContent.toLowerCase().indexOf(search_item)&&span_items_clientLastName[i].textContent.toLowerCase().indexOf(search_item)) != -1){ //indexOf czyli zwraca gdzie w wyszukiwanym elemencie jest wyszukiwana fraza, -1 nie ma te frazy w wyszukiwanym
            span_items_clientName[i].closest('.client').style.display = "block"
        } else{
            span_items_clientName[i].closest('.client').style.display = "none"
        }
    }
})

function letters(){
    
    var letters_class = document.querySelectorAll('.client .letters')
    var clients_Last_Name = document.querySelectorAll('.client .summary-data .clientLastName span')

    for(var i=0; i<clients_Last_Name.length; i++){

        var first_letter = clients_Last_Name[i].innerHTML.slice(0,1).toLowerCase()
        letters_class[i].innerHTML = `<img src="/letters/${first_letter}.png" onerror="this.onerror=null; this.src='/letters/ż-inne.png'" width="51" height="51">`
    }

}