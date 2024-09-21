let trueCellCount = document.getElementById("rs-table").childElementCount;
let rowCount = Number("0");
let cellCount = Number("24");
let table = document.getElementById("rs-table");

function addCell() {
    if(cellCount < 24){
        cellCount++;

        let tempCell = document.querySelectorAll('[data-value]');
        tempCell = tempCell[cellCount - 1];
        tempCell.removeAttribute("style");
        setCookie("cellCount", cellCount, 365);
    }

}
function removeCell() {
    if(cellCount > 0){
        let tempCell = document.querySelectorAll('[data-value]');
        tempCell = tempCell[cellCount - 1];
        tempCell.setAttribute("style", "display: none");

        cellCount--;
        setCookie("cellCount", cellCount, 365);
    }
}


function loadTable(){
    // clearCookies();
    if(getCookie("t1") == "") {
        setTable(99);
    }
    else {
        setTable(-1);
        let tempCount = +getCookie("cellCount");

        for(let i = 24; i > tempCount; i--) {
            removeCell();
        }
        cellCount = tempCount;
    }
    setCookie("cellCount", cellCount, 365);
}

function setTable(numerator) {
    let totalCellCount = Number(0);
    while(rowCount < 8) {

        let rowContainer = document.createElement("div");
        rowContainer.classList.add("rs-table-row");
    
        let tempCellCount = 0;
        while(tempCellCount < 3) {
            totalCellCount++;

            let tableCell = document.createElement("div");
            tableCell.setAttribute("data-value", totalCellCount);
            let imgInput = document.createElement("input");
            let skillImg = document.createElement("label");
            let skillFrac = document.createElement("div");
            let numer = document.createElement("input");
            let denom = document.createElement("p");
            tableCell.classList.add("inv-cell");
            skillImg.classList.add("inv-img");
            imgInput.classList.add("img-input");
            skillFrac.classList.add("inv-fraction");
            numer.classList.add("inv-num");
            numer.type = "text";
            numer.name = totalCellCount;
            denom.classList.add("inv-den");
    
            skillImg.src = "media/images/heart-skill.jpg";
            skillImg.alt = "Cell Img";
            skillImg.name = totalCellCount;
            imgInput.type = "file";
            imgInput.id = "imgIn";
            skillImg.setAttribute("for", "imgIn");
            imgInput.addEventListener("click", loadImage(skillImg, ""));



            if(numerator < 0){
                numer.value = getCookie("t" + totalCellCount);
            }
            else {
                numer.value = 0;
                setCookie("t"+totalCellCount, numer.value, 365);
            }
            numer.addEventListener('change', updateCookie);
            denom.textContent = "99";

    
            skillFrac.appendChild(numer);
            skillFrac.appendChild(denom);
            tableCell.appendChild(imgInput);
            tableCell.appendChild(skillImg);
            tableCell.appendChild(skillFrac);
    
            rowContainer.appendChild(tableCell);
            tempCellCount++;

        }
        table.appendChild(rowContainer);
        rowCount++;
    }
}

function setCell(cell, img) {
    let cellImg = cell.childNodes[0];
    let cellFrac =  cell.childNodes[1];
    let cellNumer = frac.childNodes[0];
    let cellDenom = frac.childNodes[1];    
}

// https://stackoverflow.com/questions/20766590/how-to-save-user-text-input-html-input-as-cookie
function setCookie(cname,cvalue,exdays) {
    let d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    let expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}
function updateCookie() {
    setCookie("t" + this.name, this.value, 365);
}

// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function clearCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

function loadImage(imgLabel, img) {
    if(img == ""){
        imgLabel.style = "background-image: url('media/images/heart-skill.jpg');";
    }
    else {
        // imgLabel.style = "background-image: url('
    }

}

document.addEventListener('DOMContentLoaded', function() {
    loadTable();

    let addButton = document.getElementById("add");
    addButton.onclick = addCell;
    let removeButton = document.getElementById("remove");
    removeButton.onclick = removeCell;

 }, false);