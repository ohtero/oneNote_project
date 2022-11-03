/*---- LOCAL STORAGE MANIPULATION ----*/

const toDoCounter = document.getElementById('todo-count');
const completed = document.getElementById('completed-count');
const completedAll = document.getElementById('total-completed-count');

var counters;

const updateCounter = (counter, value) => counter.innerHTML = value;    // Updates values of the different counters

const getCounterFromLocal = () => {         // Gets counter data from Local Storage
    const localCounterData = JSON.parse(localStorage.getItem('counters'));
    const savedCounters = localCounterData ? localCounterData : {toDo: 0, completed: 0, completedAll: 0};
    counters = savedCounters;
    counterValues = Object.values(savedCounters);  
    updateCounter(toDoCounter, counterValues[0]);
    updateCounter(completed, counterValues[1]);
    updateCounter(completedAll, counterValues[2]);
 
};

const updateCountersToLocal = () => localStorage.setItem('counters', JSON.stringify(counters));     // Updates counter data to Local Storage

window.addEventListener('load', getCounterFromLocal);


const getLocalData = () => {        // Loads saved list items on page load
    const localData = JSON.parse(localStorage.getItem('items'));
    if (localData){
        const savedList = Array.from(localData);
        savedList.forEach(element => {appendItem(element)});
    }
};
const getLocalCompletedData = () => {        // Loads saved completed list items on page load
    const completedLocalData = JSON.parse(localStorage.getItem('completedItems'));
    if (completedLocalData){
        const savedList = Array.from(completedLocalData);
        savedList.forEach(element => {checkIfCompleted(element)});      // Compares to existing list item values and if they match, sets them to completed state
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
    const localData = JSON.parse(localStorage.getItem('items'));
    const savedList = localData ? Array.from(localData) : [];
    savedList.push(value);
    localStorage.setItem('items', JSON.stringify(savedList)); 
};

const deleteFromLocal = item => {       // Delete items from local Storage when 'Clear completed' or 'delete' on specific list items is clicked
    const localData = JSON.parse(localStorage.getItem('items'));
    const savedList = Array.from(localData);
    const index = savedList.indexOf(item.value);
    savedList.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(savedList));
    const completedLocalData = JSON.parse(localStorage.getItem('completedItems'));
    const savedCompletedList = Array.from(completedLocalData);
    if (savedCompletedList.includes(item.value)) {              // If item is included in Completed Items, delete it from there also
        const indexOfCompleted = savedCompletedList.indexOf(item.value);
        savedCompletedList.splice(indexOfCompleted, 1);
        localStorage.setItem('completedItems', JSON.stringify(savedCompletedList));     
    } 

};

const editLocalValue = (value) => {     // Change item value in local storage when value is edited
    const localData = JSON.parse(localStorage.getItem('items'));
    const savedList = Array.from(localData);
    const index = savedList.indexOf(originalTextfieldValue);  // Checks the index of the un-edited value
    savedList.splice(index, 1, value);
    localStorage.setItem('items', JSON.stringify(savedList));
    originalTextfieldValue = "";
}

const addCompletedToLocal = value => {      // Adds completed list items to their own key in Local Storage when clicking checkbox 
    let localData = JSON.parse(localStorage.getItem('completedItems'));
    let savedList = localData ? Array.from(localData) : [];
    savedList.push(value);
    localStorage.setItem('completedItems', JSON.stringify(savedList));    
};

const deleteCompletedFromLocal = value => {     // Removes completed list items from their own key in Local Storage when clicking checkbox
    let localData = JSON.parse(localStorage.getItem('completedItems'));
    let savedList = Array.from(localData);
    let index = savedList.indexOf(value);
    savedList.splice(index, 1);  
    localStorage.setItem('completedItems', JSON.stringify(savedList));
}

/*---- END OF LOCAL STORAGE MANIPULATION ----*/

/*---- lIST ROW CONSTRUCTION ----*/

// Del button

function deleteRow() {  // Delete functionality                                                          
    const textfield = this.closest('.option-menu').previousElementSibling;
    this.closest('li').remove();
    deleteFromLocal(textfield);
    if (textfield.classList.contains('completed')) {
        counters.completed -= 1;
        counters.completedAll +=1;
        updateCounter(completed, counters.completed);
        updateCounter(completedAll, counters.completedAll);
    } else {
        counters.toDo -= 1;
        updateCounter(toDoCounter, counters.toDo);
    }
    if (!document.getElementById('item-list').children.length) {
        document.getElementById('completed-btn-cont').style.display = 'none';
    }
    updateCountersToLocal();    // Updates counters in Local Storage
}; 

function createDelButton() {                                   
    const newBtn = document.createElement("button");
    newBtn.className = "del-row-btn bi bi-trash";
    newBtn.addEventListener("click", deleteRow);
    return newBtn;
};

/* 'Edit' button */

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

/* 'Options/ellipses' button */

function showOptions() {    // Open options functionality
    this.nextElementSibling.classList.toggle('option-items-open');
};

function createOptionBtn() {
    const newBtn = document.createElement('button');
    newBtn.className = 'option-btn bi bi-three-dots';
    newBtn.addEventListener('click', showOptions);
    return newBtn;
};

function createOptionItems() {      // Items in Option menu
    const newItems = document.createElement('div');
    newItems.className = 'option-items';
    newItems.appendChild(createEditButton());
    newItems.appendChild(createDelButton());
    return newItems;
};

function createOptionMenu() {       // Option menu container
    const newMenu = document.createElement('div');
    newMenu.className = 'option-menu';
    newMenu.appendChild(createOptionBtn());   
    newMenu.appendChild(createOptionItems()); 
    return newMenu;
};

/* Textfield */

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

/* Checkbox */

function toggleState() {        // Toggles list items' completion state when checkbox is clicked
    counterValues = Object.values(counters);
    const textfield = this.parentElement.nextElementSibling;
    textfield.classList.toggle('completed');
    if (textfield.classList.contains('completed')) {
        addCompletedToLocal(textfield.value);   // Adds completed item values to Local Storage
        counters.completed += 1;
        counters.toDo -= 1;
    } else {deleteCompletedFromLocal(textfield.value);  // Removes completed item values from Local Storage
    counters.completed -= 1;
        counters.toDo += 1;
    }
    updateCounter(toDoCounter, counters.toDo);
    updateCounter(completed, counters.completed);
    updateCountersToLocal();    // Updates counters in Local Storage   
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

/* Combine components and append new <li> to the <ul> */



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
    if (value === inputField.value){
        counters.toDo += 1;
    }
    updateCounter(toDoCounter, counters.toDo);
    updateCountersToLocal();    // Updates counters in Local Storage
    document.getElementById('completed-btn-cont').style.display = 'flex';
};

/*---- END LIST ROW CONSTRUCTION ----*/

const inputContainer = document.querySelector('.input-container');
const inputField = document.getElementById("input-textfield"); 
const modal = document.getElementById('alert-modal');    

function checkFieldValue() {        // Checks if input value is > 3. If not, shows error
    if (inputField.value.length > 3 ) {
        saveToLocal(inputField.value);  // Saves to local storage
        appendItem(inputField.value);
        inputField.value = "";
    } else {inputContainer.classList.add('input-error');
        inputField.value = "";
        inputField.style.background = '#fcc';
        setTimeout(() => {inputContainer.classList.remove('input-error'); inputField.style.background = '#fff';}, 3000);    // Removes error popup after 3s
    }
    inputField.focus();
};

function onEnterPress(e){
    if (e.key == 'Enter') {
        checkFieldValue();
    }
};

const removeError = (e) => {    // Removes error popup after action
    if (inputContainer.classList.contains('input-error') && e.key != 'Enter') {
        inputContainer.classList.remove('input-error');
        inputField.style.background = '#fff';
    }
};

inputField.addEventListener('keypress', onEnterPress);
inputField.addEventListener('keypress', removeError);
document.getElementById("add-item-btn").addEventListener("click", checkFieldValue);     



const clearCompleted = () => {      // Clears all list rows that are marked completed
    counterValues = Object.values(counters);  
    const completedItems = document.querySelectorAll('.completed');
    for (var i = 0; i < completedItems.length; i++) {
        completedItems[i].closest('li').remove();
        deleteFromLocal(completedItems[i]);     // Deletes item values from local storage
    }
    counters.completedAll += counters.completed;
    counters.completed = 0;
    updateCounter(completed, counters.completed);
    updateCounter(completedAll, counters.completedAll);
    hideBtn.innerHTML = 'Hide completed';    
    if (!document.getElementById('item-list').children.length) {
        document.getElementById('completed-btn-cont').style.display = 'none';
    }
    updateCountersToLocal();    // Updates counters in Local Storage
};

document.getElementById('clear-completed-btn').addEventListener('click', clearCompleted);


const hideBtn = document.getElementById('hide-completed-btn')

const toggleCompletedVisibility = () => {       // Hides completed items
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


function closeMenu(e) {     // Closes the line option menu if clicking outside of menu
    const options = document.querySelectorAll('.option-items-open');
if (!e.target.matches('.option-menu *') && options.length > 0) {
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove('option-items-open');   
        }     
    }
};

document.addEventListener('click', closeMenu);
