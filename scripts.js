
// New list row with included elements

const newListRow = 
`<li>
    <div class="checkbox-container">
        <input type="checkbox" class="list-checkbox" name="checkbox">
    </div>
    
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
const list = document.getElementById('item-list');
const modal = document.getElementById('alert-modal');

// Checks if input length for adding list items is > 0. If it is, proceeds to add list row.

const checkValue = () => {
    if (inputField.value.length > 0) {
        addListRow();
    } else modal.showModal();  
};
document.getElementById("add-item-btn").addEventListener("click", checkValue);
document.getElementById('close-modal-btn').addEventListener('click', () => modal.close());  // Closes modal


// Adds new <li> element and functionalities for the buttons on the row.

function addTextContent() {

};


// Sets textfield on list item to 'disabled' if it looses focus.

function disableTextfield() {
    const textfield = this;
    textfield.setAttribute('disabled', '');   
};

// Textfield blurs if 'enter' is pressed.

function dropFocus (e) {
    if (e.key == 'Enter') {
    this.blur(); 
    };
};


const addTextfield = () => {
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.className = 'list-textfield';
    newField.setAttribute = ('disabled', '');
    newField.addEventListener('blur', disableTextfield);
    newField.addEventListener('keypress', dropFocus);
    return newField;
    
};

function addListRow() {
    list.innerHTML += newListRow;
    list.querySelector('li:last-of-type').firstElementChild.insertAdjacentElement('afterend', addTextfield());
    addCheckboxFunction();
    addEditFunction();
    addDelFunction();
};

// Adds function to the checkbox, which checks the state of it and changes colors of textfield depending on the state.

function checkState() {
    const textfield = this.parentElement.nextElementSibling;
    if (this.checked) {
        textfield.style['background-color'] = '#ccc';
        textfield.style['color'] = '#777';
    } else {textfield.style['background-color'] = '#fff';
            textfield.style['color'] = '#111';};
};




const addCheckboxFunction = () => {
    const checkboxes = document.getElementsByClassName('list-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', checkState);
    };
};


// adds the functions to the textfield.

//const addTextfieldFunction = () => {
//    const textfields = document.getElementsByClassName('list-textfield');
//    for (var i = 0; i < textfields.length; i++) {
//        textfields[i].addEventListener('blur', disableTextfield);
//        textfields[i].addEventListener('keypress', dropFocus);
//    };
//};

// Adds functionality to the 'Delete' button.

const addDelFunction = () => {
    const delButtons = document.getElementsByClassName('del-row-btn');
    for (var i = 0;i < delButtons.length; i++) {
        delButtons[i].addEventListener("click", function deleteRow() {              
            this.parentElement.parentElement.parentElement.remove();
        });
    };
};

// Adds functionality to the 'Edit' button.

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



