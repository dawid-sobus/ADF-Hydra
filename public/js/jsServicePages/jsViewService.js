function counting(serviceDate, placeClass) {

    var docLength = document.getElementsByClassName(serviceDate).length
    if(document.getElementsByClassName(serviceDate).length>2) docLength=2

    var dateService = []
    for(var i=0; i<docLength; i++){
    var today = new Date()
    dateService[i] = new Date(document.getElementsByClassName(serviceDate)[i].textContent)
    
    var seconds = Math.floor((dateService[i] - (today)) / 1000);
    if(seconds < 0) seconds = 0
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    if (days < 10) days = "0" + days

    hours = hours - (days * 24);
    if (hours < 10) hours = "0" + hours

    minutes = minutes - (days * 24 * 60) - (hours * 60);
    if (minutes < 10) minutes = "0" + minutes

    document.getElementsByClassName(placeClass)[i].innerHTML = days + 'd ' + hours + 'h '// + minutes + 'm ' + seconds + ' sec'
    }
    // setTimeout("counting('dateService', 'clock')", 60000)
    setTimeout("counting('dateInspection', 'clockInspection')", 3600000)
 }
 
 function checkedRadio(){
    var dateNow = new Date()
    var takeDate = document.getElementsByClassName('dateInspection')
    
    var year = dateNow.getFullYear()
    var month = dateNow.getMonth()+1
    var day = dateNow.getDate()

    if(month<10) {month = `0${month}`}
    if(day<10) {day = `0${day}`}
    var linkedDate = `${year}-${month}-${day}`
    var phoneValue = document.getElementsByClassName('checkPhone')
    for(var i=0; i<phoneValue.length/2; i++){
        var checkValue = document.getElementsByName(`phone${i+1}`)
        checkValue.forEach(radio => {
            if(radio.checked){
                if((radio.value == 'nie') && (linkedDate == takeDate[i].textContent)){
                    radio.closest('.inspection summary').style.background = "red"

                } else{
                    
                    radio.closest('.inspection summary').style.background = "#EBEBEB"
                }
            }
        })
    }
}

//skracanie nazwy <a></a>

function shortA(){
var number_of_letters = 33

var invoice_name = document.querySelectorAll('.inv span')
var invoice_file = document.querySelectorAll('.inv img')

for(var i=0; i<invoice_name.length; i++){

    var letters = invoice_name[i].innerHTML.split('')

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
        protocols_file[i].setAttribute("src", "/files-icon/plik.png")
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
}

function letters_last_name_service(){
    
    var letters_class = document.querySelectorAll('.service .letters_to_center .letters')
    var clients_Last_Name = document.querySelectorAll('.service .summary-data .summary-data-client span')

    var colors_tab = ['#B5E61D', '#7ACE62', '#99D9EA', '#FF7F27', '#C6C660', '#00A2E8', '#FFF200', '#F4FAB8', '#22B14C', '#3F48CC', '#C3C3C3', '#C8BFE7', '#CFCF81', '#97A7BB', '#E96371', '#CB072F', '#948CEE', '#7CB899', '#84bb95', '#00ecec', '#706a97', '#e0b65f', '#9ef3c5', '#43b6b6', '#41d8ed', '#c987c7', '#d18999', '#ffaec9', '#bbd7b5', '#fceecf', '#c8a780', '#5ac59d', '#8992c0', '#fd947d', '#bbb1ae']
    var letters_number_tab = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż', 'ż-inne']


    for(var i=0; i<clients_Last_Name.length; i++){

        var get_last_name = clients_Last_Name[i].innerHTML.split(' ')
        var first_letter = get_last_name[1].slice(0,1).toLowerCase()

        var color_counter = letters_number_tab.length-1;
        for(var j=0; j<letters_number_tab.length; j++){
            if(first_letter === letters_number_tab[j]){
                color_counter = j;
                break
            }
        }

        letters_class[i].style.background = colors_tab[color_counter]
    }

}