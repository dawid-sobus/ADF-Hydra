function daysInMonth(){
    var year = document.getElementById('year').value
    var month = document.getElementById('month').value

    var day = new Date(year, month, 0).getDate()
    var enteredDay = document.getElementById('day').value

    if(enteredDay > day){
        alert(`W roku ${year} i w miesiacu ${month} było ${day} dni a nie ${enteredDay}, podaj poprawny Dzień Urodzenia!!`)
        return false
    }
}

function check(){
    if((document.getElementById('password').value !== '') && (document.getElementById('rPassword').value !== '')){
        if((document.getElementById('password').value !== document.getElementById('rPassword').value)){
            alert('Hasła nie są takie same, wpisz poprawnie hasła!')
            return false
        }
    }
}