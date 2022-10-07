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







function createDelImg() {
    const newImg = document.createElement('i');
    newImg.className = 'bi bi-trash';
    return newImg;
};

function createDelButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "del-row-btn";
  
    newBtn.appendChild(createDelImg());
    newBtn.addEventListener("click", deleteRow);
    return newBtn;
};

function createEditImg() {
    const newImg = document.createElement('i');
    newImg.className = 'bi bi-pencil';
    return newImg;
};

function createEditButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "edit";

    newBtn.appendChild(createEditImg());
    newBtn.addEventListener("click", editText);
    return newBtn;
};

function createOptionItems() {
    const newItems = document.createElement('div');
    newItems.className = 'option-items';
    newItems.appendChild(createDelButton());
    newItems.appendChild(createEditButton());
    return newItems;
};

function createEllipsesImg() {
    const newImg = document.createElement('i');
    newImg.className = 'bi bi-three-dots';
    return newImg;
};

function createOptionBtn() {
    const newBtn = document.createElement('button');
    newBtn.className = 'option-btn';
    newBtn.appendChild(createEllipsesImg());
    return newBtn;
};

function createOptionMenu() {
    const newMenu = document.createElement('div');
    newMenu.className = 'option-menu';
    newMenu.appendChild(createOptionBtn());   
    newMenu.appendChild(createOptionItems()); 
    return newMenu;
};

function createTextfield() {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.className = 'list-textfield';
    newField.value = inputField.value;
    newField.setAttribute('disabled', '');
    newField.addEventListener('blur', disableTextfield);
    newField.addEventListener('keydown', dropFocus);
    return newField;
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
    newItem.appendChild(createOptionMenu());
  
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
    this.parentElement.parentElement.parentElement.remove();  //muuta kohdistus
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

// Avaa tekstikentän editoimista varten

function editText() {
    const textfield = this.parentElement.parentElement.previousElementSibling;   //muuta kohdistus

    textfield.removeAttribute('disabled');
    textfield.focus();
};

// Lukitsee tekstikentän

function disableTextfield() {
    const textfield = this;
    textfield.setAttribute('disabled', '');   
};

function dropFocus (e) {
    if (e.key == 'Enter') {
    this.blur(); 
    };
};

//----------- Event-funktiot loppuu -----------//


