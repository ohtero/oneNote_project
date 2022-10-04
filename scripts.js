const inputField = document.getElementById("input-textfield"); 

// Tarkistaa "add"-nappia painettaessa, onko syöttörivin arvo > 0. Jos ei, ilmoittaa virheestä.

const modal = document.getElementById('alert-modal');       // <dialog>-elementti, joka avautuu sivun "päälle"
const closeModal = document.getElementById('close-modal-btn');  // <dialog>-elementin sulkunappi    

function checkFieldValue() {
    if (inputField.value.length > 0) {
        appendItem();
    } else modal.showModal();    // avaa dialogin      
};

closeModal.addEventListener('click', () => modal.close());  //sulkee dialogin

document.getElementById("add-item-btn").addEventListener("click", checkFieldValue);


//**************************************//
//            Lisäysfukntiot            //
//**************************************//


// Luo tekstisyötteen pohjalta uuden <li>-elementin, ja uudet elementit sen sisään 

function createTextfield() {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.className = 'list-textfield';
    newField.value = inputField.value;
    return newField;
};

function createButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "del-row-btn";
    newBtn.innerHTML = "Del";
    newBtn.addEventListener("click", deleteRow);
    return newBtn;
};

function createCheckbox() {
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.className = 'list-checkbox';
    newCheckbox.name = 'checkbox';
    newCheckbox.addEventListener('click', checkState);
    return newCheckbox;
};

function createCheckboxContainer() {
    const newContainer = document.createElement('div');
    newContainer.className = 'checkbox-container';
    newContainer.appendChild(createCheckbox());
    return newContainer;
};

function createListItem() {
    const newItem = document.createElement("li");
    newItem.appendChild(createCheckboxContainer());
    newItem.appendChild(createTextfield());
    newItem.appendChild(createButton());
    return newItem;
};

function appendItem() {                                        
    const itemList = document.getElementById("item-list");
    itemList.appendChild(createListItem());
    inputField.value = "";
};

//----------- lisäysmetodit loppuu -----------//


//**************************************//
//            Event-funktiot            //
//**************************************//

// poistaa rivin 

function deleteRow() {              
    this.parentElement.remove();
};


// Muuttaa listan tekstikentän väriä riippuen, onko ruutu merkattu 

function checkState() {
    const textfield = this.parentElement.nextElementSibling;
    if (this.checked) {
        textfield.style['background-color'] = '#ccc';
        textfield.style['color'] = '#777';
    } else {textfield.style['background-color'] = '#fff';
            textfield.style['color'] = '#111';};
};


//----------- Event-funktiot loppuu -----------//