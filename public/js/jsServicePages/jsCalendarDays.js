function changeDayCalenderDayPrev(){
    var getButtonPrevDate = document.querySelector('.calendar-Data .prev')
    var getDateDay = document.querySelector('.calendar-Data label').dataset.test
    var dateDay = getDateDay.split('-')
    var dayParseInt = parseInt(dateDay[2])
    var monthParseInt = parseInt(dateDay[1])
    var yearParseInt = parseInt(dateDay[0])
    
    var yearT = document.querySelector('.calendar_days .yearT').dataset.test
    var tYear = yearT.split(',')
    if(dateDay[0] >= tYear[0]){
        if(dateDay[2] == '01' && dateDay[1] == '01'){
            var prevYearParseInt = yearParseInt-1

            var day = new Date(prevYearParseInt, 12, 0).getDate()
            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${prevYearParseInt}-${12}-${day}'`)
        }else if(dateDay[2] == '01'){
            var prevMonthParseInt = monthParseInt-1
            var prevMonthParseIntString = `${prevMonthParseInt}`
            if(prevMonthParseInt<10){ prevMonthParseIntString=`0${prevMonthParseInt}`}

            var day = new Date(dateDay[2], prevMonthParseInt, 0).getDate()
            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${dateDay[0]}-${prevMonthParseIntString}-${day}'`)
        }else if(dateDay[2] > '01'){
            var prevDayParseInt = dayParseInt-1
            var prevDayParseIntString = `${prevDayParseInt}`
            if(prevDayParseInt<10){ prevDayParseIntString=`0${prevDayParseInt}`}
            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${dateDay[0]}-${dateDay[1]}-${prevDayParseIntString}'`)
        }
    }
}

function changeDayCalenderDayNext(){
    var getButtonPrevDate = document.querySelector('.calendar-Data .next')
    var getDateDay = document.querySelector('.calendar-Data label').dataset.test
    var dateDay = getDateDay.split('-')
    var dayParseInt = parseInt(dateDay[2])
    var monthParseInt = parseInt(dateDay[1])
    var yearParseInt = parseInt(dateDay[0])
    
    var yearT = document.querySelector('.calendar_days .yearT').dataset.test
    var tYear = yearT.split(',')
    if(dateDay[0] <= parseInt(tYear[1])+1){

        var day = new Date(dateDay[0], dateDay[1], 0).getDate()
        if(day<10){ day=`0${day}`}
        if(dateDay[2] == day && dateDay[1] == '12'){
            var nextYearParseInt = yearParseInt+1
            var nextYearParseIntString = `${nextYearParseInt}`

            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${nextYearParseIntString}-01-01'`)
        }else if(dateDay[2] == day){
            var nextMonthParseInt = monthParseInt+1
            var nextMonthParseIntString = `${nextMonthParseInt}`
            if(nextMonthParseInt<10){ nextMonthParseIntString=`0${nextMonthParseInt}`}

            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${dateDay[0]}-${nextMonthParseIntString}-01'`)
        }else if(dateDay[2] < day){
            var nextDayParseInt = dayParseInt+1
            var nextDayParseIntString = `${nextDayParseInt}`
            if(nextDayParseInt<10){ nextDayParseIntString=`0${nextDayParseInt}`}
            getButtonPrevDate.setAttribute("onclick", "location.href="+`'/strona_glowna/serwis/kalendarz/${dateDay[0]}-${dateDay[1]}-${nextDayParseIntString}'`)
        }
    }
}

//skracanie nazwy <a></a>

function shortA(){
    var number_of_letters = 26
    
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

    function letters_last_name_calendar(){
    
        var letters_class = document.querySelectorAll('.task_calendar_days .letters')
        var clients_Last_Name = document.querySelectorAll('.task_calendar_days .summary-data .summary-data-client span')
    
        for(var i=0; i<clients_Last_Name.length; i++){
    
            var get_last_name = clients_Last_Name[i].innerHTML.split(' ')
            var first_letter = get_last_name[1].slice(0,1).toLowerCase()
            letters_class[i].innerHTML = `<img src="/letters/${first_letter}.png" onerror="this.onerror=null; this.src='/letters/ż-inne.png'" width="51" height="51">`
        }
    
    }