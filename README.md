DESCRIPTION

This List app is for making lists of the users' choosing. It gives you the ability to add single lines to a list, which the user can then mark as done, edit or delete.
The app also tracks the incomplete items, completed items and total fo all time completed items.
Both the list items and counter values are stored to Local Storage.

HOW-TO-USE

The input field on the top of the app accepts text that is no shorter than 4 characters. The text can be appended to the list by clicking the 'plus' icon 
or by hitting 'enter' on keyboard. After adding the item, the input field gains focus again for easy writing of more list items.

On the left side of the list items the checkmark toggled on/off, which gerys out the corresponding line, and removes returns it to normal state when unchecked.
The checked/unchecked state of the items persist on page reload.

On the right side, the 'ellipses' button opens options on the list item. From here the list item can be edited ('pen' button) and deleted ('thrashcan' button. 
Both checked and unchecked items can be deleted.

On the bottom of the list there are buttons hiding and removing completed items. 'Hide completed' is a toggleable button, which hides all checked items and and makes 
them visible again after another click. The 'Remove completed' removes the completed items from the list and Local Storage.

On the bottom of the app are the counters, which correspond to the changes in the list. These can't be manipulated otherwise.

DEV NOTES

The app is built with vanilla HTML, CSS and JavaScript.

The JS file is organized by the following logic and order:
1. Local Storage manupulation
2. List creation
3. General app functionality

All of the methods, variables and event listeners that relate closely to each other have been bundled together as well as possible for readability. If some function is 
called from other parts of the
file, the the function's use should be explained in comments.

CREDITS

App created by Ohto Eronen
