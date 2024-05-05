#! /usr/bin/env node
import inquirer from "inquirer";
console.log("\n Welcome to your Todo List\n");
let todos = [];
let condition = true;
while (condition) {
    let todoChoice = await inquirer.prompt([
        {
            name: "options",
            message: "What would you want to do in your todos?\n",
            type: "list",
            choices: ["Add", "Remove", "View list", "Update"],
        },
    ]);
    // ADD ITEM
    if (todoChoice.options == "Add") {
        let add = await inquirer.prompt([
            {
                name: "addItem",
                type: "input",
                message: "What would you want to add in your todos?\n",
            },
        ]);
        if (add.addItem !== "") {
            todos.push(add.addItem);
            console.log(todos);
            console.log("\nTask added successfully\n");
            console.log("List updated!\n");
        }
        else {
            console.log("You can't enter an empty item to add in the list\n");
        }
    }
    // REMOVE ITEM
    else if (todoChoice.options == "Remove") {
        let removeAnswer = await inquirer.prompt([
            {
                name: "removeItem",
                type: "list",
                message: "What you want to remove?\n",
                choices: todos,
            }
        ]);
        let indexToRemove = todos.indexOf(removeAnswer.removeItem);
        if (indexToRemove >= 0) {
            todos.splice(indexToRemove, 1);
            console.log("\nYou removed: " + removeAnswer.removeItem + "\n");
            console.log(todos);
            console.log("\nList updated!\n");
        }
    }
    //Show List
    else if (todoChoice.options == "View list") {
        if (todos.length > 0) {
            console.log("Your list: \n");
            todos.forEach((item) => {
                console.log(`\t ${item}`);
            });
        }
        else {
            console.log("\nThe list is empty");
        }
    }
    //Update List
    else if (todoChoice.options == "Update") {
        let updateAns = await inquirer.prompt([{
                name: "updateItem",
                type: "list",
                message: "What do you want to update\n",
                choices: todos
            }]);
        let indexToUpdate = todos.indexOf(updateAns.updateItem);
        let editChoice = await inquirer.prompt([{
                name: "newItem",
                type: "input",
                message: "Enter the new item \n"
            }]);
        if (editChoice.newItem !== "") {
            todos[indexToUpdate] = editChoice.newItem;
            console.log("\nTask updated successfully.\n");
            console.log("List updaed!\n");
            todos.forEach((item) => {
                console.log(`\t ${item}`);
            });
        }
        else {
            console.log("You cannot update to an empty item.");
        }
    }
    else {
        console.log("\n \tThe To-Do list is empty. Please add tasks before updating.");
    }
    // Confirm
    let confirm = await inquirer.prompt([
        {
            name: "options",
            type: "confirm",
            message: "Do you want to continue?\n",
            default: true,
        },
    ]);
    condition = confirm.options;
}
console.log("\nThank you for using Todo list");
