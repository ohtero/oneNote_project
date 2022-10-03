const inputField = document.getElementById("input-textfield"); 

var appendItem = () => {
    const itemList = document.getElementById("item-list");
    const newItem = document.createElement("li");
    newItem.innerHTML = inputField.value;
    itemList.appendChild(newItem);
    inputField.value = " ";
};

const addBtn = document.getElementById("add-item-btn");
addBtn.addEventListener("click", appendItem);



