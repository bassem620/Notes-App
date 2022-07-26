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
let newCategoryNameBox = document.getElementById("newCategoryName");
let addNoteBtn = document.getElementById("addNoteBtn");
let notesContainer = document.querySelector(".notes-boxes");
let noteEditTitleBox = document.getElementById("noteEditTitleBox");
let noteEditDetailsBox = document.getElementById("noteEditDetailsBox");
// Global Variable
let currentCategory = "All";
let notesCount = 0;

getNotes(currentCategory);

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
            category : categoryBtn.innerHTML=="Category" ? `General` : categoryBtn.innerHTML,
            mainCategory : categoryBtn.innerHTML=="Category" ? `General` : categoryBtn.innerHTML,
            time : `Created : ${setTime()}` ,
            updated : null,
            archived : categoryBtn.innerHTML==`Archived`? true : false,
        }
        notesObj.push(myObj);
        localStorage.setItem("notes" , JSON.stringify(notesObj));
        resetBtn.click();
        getNotes(currentCategory);
    }
})


// Notes Show
function getNotes(category){
    notesContainer.innerHTML='';
    notesCount = 0;
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesContainer.innerHTML=`No Notes Found<i class="bi bi-journal-x ps-2"></i>`;
        notesContainer.className="lext-lead text-muted text-center m-5 fs-5 fw-bold";
    }
    else{
        createNote(category,notes);
    }
    if(notesContainer.innerHTML==`No Notes Found<i class="bi bi-journal-x ps-2"></i>`){
        addArea.classList.remove("d-none");
        addArea.classList.add("d-block");
    }
}

function createNote(category,notes){
    notesContainer.className="notes-boxes container";
    notesObj = JSON.parse(notes);
    if(notesObj.length==0){
        notesContainer.innerHTML=`No Notes Found<i class="bi bi-journal-x ps-2"></i>`;
        notesContainer.className="lext-lead text-muted text-center m-5 fs-5 fw-bold";
    }
    //Looping on notes data
    for(let i=0 ; i<notesObj.length; i++){
        createNoteBox(notesObj,i,category);
    }
    createNoteButtons();
}

function createNoteBox(notesObj,i,category){
    // Card
    let card = document.createElement("div");
    if((notesObj[i].category==category) || ((category == "All") && (notesObj[i].archived == false))){
        card.className="card text-start mb-3 shadow";
    }
    else{
        card.className="card text-start mb-3 shadow d-none";
    }
    // Header
    let header = document.createElement("div");
    header.className="card-header fw-bold fs-5";
    let headerText = document.createTextNode(`Note ${card.classList.contains("d-none")? '' : ++notesCount} : ${notesObj[i].title}`);
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
    deleteBtn.setAttribute("data-bs-toggle","modal");
    deleteBtn.setAttribute("data-bs-target","#deleteConf");
    deleteBtn.innerHTML=`<i class="bi bi-trash3-fill pe-1"></i>Delete`;
    let archiveBtn = document.createElement("button");
    archiveBtn.className = "btn btn-secondary archiveBtn ms-1";
    archiveBtn.innerHTML = notesObj[i].archived ? `Unarchive` : `Archive`;
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
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    notesContainer.appendChild(card);
}

function createNoteButtons(){
    //Delete Button
    let deleteBtns = document.querySelectorAll(".deleteButton");
    let deleteBtnsArray = Array.from(deleteBtns);
    let deleteConfirmed = document.getElementById("deleteConfirmed");
    deleteBtnsArray.forEach((ele,index)=>{
        ele.addEventListener("click",()=>{
            deleteConfirmed.onclick = function () {
                let notes = localStorage.getItem("notes");
                notesObj = JSON.parse(notes);
                notesObj.splice(index,1);
                localStorage.setItem("notes",JSON.stringify(notesObj));
                getNotes(currentCategory);
            }
            }
    )});
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
            if(notesObj[ind].archived){
                notesObj[ind].archived = false;
                notesObj[ind].category = notesObj[ind].mainCategory == "Archived" ? "General" : notesObj[ind].mainCategory;
                ele.innerHTML='Archive';
            }
            else{
                notesObj[ind].archived= true;
                notesObj[ind].category = "Archived";
                ele.innerHTML='Unarchive';
            }
            localStorage.setItem("notes",JSON.stringify(notesObj));
            getNotes(currentCategory);
        })
    });
}

// Edit save function
function editSave(index){
    let editModalTitle = document.getElementById("editModalTitle");
    editModalTitle.innerHTML=`Edit Note ${index+1}`;
    let notes = localStorage.getItem("notes");
    if((noteEditTitleBox.value == '')||(noteEditDetailsBox.value == '')){
        alertBtn.click();
    }
    else{
        notesObj = JSON.parse(notes);
        notesObj[index].title = noteEditTitleBox.value;
        notesObj[index].details = noteEditDetailsBox.value;
        notesObj[index].updated = `Updated : ${setTime()}`;
        localStorage.setItem("notes",JSON.stringify(notesObj));
        getNotes(currentCategory);
    }
}

// SetTime
function setTime(){
    let time = new Date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}  ${time.getHours()<10 ? `0${time.getHours()}` : time.getHours()}:${time.getMinutes()<10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
}

// Category item Creation
function categoryNameCreateElement(name){
    let a = document.createElement("a");
    a.className="dropdown-item category";
    if(name === "Archived"){
        a.innerHTML = `${name}`
    }
    else{
        a.innerHTML = `${name}`
    }
    let li = document.createElement("li");
    li.appendChild(a);
    return li ;
}

// Categories Menu Creation
function categoriesNames(){
    categoriesContainer.innerHTML="";
    categoriesContainer.appendChild(categoryNameCreateElement("General"));
    let catNames = localStorage.getItem("notes_categories");
    if(catNames !== null){
        let catNamesObj = JSON.parse(catNames);
        for(let i=0 ; i<catNamesObj.length ; i++){
            categoriesContainer.appendChild(categoryNameCreateElement(catNamesObj[i]));
        }
    }
    let hr = document.createElement("hr");
    let li1 = document.createElement("li");
    let a1 = document.createElement("a");
    a1.className="dropdown-item";
    a1.role = "button";
    a1.setAttribute("data-bs-toggle","modal");
    a1.setAttribute("data-bs-target","#newCategory");
    a1.innerHTML = `<i class="bi bi-plus-circle pe-2 text-primary"></i>Add New Category`;
    li1.appendChild(a1);
    categoriesContainer.appendChild(hr);
    categoriesContainer.appendChild(categoryNameCreateElement('Archived'));
    let li2 = document.createElement("li");
    let a2 = document.createElement("a");
    li2.innerHTML='';
    a2.innerHTML='<i class="bi bi-dash-circle text-danger pe-2"></i>Remove Category';
    a2.className="dropdown-item btn";
    a2.setAttribute("data-bs-toggle","modal");
    a2.setAttribute("data-bs-target","#removeCategory");
    a2.id="removeCategoryMainBtn";
    li2.appendChild(a2);
    categoriesContainer.appendChild(li2);
    categoriesContainer.appendChild(li1);
}
categoriesNames();

// Add category Button
addCategoryBtn.onclick = function (){
    if(newCategoryNameBox.value !== ""){
        let getCats = localStorage.getItem("notes_categories");
        if(getCats === null){
            getCats = [];
            getCats.push(newCategoryNameBox.value.toString());
            localStorage.setItem("notes_categories",JSON.stringify(getCats));
            document.location.reload(); 
        }
        else{
            let cats = JSON.parse(getCats);
            if(!cats.includes(newCategoryNameBox.value)){
                cats.push(newCategoryNameBox.value);
                localStorage.setItem("notes_categories",JSON.stringify(cats));
                document.location.reload(); 
            }
            else{
                let newCategoryLabel = document.getElementById("newCategoryLabel");
                newCategoryLabel.innerHTML="Already exist.. Please enter a new category name."
                newCategoryNameBox.value="";
            }
        }
    }
}

//category Selection
let categories = document.querySelectorAll(".add-area .categories .category");
let allCategories = Array.from(categories);
allCategories.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryBtn.innerHTML = categ.innerHTML;
    });
});

//Category View Selection
let categoriesViewContainer = document.querySelector(".notes-area .categoriesView");

function categoriesView(){
    categoriesViewContainer.innerHTML="";
    categoriesViewContainer.innerHTML=`<li><a class="dropdown-item categoryView">All</a></li>`;
    categoriesViewContainer.innerHTML+=`<li><a class="dropdown-item categoryView">General</a></li>`;
    let catNames = localStorage.getItem("notes_categories");
    if(catNames === null){
        console.log("No added categories");
    }
    else{
        let catObj = JSON.parse(catNames);
        for(let i=0 ; i<catObj.length ; i++){
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.className="dropdown-item categoryView";
            a.innerHTML=catObj[i];
            li.appendChild(a);
            categoriesViewContainer.appendChild(li);
        }
    }
    categoriesViewContainer.innerHTML += `<li><a class="dropdown-item categoryView">Archived</a></li>`;
}
categoriesView();
let categoryView = document.querySelectorAll(".notes-area .categoryView");
let allCategoriesView = Array.from(categoryView);
allCategoriesView.forEach((categ)=>{
    categ.addEventListener("click",()=>{
        categoryViewBtn.innerHTML = categ.innerHTML;
        currentCategory = categ.innerHTML;
        getNotes(currentCategory);
        console.log(currentCategory);
    });
});

//Remove Category
let removeCategory = document.getElementById("removeCategoryMainBtn"); //main
let removeCategoryBtn = document.getElementById("removeCategoryBtn");
let removeCategoryBox = document.getElementById("removeCategoryBox");
let savedCategories = document.getElementById("savedCategories");
let categoryNumberLabel = document.getElementById("categoryNumberLabel");

removeCategory.addEventListener("click",() =>{
    savedCategories.innerHTML="";
    let catNames = localStorage.getItem("notes_categories");
    if(catNames === null){
        savedCategories.innerHTML=`<i class="bi bi-bookmark-x pe-2"></i>No Categories Found`;
    }
    else{
        let catObj = JSON.parse(catNames);
        for(let i=0 ; i<catObj.length ; i++){
            let li = document.createElement("li");
            let liText = document.createTextNode(`${i+1} -> ${catObj[i]}`);
            li.appendChild(liText);
            savedCategories.appendChild(li);
        }
        removeCategoryBtn.addEventListener("click",() =>{
            if((removeCategoryBox.value <= 0) || (removeCategoryBox.value > catObj.length) || (removeCategoryBox.value == '')){
                removeCategoryBox.value="";
                categoryNumberLabel.innerHTML="Please Enter A Valid Number.";
            }
            else{
                catObj.splice(((removeCategoryBox.value)-1),1);
                localStorage.setItem("notes_categories",JSON.stringify(catObj));
                categoriesNames();
                window.location.reload();
            }
        })
    }
})
