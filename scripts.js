
// New list row with included elements

const newListRow = `<li>
    <div class="checkbox-container">
        <input type="checkbox" class="list-checkbox" name="checkbox">
    </div>
    <input type="text" class="list-textfield" disabled>
    <div class="option-menu">
        <button class="option-btn" ><i class="bi bi-three-dots"></i></button>
        <div class="option-items">
            <button class="edit-button" id="edit"><i class="bi bi-pencil"></i></button>
            <button class="del-row-btn"><i class="bi bi-trash"></i></button>
        </div>
    </div>
</li>`


// Globar vars

const inputField = document.getElementById('input-textfield');
const modal = document.getElementById('alert-modal');

// Checks if input length for adding list items is > 0. If it is, proceeds to add list row 

const checkValue = () => {
    if (inputField.value.length > 0) {
        addListRow();
    } else modal.showModal();  
};

// Adds new list and functionalities for the buttons on the row

function addListRow() {
    const list = document.getElementById('item-list');
    list.innerHTML += newListRow;
    const textField = list.querySelector('li > input:first-of-type');
    textField.value = inputField.value;
    inputField.value = "";
    addFieldLocking(textField);
    addEditFunction();
    addDelFunction();
};




//ei toimi syysta X

const addFieldLocking = (textField) => {        
    textField = textField;      
    for (var i = 0; i < textField.length; i++)
    textField[i].addEventListener('onblur', console.log('jee'));
}; 


// Adds functionality to the 'Delete' button

const addDelFunction = () => {
    const delButtons = document.getElementsByClassName('del-row-btn');
    for (var i = 0;i < delButtons.length; i++) {
        delButtons[i].addEventListener("click", function deleteRow() {              
            this.parentElement.parentElement.parentElement.remove();
        });
    };
};

// Adds functionality to the 'Edit' button

const addEditFunction = () => {
    const editButtons = document.getElementsByClassName('edit-button');
    for (var i = 0;i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function editText() {
            const textfield = this.parentElement.parentElement.previousElementSibling;           
            textfield.removeAttribute('disabled');
            textfield.focus();
        });
    };
};




// Event listeners

document.getElementById("add-item-btn").addEventListener("click", checkValue);
document.getElementById('close-modal-btn').addEventListener('click', () => modal.close());














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



// Lukitsee tekstikentän

function dropFocus (e) {
    if (e.key == 'Enter') {
    this.blur(); 
    };
}