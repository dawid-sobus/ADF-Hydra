var user_name = document.querySelector('.a-nav')
        var letters = user_name.innerHTML.split('')
        var login = ''

        if(letters.length>10){

            var i=0
            letters.every(l =>{

                if(i>=10){
                    return false
                }

                login += l
                i++
                return true
            })
            login += '...'
        } else{
            login = user_name.innerHTML
        }

        document.querySelector('.a-nav').innerHTML = login
        document.querySelector('.a-nav1').innerHTML = login