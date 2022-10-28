function checkedTasks(){
    var dateNow = new Date()

    var takeDate = document.getElementsByClassName('dateService')
    var querySummary =  document.querySelectorAll('.home-page-tasks summary')
    var queryLabel =  document.querySelectorAll('.home-page-tasks .letter-day')
    var querySpan =  document.querySelectorAll('.home-page-tasks .letter-day span')
    var queryImg =  document.querySelectorAll('.home-page-tasks .letters img')

    for(var i=0; i<querySummary.length; i++){

        var nextDate = new Date(takeDate[i].textContent)
        if(nextDate < dateNow){
            querySummary[i].style.color = "#C0C0C0"
            querySummary[i].style.border = "2px dashed #C0C0C0"
            querySpan[i].style.background = "#C0C0C0"
            queryLabel[i].style.color = "#C0C0C0"
            queryImg[i].style.opacity = "0.2"
        }
        else{
            break
        }
    }
}

//skracanie nazwy <a></a>

var number_of_letters = 31

var invoice_name = document.querySelectorAll('.inv span')
var invoice_file = document.querySelectorAll('.inv img')

for(var i=0; i<invoice_name.length; i++){

    var letters = invoice_name[i].innerHTML.split('')

    var letters_name = ''
    let number_line = 0
    
    for(var z=0; z<letters.length; z++){
        
        if(number_line <= 5){
            
            if(letters[z] == '-'){
                number_line+=1
            }
            
        } else {
            
            letters_name+=letters[z]
        }
        
    }
    
    var letters_name_split = letters_name.split('')
    var new_invoice_name = ''
    
    if(letters_name_split.length>number_of_letters){
        
        var j=0
        letters_name_split.every(l =>{

            if(j>=number_of_letters){
                return false
            }

            new_invoice_name += l
            j++
            return true
        })
        new_invoice_name += '...'
    } else{
        new_invoice_name = letters_name
    }
    
    document.querySelectorAll('.inv span')[i].innerHTML = new_invoice_name
}

var protocols_name = document.querySelectorAll('.prot span')
var protocols_file = document.querySelectorAll('.prot img')

for(var i=0; i<protocols_name.length; i++){

    var letters = protocols_name[i].innerHTML.split('')

    //rozpoznawanie formatu i dodanie ikony do pliku
    var format = ''
                        
    for(var z=letters.length-1; z>1; z--){
        if(letters[z] === '.'){
            break
        }
        
        format += letters[z]
    }
    
    if(format !== 'fdp'){
        invoice_file[i].setAttribute("src", "/files-icon/plik.png")
    }

    //skracanie nazwy pliku gdy jest za długa
    var letters_name = ''
    let number_line = 0

    for(var z=0; z<letters.length; z++){

        if(number_line <= 5){

            if(letters[z] == '-'){
                number_line+=1
            }

        } else {

            letters_name+=letters[z]
        }

    }

    var letters_name_split = letters_name.split('')

    //rozpoznawanie formatu i dodanie ikony do pliku
    var format = ''
                        
    for(var z=letters.length-1; z>1; z--){
        if(letters[z] === '.'){
            break
        }
        
        format += letters[z]
    }
    
    if(format !== 'fdp'){
        protocols_file[i].setAttribute("src", "/files-icon/plik.png")
    }

    //skracanie nazwy pliku gdy jest za długa
    var new_invoice_name = ''

    if(letters_name_split.length>number_of_letters){

        var j=0
        letters_name_split.every(l =>{

            if(j>=number_of_letters){
                return false
            }

            new_invoice_name += l
            j++
            return true
        })
        new_invoice_name += '...'
    } else{
        new_invoice_name = letters_name
    }

    document.querySelectorAll('.prot span')[i].innerHTML = new_invoice_name
}

function letters_last_name(){
    
    var letters_class = document.querySelectorAll('.home-page-tasks .letters')
    var clients_Last_Name = document.querySelectorAll('.home-page-tasks .summary-data .summary-data-client span')

    for(var i=0; i<clients_Last_Name.length; i++){

        var get_last_name = clients_Last_Name[i].innerHTML.split(' ')
        var first_letter = get_last_name[1].slice(0,1).toLowerCase()
        
        letters_class[i].innerHTML = `<img src="/letters/${first_letter}.png" onerror="this.onerror=null; this.src='/letters/ż-inne.png'" width="51" height="51">`
    }

}