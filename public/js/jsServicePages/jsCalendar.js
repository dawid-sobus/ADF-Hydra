function setCurrentData(){
    var date = new Date()
    var currentMonth = date.getMonth()+1
    var currentYear = date.getFullYear()

    if(currentMonth < 10) {document.getElementById('month').value = '0'+currentMonth}
    else {document.getElementById('month').value = currentMonth}
    document.getElementById('year').value = currentYear
    console.log(currentMonth)
}

function days(){
    var month = document.getElementById('month').value
    var year = document.getElementById('year').value
    var day = new Date(year, month, 0).getDate()
    var nameDay = new Date(year, (month-1), 1).getDay()

    var addLi = ''
    for(var i=1; i<=day; i++){
        if(i<10){
            addLi += `<a href="/strona_glowna/serwis/kalendarz/${year}-${month}-0${i}">${i}</a>`
        } else{
            addLi += `<a href="/strona_glowna/serwis/kalendarz/${year}-${month}-${i}">${i}</a>`
        }
    }
    document.getElementById('days').innerHTML = addLi

    //ustawienie pierwszego dnia w miesiącu na odpowiedni dzień tygodnia
    var daysA = document.querySelector('.calendar .days a:first-child')
    daysA.style.gridColumn = nameDay

    //kolorujemy obecny dzień tygodnia
    var daysA = document.querySelectorAll('.calendar .days a')
    var currentDay = new Date().getDate()
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()

    if(month == (currentMonth+1)&&year == currentYear){
        daysA[currentDay-1].style.background = '#E0E0E0'
        daysA[currentDay-1].style.color = '#404040'
        daysA[currentDay-1].style.border = '4px solid #606060'
    }

    
}

function nextMonth(){
    var month = document.getElementById('month').value
    var year = document.getElementById('year').value

    const letter = month.split('')
    var numberMonth = ''
    if(parseInt(month) < 12){
        if(letter[1] !== '9'){
            var number = parseInt(letter[1])+1
            numberMonth = letter[0]+number
        } else{
            numberMonth = '10'
        }
    } else{
        numberMonth = '01'
        var numberYear = parseInt(year)+1

        document.getElementById('year').value = numberYear
        if(document.getElementById('year').value === ""){
            document.getElementById('year').value = numberYear-1
        }
    }
    document.getElementById('month').value = numberMonth
    days()
}

function prevMonth(){
    var month = document.getElementById('month').value
    var year = document.getElementById('year').value

    const letter = month.split('')
    var numberMonth = ''
    if(parseInt(month) > 1){
        if(month !== '10'){
            var number = parseInt(letter[1])-1
            numberMonth = letter[0]+number
        } else{
            numberMonth = '09'
        }
    } else{
        numberMonth = '12'
        var numberYear = parseInt(year)-1

        document.getElementById('year').value = numberYear
        if(document.getElementById('year').value === ""){
            document.getElementById('year').value = numberYear+1
        }
    }
    document.getElementById('month').value = numberMonth
    days()
}

function tasksInDays(){
    var month = document.getElementById('month').value
    var year = document.getElementById('year').value
    var day = new Date(year, month, 0).getDate()
    
    var getTasks = document.getElementById('tasksData').dataset.test
    var splitDate = getTasks.split(',')

    //ustala od którego indexu w splicie zaczyna sie dany miesiac i na którym indexie się kończy
    var index=0
    var start=0
    var end=0
    for(var i=0; i<splitDate.length; i++){
        var date = splitDate[i].split('-')

        if(month == date[1] && year == date[0]){
            if(index == 0){
                index=1
                start=i
            }
            end++
            continue
        }
        if(index == 1){break}
    }

    //koloruje dni w których jest jakieś zadanie
    var daysA = document.querySelectorAll('.calendar .days a')
    for(var i=1; i<=day; i++){
        var date = ''
        if(i<10) {date = `${year}-${month}-0${i}`}
        else {date = `${year}-${month}-${i}`}

        for(var j=start; j<(start+end); j++){
            if(date == splitDate[j]){
                daysA[i-1].style.border = "4px dashed #CC0000"
                break
            }
        }
    }
}