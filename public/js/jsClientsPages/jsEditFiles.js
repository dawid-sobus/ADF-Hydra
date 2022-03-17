var number_of_letters = 36

        var invoice_name = document.querySelectorAll('.inv span')
        var invoice_file = document.querySelectorAll('.inv img')

        for(var i=0; i<invoice_name.length; i++){

            var letters = invoice_name[i].innerHTML.split('')

            //rozpoznawanie formatu i dodanie ikony do pliku

            var format = ''
                        
            for(var a=letters.length-1; a>1; a--){
                if(letters[a] === '.'){
                    break
                }
                
                format += letters[a]
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