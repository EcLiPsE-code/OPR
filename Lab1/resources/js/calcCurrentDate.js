"use strict";

function setNullFirstValue(value) {
    if (value < 10){
        value = '0' + value;
    }
    return value;
}
function currentDate() {
    let date = new Date();
    let day = setNullFirstValue(date.getDay());
    let month = setNullFirstValue(date.getMonth());
    let year = date.getFullYear();
    let hours = setNullFirstValue(date.getHours());
    let minutes = setNullFirstValue(date.getMinutes());
    let seconds = setNullFirstValue(date.getSeconds());

    return "Сегодня: " +day+"-"+month+"-"+year+" Текущее время: " +hours+ ":" +minutes+":" +seconds+ "";
}
setInterval(function () {
    document.getElementById('dateDocument').innerHTML = currentDate();
}, 1000);



