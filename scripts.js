var toDoCount = 0;
var currentCompleted = 0;
var totalCompleted = 0;

const toDoCounter = document.getElementById('todo-count');
const completed = document.getElementById('completed-count');
const CompletedAll = document.getElementById('total-completed-count');

const updateCounter = (counter, value) => counter.innerHTML = value;    // Updates values of the different counters

updateCounter(toDoCounter, toDoCount);
updateCounter(completed, currentCompleted);
updateCounter(CompletedAll, totalCompleted);





const getLocalData = () => {        // Loads saved list items on page load
    const localData = localStorage.getItem('items');
    if (localData){
        const savedList = localData.split(',');
        savedList.forEach(element => {appendItem(element)});
    }
};
const getLocalCompletedData = () => {        // Loads saved completed list items on page load
    const localData = localStorage.getItem('completedItems');
    if (localData){
        const savedList = localData.split(',');
        savedList.forEach(element => {checkIfCompleted(element)});      // Compares to existing list values and if they match, sets them to completed state
    }
};

const checkIfCompleted = arrValue => {
    const listItems = document.querySelectorAll('.list-textfield');
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].value == arrValue) {
            listItems[i].classList.add('completed');
            listItems[i].previousElementSibling.firstElementChild.checked = true;
        }
    }
};

window.addEventListener('load', getLocalData);
window.addEventListener('load', getLocalCompletedData);

const saveToLocal = value => {      // Saves list items to local storage
    const localData = localStorage.getItem('items');
    const savedList = localData ? localData.split(',') : [];
    savedList.push(value);
    localStorage.setItem('items', savedList.toString()); 
};

const deleteFromLocal = item => {       // Delete items from local Storage
    const localData = localStorage.getItem('items');
    const savedList = localData.split(',');
    const index = savedList.indexOf(item.value);
    savedList.splice(index, 1);
    localStorage.setItem('items', savedList.toString());
    const completedLocalData = localStorage.getItem('completedItems');
    const savedCompletedList = completedLocalData.split(','); 
    if (savedCompletedList.includes(item.value)) {
        const indexOfCompleted = savedCompletedList.indexOf(item.value);
        savedCompletedList.splice(indexOfCompleted, 1);
        localStorage.setItem('completedItems', savedCompletedList.toString());     
    } 

};

const editLocalValue = (value) => {     // Change item value in local storage when value is edited
    const localData = localStorage.getItem('items');
    const savedList = localData.split(',');
    const index = savedList.indexOf(originalTextfieldValue);  // Checks the index of the un-edited value
    savedList.splice(index, 1, value);
    localStorage.setItem('items', savedList.toString());
    originalTextfieldValue = "";
}

/*--- CREATE LIST ROW AND ITS' COMPONENTS ---*/

// Del button

function deleteRow() {  // Delete functionality                                                           
    const textfield = this.closest('.option-menu').previousElementSibling;
    this.closest('li').remove();
    deleteFromLocal(textfield);
    if (textfield.classList.contains('completed')) {
        currentCompleted -= 1;
        totalCompleted +=1;
        updateCounter(completed, currentCompleted);
        updateCounter(CompletedAll, totalCompleted);
    } else {
        toDoCount -= 1;
        updateCounter(toDoCounter, toDoCount);
    }
    if (!document.getElementById('item-list').children.length) {
        document.getElementById('completed-btn-cont').style.display = 'none';
    }
}; 

function createDelButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "del-row-btn bi bi-trash";
    newBtn.addEventListener("click", deleteRow);
    return newBtn;
};

// 'Edit' button

function editText() {   // Edit functionality
    const textfield = this.closest('.option-menu').previousElementSibling;
    textfield.removeAttribute('disabled');
    textfield.focus();

};

function createEditButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "edit bi bi-pencil";
    newBtn.addEventListener("click", editText);
    newBtn.addEventListener('click', function() {this.parentElement.classList.remove('option-items-open');});   // Closes menu when 'Edit' is clicked
    return newBtn;
};

// 'Options/ellipses' button

function showOptions() {    // Open options functionality
    this.nextElementSibling.classList.toggle('option-items-open');
};

function createOptionBtn() {
    const newBtn = document.createElement('button');
    newBtn.className = 'option-btn bi bi-three-dots';
    newBtn.addEventListener('click', showOptions);
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

var originalTextfieldValue = "";

function disableTextfield() {   // Locks textfield after editing
    this.disabled = true;
    if (this.value !== originalTextfieldValue) {
        editLocalValue(this.value);     // Replaces old value with edited value
    }
};

function dropFocus (e) {    // Blur textfield
    if (e.key == 'Enter') {
    this.blur(); 
    };
};

function createTextfield(value) {   // Takes value from the text input field or saved items from Local Storage
    const newField = document.createElement('input');
    newField.type = 'text';
    newField.className = 'list-textfield';
    newField.value = value;
    newField.disabled = true;
    newField.addEventListener('focus', function setOrigValue() {originalTextfieldValue = this.value;}); // Saves the original textfield value before enabling editing
    newField.addEventListener('blur', disableTextfield);
    newField.addEventListener('keydown', dropFocus);
    return newField;
};

// Checkbox

const addCompletedToLocal = value => {
    let localData = localStorage.getItem('completedItems');
    let savedList = localData ? localData.split(',') : [];
    savedList.push(value);
    localStorage.setItem('completedItems', savedList);    
};

const removeCompletedFromLocal = value => {
    let localData = localStorage.getItem('completedItems'); 
    let savedList = localData.split(',');
    let index = savedList.indexOf(value);
    savedList.splice(index, 1);  
    localStorage.setItem('completedItems', savedList); 
}

function toggleState() {
    const textfield = this.parentElement.nextElementSibling;
    textfield.classList.toggle('completed');
    if (textfield.classList.contains('completed')) {
        addCompletedToLocal(textfield.value);
        currentCompleted += 1;
        toDoCount -= 1;
    } else {removeCompletedFromLocal(textfield.value);
            currentCompleted -= 1;
            toDoCount += 1;
    }
    updateCounter(toDoCounter, toDoCount);
    updateCounter(completed, currentCompleted);
    
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

const inputField = document.getElementById("input-textfield"); 

function createListItem(value) {
    const newItem = document.createElement("li");
    newItem.appendChild(createCheckboxContainer());
    newItem.appendChild(createTextfield(value));
    newItem.appendChild(createOptionMenu());
    return newItem;
};

function appendItem(value) {                                        
    const itemList = document.getElementById("item-list");
    itemList.appendChild(createListItem(value));
    toDoCount += 1;
    updateCounter(toDoCounter, toDoCount);
    document.getElementById('completed-btn-cont').style.display = 'flex';
};


/* END LIST COMPONENT CREATION */

// Checks if input value is > 0. If not, opens error modal. Else appends new list row

const modal = document.getElementById('alert-modal');    


function checkFieldValue() {
    if (inputField.value.length > 0) {
        saveToLocal(inputField.value);  // Saves to local storage
        appendItem(inputField.value);
        inputField.value = "";
    } else modal.showModal();  
    inputField.focus();
};

function onEnterPress(e){
    if (e.key == 'Enter') {
        checkFieldValue();
    }
};

inputField.addEventListener('keypress', onEnterPress);
document.getElementById('close-modal-btn').addEventListener('click', () => modal.close());  
document.getElementById("add-item-btn").addEventListener("click", checkFieldValue);

// Clears all list rows that are marked completed

const clearCompleted = () => {
    const completedItems = document.querySelectorAll('.completed');
    for (var i = 0; i < completedItems.length; i++) {
        completedItems[i].closest('li').remove();
        deleteFromLocal(completedItems[i]);     // Deletes item values from local storage
    }
    totalCompleted += currentCompleted;
    currentCompleted = 0;
    updateCounter(completed, currentCompleted);
    updateCounter(CompletedAll, totalCompleted);
    hideBtn.innerHTML = 'Hide completed';    
    if (!document.getElementById('item-list').children.length) {
        document.getElementById('completed-btn-cont').style.display = 'none';
    }
};

document.getElementById('clear-completed-btn').addEventListener('click', clearCompleted);

// Hides completed items

const hideBtn = document.getElementById('hide-completed-btn')

const toggleCompletedVisibility = () => {
    const completedItems = document.querySelectorAll('.completed');
        for (var i = 0; i < completedItems.length; i++) {
            completedItems[i].closest('li').classList.toggle('hidden');
        }  
        if (hideBtn.innerHTML === 'Hide completed' && completedItems.length > 0) {
            hideBtn.innerHTML = 'Show completed';
        } else {
            hideBtn.innerHTML = 'Hide completed';    
        }
};

hideBtn.addEventListener('click', toggleCompletedVisibility);

// Closes the line option menu if clicking outside of menu

function closeMenu(e) {
    const options = document.querySelectorAll('.option-items-open');
if (!e.target.matches('.option-menu *') && options.length > 0) {
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove('option-items-open');   
        }     
    }
};

document.addEventListener('click', closeMenu);


var data = ['yksi','kaksi'];

fetch('https://itemlist-json-server.onrender.com/items', {
    method: 'POST',
    headers: {
        'mode': 'cors',
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data)
})