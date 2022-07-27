//Selection
let showAddNoteBtn = document.getElementById("showAddNoteBtn");
let addArea = document.querySelector(".add-area");
let noteCancel = document.getElementById("noteCancel");
let resetBtn = document.getElementById("resetBtn");
let noteTitleBox = document.getElementById("noteTitleBox"); 
let noteDetailsBox = document.getElementById("noteDetailsBox"); 
let categoryBtn = document.getElementById("categoryBtn");
let categoriesContainer = document.querySelector(".add-area .categories");
let addCategoryBtn = document.getElementById("addCategoryBtn");
let categoryViewBtn = document.getElementById("categoryViewBtn");
let categoriesView = document.querySelector(".notes-area .categoriesView");
let newCategoryNameBox = document.getElementById("newCategoryName");
let addNoteBtn = document.getElementById("addNoteBtn");
let notesContainer = document.querySelector(".notes-boxes");
let noteEditTitleBox = document.getElementById("noteEditTitleBox");
let noteEditDetailsBox = document.getElementById("noteEditDetailsBox");

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

//Add note button 
addNoteBtn.addEventListener("click",()=>{
    if(noteTitleBox.value=="" || noteDetailsBox.value==""){
        let alertBtn = document.getElementById("alertBtn");
        alertBtn.click();
    }
    else{
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
            updated : null,
            archived : false,
        }
        notesObj.push(myObj);
        localStorage.setItem("notes" , JSON.stringify(notesObj));
        resetBtn.click();
        getNotes();
    }
})


// Notes Show
function getNotes(){
    notesContainer.innerHTML='';
    // Get notes from localstorage
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesContainer.innerHTML=`No Notes Found<i class="bi bi-journal-x ps-2"></i>`;
        notesContainer.className="lext-lead text-muted text-center m-5 fs-5 fw-bold";
    }
    else{
        notesContainer.className="notes-boxes container";
        notesObj = JSON.parse(notes);
        if(notesObj.length==0){
            notesContainer.innerHTML=`No Notes Found<i class="bi bi-journal-x ps-2"></i>`;
            notesContainer.className="lext-lead text-muted text-center m-5 fs-5 fw-bold";
        }
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
            editBtn.innerHTML=`<i class="bi bi-pencil-square pe-1"></i>Edit`;
            editBtn.setAttribute("data-bs-toggle","modal");
            editBtn.setAttribute("data-bs-target","#editModal");
            let deleteBtn = document.createElement("button");
            deleteBtn.type="button";
            deleteBtn.className="btn btn-danger deleteButton ms-1";
            deleteBtn.innerHTML=`<i class="bi bi-trash3-fill pe-1"></i>Delete`;
            let archiveBtn = document.createElement("button");
            archiveBtn.className = "btn btn-secondary archiveBtn ms-1";
            archiveBtn.innerHTML = notesObj[i].archived ? `<i class="bi bi-archive-fill pe-1"></i>Archive` : `<i class="bi bi-archive-fill pe-1"></i>Unarchive`;
            body.appendChild(bodyText);
            body.appendChild(editBtn);
            body.appendChild(deleteBtn);
            body.appendChild(archiveBtn);
            // Footer
            let footer = document.createElement("div");
            footer.className="card-footer text-muted d-flex flex-column flex-sm-row justify-content-between";
            let timeSpan = document.createElement("span");
            timeSpan.innerHTML = notesObj[i].time;
            let categorySpan = document.createElement("span");
            categorySpan.innerHTML=`Category : ${notesObj[i].category}`;
            footer.appendChild(timeSpan);
            if(notesObj[i].updated !== null){
                let updatedSpan = document.createElement("span");
                updatedSpan.innerHTML = notesObj[i].updated;
                footer.appendChild(updatedSpan);
                timeSpan.className="d-none d-sm-inline";
            }
            footer.appendChild(categorySpan);
            // Card
            let card = document.createElement("div");
            card.className="card text-start mb-3";
            card.appendChild(header);
            card.appendChild(body);
            card.appendChild(footer);
            notesContainer.appendChild(card);
        }
        //Delete Button
        let deleteBtns = document.querySelectorAll(".deleteButton");
        let deleteBtnsArray = Array.from(deleteBtns);
        deleteBtnsArray.forEach((ele,index)=>{
            ele.addEventListener("click",()=>{
                let notes = localStorage.getItem("notes");
                notesObj = JSON.parse(notes);
                notesObj.splice(index,1);
                localStorage.setItem("notes",JSON.stringify(notesObj));
                getNotes();
                }//addEventListener inner function End
            )//addEventListener End
        }//Foreach inner function End
        );//Foreach End
        // Edit Button
        let editBtns = document.querySelectorAll(".editButton");
        let editSaveBtn = document.getElementById("editSaveBtn");
        let editBtnsArray = Array.from(editBtns);
        editBtnsArray.forEach((ele,ind) => {
                ele.addEventListener("click",() => {
                    noteEditTitleBox.value = notesObj[ind].title;
                    noteEditDetailsBox.value = notesObj[ind].details;
                    editSaveBtn.addEventListener("click",()=>{
                    editSave(ind);
                    })
                })
            }
        );
                // Archive Button
                let archivebtns = document.querySelectorAll(".archiveBtn");
                let archivebtnsArray = Array.from(archivebtns);
                archivebtnsArray.forEach((ele,ind) => {
                    ele.addEventListener("click",()=>{
                        notesObj[ind].archived ? notesObj[ind].archived= false : notesObj[ind].archived = true;
                        localStorage.setItem("notes",JSON.stringify(notesObj));
                        getNotes();
                    })
                });
    }//Else End
    if(notesContainer.children.length == 0){
        addArea.classList.remove("d-none");
        addArea.classList.add("d-block");
    }
}//getNotes End

// Edit save function
function editSave(index){
    let editModalTitle = document.getElementById("editModalTitle");
    editModalTitle.innerHTML=`Edit Note ${index+1}`;
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj[index].title = noteEditTitleBox.value;
    notesObj[index].details = noteEditDetailsBox.value;
    notesObj[index].updated = `Updated : ${setTime()}`;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    getNotes();
}

// SetTime
function setTime(){
    let time = new Date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}  ${time.getHours()<10 ? `0${time.getHours()}` : time.getHours()}:${time.getMinutes()<10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
}

//Categories names
function categoriesNames(){
    categoriesContainer.innerHTML='';
    categoriesContainer.appendChild(categoryNameCreateElement("General"));
    catNames = localStorage.getItem("notes_categories");
    if(catNames !== null){
        catsObj = JSON.parse(catNames);
        for(let i=0 ; i<catsObj.length ; i++){
            categoriesContainer.appendChild(categoryNameCreateElement(catsObj[i]));
        }
    }
    let hr = document.createElement("hr");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.className="dropdown-item";
    a.role = "button";
    a.setAttribute("data-bs-toggle","modal");
    a.setAttribute("data-bs-target","#newCategory");
    a.innerHTML = `<i class="bi bi-plus-circle pe-2"></i>Add New Category`;
    li.append(a);
    categoriesContainer.append(hr);
    categoriesContainer.appendChild(categoryNameCreateElement(`<i class="bi bi-archive pe-2"></i>Archived`));
    categoriesContainer.append(li);
}
categoriesNames();

function categoryNameCreateElement(name){
    let a = document.createElement("a");
    a.className="dropdown-item category";
    a.innerHTML = `<i class="bi bi-bookmark pe-2"></i>${name}`
    let li = document.createElement("li");
    li.appendChild(a);
    return li ;
}

addCategoryBtn.addEventListener("click",()=>{
    if(newCategoryNameBox.value !== ''){
        catnames = localStorage.getItem("notes_categories");
        if(catnames == null){
            names = [];
            names.push(newCategoryNameBox.value);
            localStorage.setItem("notes_categories",JSON.stringify(names));
        }
        else{
            catsObj = JSON.parse(catnames);
            catsObj.push(newCategoryNameBox.value);
            localStorage.setItem("notes_categories",JSON.stringify(catnames));
        }
    }   
    categoriesNames();
});

//category Selection
let categories = document.querySelectorAll(".add-area .categories .category");
let allCategories = Array.from(categories);
allCategories.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryBtn.innerHTML = categ.innerHTML;
    });
});

//Category View Selection
let categoryView = document.querySelectorAll(".notes-area .categoryView");
let allCategoriesView = Array.from(categoryView);
allCategoriesView.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryViewBtn.innerHTML = categ.innerHTML;
    });
});