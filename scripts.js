


const inputField = document.getElementById("input-textfield"); 
const modal = document.getElementById('alert-modal');    

// Checks if input value is > 0. If not, opens error modal

function checkFieldValue() {
    if (inputField.value.length > 0) {
        appendItem();
    } else modal.showModal();  
};

document.getElementById('close-modal-btn').addEventListener('click', () => modal.close());  
document.getElementById("add-item-btn").addEventListener("click", checkFieldValue);


/*--- CREATE LIST ROW AND ITS' COMPONENTS ---*/

// Del button

function deleteRow() {  // Delete functionality                                                           
    this.parentElement.parentElement.parentElement.remove();
}; 

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

// 'Edit' button

function editText() {   // Edit functionality
    const textfield = this.parentElement.parentElement.previousElementSibling;

    textfield.removeAttribute('disabled');
    textfield.focus();
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

// 'Options/ellipses' button

function showOptions() {    // Open options functionality
    this.nextElementSibling.classList.toggle('option-items-open')
};

function createEllipsesImg() {
    const newImg = document.createElement('i');
    newImg.className = 'bi bi-three-dots';
    return newImg;
};

function createOptionBtn() {
    const newBtn = document.createElement('button');
    newBtn.className = 'option-btn';
    newBtn.addEventListener('click', showOptions);
    newBtn.appendChild(createEllipsesImg());
    return newBtn;
};

// Items in Option menu

function createOptionItems() {
    const newItems = document.createElement('div');
    newItems.className = 'option-items';
    newItems.appendChild(createEditButton());
    newItems.appendChild(createDelButton());
    return newItems;
};


// Option menu container

function createOptionMenu() {
    const newMenu = document.createElement('div');
    newMenu.className = 'option-menu';
    newMenu.appendChild(createOptionBtn());   
    newMenu.appendChild(createOptionItems()); 
    return newMenu;
};

// Textfield

function disableTextfield() {   // Locks textfield after editing
    const textfield = this;
    textfield.setAttribute('disabled', '');   
};

function dropFocus (e) {    // Blur textfield
    if (e.key == 'Enter') {
    this.blur(); 
    };
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

// Checkbox

function toggleState() {
    const textfield = this.parentElement.nextElementSibling;
    textfield.classList.toggle('completed');
};

function createCheckbox() {
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.className = 'list-checkbox';
    newCheckbox.name = 'checkbox';
    newCheckbox.addEventListener('click', toggleState);
    return newCheckbox;
};

function createCheckboxContainer() {
    const newContainer = document.createElement('div');
    newContainer.className = 'checkbox-container';
    newContainer.appendChild(createCheckbox());
    return newContainer;
};

// Combine components and append new <li> to the <ul>

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