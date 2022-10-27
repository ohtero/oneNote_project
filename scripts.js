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


/*--- CREATE LIST ROW AND ITS' COMPONENTS ---*/

// Del button

function deleteRow() {  // Delete functionality                                                           
    this.closest('li').remove();
    const textfield = this.closest('.option-menu').previousElementSibling;
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
    const textfield = this.closest('.option-menu').previousElementSibling;
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
    newBtn.addEventListener('click', function() {this.parentElement.classList.remove('option-items-open');});   // Closes menu when 'Edit' is clicked
    return newBtn;
};

// 'Options/ellipses' button

function showOptions() {    // Open options functionality
    this.nextElementSibling.classList.toggle('option-items-open');
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
    if (textfield.classList.contains('completed')) {
        currentCompleted += 1;
        toDoCount -= 1;
    } else {currentCompleted -= 1;
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
    toDoCount += 1;
    updateCounter(toDoCounter, toDoCount);
    document.getElementById('completed-btn-cont').style.display = 'flex';
};

// Checks if input value is > 0. If not, opens error modal. Else appends new list row

const inputField = document.getElementById("input-textfield"); 
const modal = document.getElementById('alert-modal');    


function checkFieldValue() {
    if (inputField.value.length > 0) {
        appendItem();
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


const data = {item0: 'yksi', item1:'kaksi'};
const url = 'https://json-db-ohtero.herokuapp.com';

xmlhttp.open('POST', url);
xmlhttp.setRequestHeader('Content-Type', 'application/json');
xmlhttp.send(data);


