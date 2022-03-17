function check(){
    if((document.getElementById('password').value !== '') && (document.getElementById('rPassword').value !== '')){
        if((document.getElementById('password').value !== document.getElementById('rPassword').value)){
            alert('Hasła nie są takie same, wpisz poprawnie hasła!')
            return false
        }
    }
}  