function ready() {
    document.querySelector('.loader').style.visibility = 'hidden';
}
window.addEventListener("load", ready);

document.getElementById('form').onsubmit = function(ev) {
    ev.preventDefault();
    let msg = document.querySelector('.error');
    if (this[0].value != '') {
        if (this[1].value == '') {
            msg.innerText = 'Введите пароль';
        } else {
            let login = document.getElementById('input_1').value;
            let password = document.getElementById('input_2').value;
            
            let xhr = new XMLHttpRequest();
            document.getElementById('spin').style.display = 'unset'; 
            xhr.open('POST', '/', true);
            // document.getElementById('form_button').innerHTML = '';
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`login=${login}&password=${password}`);
            xhr.onload = () => {
                let res = JSON.parse(xhr.responseText);
                if (!res.login && !res.password) {
                    document.getElementById('spin').style.display = 'none'; 
                    msg.innerText = 'Такого пользователя не существует'
                }
                if (res.login && !res.password) {
                    document.getElementById('spin').style.display = 'none'; 
                    msg.innerText = 'Пароль неверный';
                }
                if (res.login && res.password) {
                    document.querySelector('.smal').classList.add('ok');  
                    setTimeout(() => window.location = '/cabinet', 1000) 
                }
            }
            xhr.onerror = (err) => {
                document.getElementById('spin').className = 'xx smal';
                msg.innerText = 'Такого пользователя не существует'
            }
        }
    } else {
        if (this[1].value == '') {
            msg.innerText = 'Введите логин и пароль';
        } else msg.innerText = 'Введите логин';
    }
    
}