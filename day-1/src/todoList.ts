/* Requirements:
1. priority: HIGH, MEDIUM, LOW
2. Title, DueDate
3. Functions: Show, Add, Delete, Update, Search
*/

type Priority = "HIGH" | "MEDIUM" | "LOW";
interface Tasks{
    Title: string,
    Id: number,
    priority: Priority,
    isCompleted: boolean,
    DueDate: string
};

// create empty array
const tasks: Tasks[] = [];

function addTasks(task: Tasks): void{
    const found = tasks.find(t => t.Id === task.Id);
    if(found){
        console.log("Task with same Id already exists.");
        return;
    }
    tasks.push(task);
    console.log("Task Added Successfully!");
}

function showTasks(): void{
    if(tasks.length === 0){
        console.log("There is no Task.");
        return;
    }
    console.log("Tasks: ",tasks);
}

function deleteTask(id: number): void{
    const len = tasks.length;
    const filteredTasks = tasks.filter(task => task.Id !== id);
    if(len === filteredTasks.length){
        console.log(`Task with id: ${id} not found.`);
    }else{
        tasks.length = 0;
        tasks.push(...filteredTasks);
        console.log("Task Removed Successfully!");
    }
}

function searchTaskWithId(id: number): Tasks | undefined{
    const found = tasks.find(task => task.Id === id);
    if(!found){
        console.log(`Task with id: ${id} not found.`);
    }else{
        return found;
    }
}

function updateTaskWithId(Task: Tasks): void{
    const found = tasks.find(task => task.Id === Task.Id);
    if(!found){
        console.log(`Task not found.`);
        return;
    }
    found.Title= Task.Title;
    found.priority = Task.priority;
    found.isCompleted = Task.isCompleted;
    found.DueDate = Task.DueDate;

    console.log("Task updated successfully.");
}

addTasks({Id: 1, Title: "first task", isCompleted: false, priority: "HIGH", DueDate: "26-5-2026"});
addTasks({Id: 2, Title: "Second task", isCompleted: false, priority: "MEDIUM", DueDate: "26-5-2026"});
addTasks({Id: 3, Title: "third task", isCompleted: false, priority: "LOW", DueDate: "26-5-2026"});
addTasks({Id: 1, Title: "third task", isCompleted: false, priority: "HIGH", DueDate: "26-5-2026"});

showTasks();
// while(true){
//     console.log("Todo List: \n");
//     console.log("Select option: ");
//     console.log("1. Add");
//     console.log("2. Delete");
//     console.log("3. Show");
//     console.log("4. Search");
//     let choice = 0;

//     switch(choice){
//         case 1:
//             console.log("Enter Task Details:");
//             const t1: Tasks;
            
//         break;
//     }
// }