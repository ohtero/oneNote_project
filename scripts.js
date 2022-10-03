const inputField = document.getElementById("input-textfield"); 

// Tarkistaa "add"-nappia painettaessa, onko syöttörivin arvo > 0. Jos ei, ilmoittaa virheestä.

function checkFieldValue() {
    if (inputField.value.length > 0) {
        appendItem();
    } else (alert("Et voi lisätä tyhjää riviä!"))
};

document.getElementById("add-item-btn").addEventListener("click", checkFieldValue);

// Lisää uuden <li>-elementin tekstisyötteen pohjalta. Luo ensin uuden <li> elementin, ja luo sen sisään 
// <button>-elementin.

function createButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "del-row-btn";
    newBtn.innerHTML = "Del";
    newBtn.addEventListener("click", deleteRow);
    return newBtn;
};

function createListItem() {
    const newItem = document.createElement("li");
    newItem.className = "flex a-center";
    newItem.innerHTML = inputField.value;
    newItem.appendChild(createButton());
    return newItem;
};

function appendItem() {                                        
    const itemList = document.getElementById("item-list");
    itemList.appendChild(createListItem());
    inputField.value = "";
};

function deleteRow() {
    this.parentElement.remove();
};


