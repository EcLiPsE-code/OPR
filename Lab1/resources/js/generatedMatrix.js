'use strict';

function generateMatrix() {
    let matrixSizeEntry = document.getElementById('sizeMatrix');
    let size = parseInt(matrixSizeEntry.toString());
    if (!!size && size > 0 && size <= 10){
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        for (let i = 0; i < size; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                let td = document.createElement("td");
                td.appendChild(document.createElement("input"));
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }
    } else if (!!size) {
        matrixSizeEntry.value = size > 10 ? 10 : size < 5 ? 5 : parseInt(matrixSizeEntry.toString());
    }
}