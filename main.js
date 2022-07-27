//Selection
let showAddNoteBtn = document.getElementById("showAddNoteBtn");
let addArea = document.querySelector(".add-area");
let noteCancel = document.getElementById("noteCancel");
let resetBtn = document.getElementById("resetBtn");
let noteTitleBox = document.getElementById("noteTitleBox"); 
let noteDetailsBox = document.getElementById("noteDetailsBox"); 
let categoryBtn = document.getElementById("categoryBtn");
let categories = document.querySelectorAll(".add-area .categories .category");
let categoryViewBtn = document.getElementById("categoryViewBtn");
let categoriesView = document.querySelector(".notes-area .categoriesView");
let categoryView = document.querySelectorAll(".notes-area .categoryView");
let newCategoryNameBox = document.getElementById("newCategoryName");
let addCategoryNameBtn = document.getElementById("addCategoryNameBtn");
let addNoteBtn = document.getElementById("addNoteBtn");
let notesContainer = document.querySelector(".notes-boxes");
let deleteBtns = document.querySelectorAll(".notes-boxes .deleteButton");
let editBtns = document.querySelectorAll(".editButton");
console.log(editBtns);

getNotes();

//Add Note Button 
showAddNoteBtn.onclick = function(){
    if(addArea.classList.contains("d-none"))
    {
        addArea.classList.remove("d-none");
        addArea.classList.add("d-block");
    }
}

//Cancel Note Button
noteCancel.onclick = function(){
    addArea.classList.remove("d-block");
    addArea.classList.add("d-none");
}

//Reset Button
resetBtn.onclick = function(){
    noteTitleBox.value = '';
    noteDetailsBox.value = '';
    categoryBtn.innerHTML = 'Category';
}

//category Selection
let allCategories = Array.from(categories);
allCategories.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryBtn.innerHTML = categ.innerHTML;
    });
});

//Category View Selection
let allCategoriesView = Array.from(categoryView);
allCategoriesView.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryViewBtn.innerHTML = categ.innerHTML;
    });
});

//Create New Category
addCategoryNameBtn.onclick = function (){
    //add new category name to localStorage
    newCategoryNameBox.value='';
}

//Add note button 
addNoteBtn.addEventListener("click",(e)=>{
    if(noteTitleBox.value=="" || noteDetailsBox.value==""){
        return alert("Please add note title and details.");
    }
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = []
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : noteTitleBox.value,
        details : noteDetailsBox.value,
        category : categoryBtn.innerHTML=="Category" ? "General" : categoryBtn.innerHTML,
        time : `Created : ${setTime()}` ,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    resetBtn.click();
    getNotes();
})


// Notes Show
function getNotes(){
    notesContainer.innerHTML='';
    // Get notes from localstorage
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesContainer.innerHTML='No Notes Found';
        notesContainer.className="lext-lead text-muted text-center m-5 fs-5 fw-bold";
    }
    else{
        notesContainer.className="notes-boxes container";
        notesObj = JSON.parse(notes);
        for(let i=0 ; i<notesObj.length; i++){
            // Header
            let header = document.createElement("div");
            header.className="card-header fw-bold fs-5";
            let headerText = document.createTextNode(`Note ${i+1} : ${notesObj[i].title}`);
            header.appendChild(headerText);
            // Body
            let body = document.createElement("div");
            body.className="card-body";
            let bodyText = document.createElement("p");
            bodyText.className="card-text fs-5";
            let Details = document.createTextNode(notesObj[i].details);
            bodyText.appendChild(Details);
            let editBtn = document.createElement("button");
            editBtn.type="button";
            editBtn.className="btn btn-primary editButton";
            editBtn.innerHTML="Edit";
            let deleteBtn = document.createElement("button");
            deleteBtn.type="button";
            deleteBtn.className="btn btn-danger deleteButton ms-1";
            deleteBtn.innerHTML="Delete";
            body.appendChild(bodyText);
            body.appendChild(editBtn);
            body.appendChild(deleteBtn);
            // Footer
            let footer = document.createElement("div");
            footer.className="card-footer text-muted d-flex justify-content-between";
            let timeSpan = document.createElement("span");
            timeSpan.innerHTML = notesObj[i].time;
            let categorySpan = document.createElement("span");
            categorySpan.innerHTML=`Category : ${notesObj[i].category}`;
            footer.appendChild(timeSpan);
            footer.appendChild(categorySpan);
            // Card
            let card = document.createElement("div");
            card.className="card text-start mb-3";
            card.appendChild(header);
            card.appendChild(body);
            card.appendChild(footer);
            notesContainer.appendChild(card);
        }
    }
}

// SetTime
function setTime(){
    let time = new Date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}  ${time.getHours()<10 ? `0${time.getHours()}` : time.getHours()}:${time.getMinutes()<10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
}

//Delete function
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    getNotes();
}

